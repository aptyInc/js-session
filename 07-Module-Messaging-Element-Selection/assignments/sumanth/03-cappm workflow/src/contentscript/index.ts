import { baloonCSS } from '../constants';
import { MessagingService } from '../popup/utils/chrome.message';
import { IStep, IMessage, IWorkflow, IRectangle } from '../interfaces';

let workflow: IWorkflow;

const baloon = document.createElement('div');

let currStep = -1; //Track current step in workflow

function startWorkflow() {
    currStep = 0;
    executeNextStep();
}

function executeNextStep() {
    if (currStep == workflow.steps.length) {
        //Workflow completed
        currStep = -1;
        alert('Workflow exectuted successfully!');
        return;
    }

    const message: IMessage = { type: 'add-step', step: workflow.steps[currStep] };
    sendMessage(message);
}

//Handle step-finish
function goToNextStep() {
    hideBaloon();
    currStep++;
    executeNextStep(); //Execute next steps
}

function sendMessage(message: IMessage) {
    const iframes = document.getElementsByTagName('iframe');
    window.postMessage(message, '*');
    const nIframes = iframes.length;
    for (let i = 0; i < nIframes; i++) {
        const iframe = iframes.item(i);
        if (!iframe) continue;
        const iframeWindow = iframe.contentWindow;
        if (!iframeWindow) continue;
        iframeWindow.postMessage(message, '*');
    }
}

function adjustBaloon() {
    if (currStep == -1) return;
    const message: IMessage = { type: 'rect-request', step: workflow.steps[currStep] };
    sendMessage(message);
}

function setBaloonPosition(baseElementRect: IRectangle) {
    showBaloon();
    //Align baloon center with element center
    baloon.style.top = baseElementRect.top + baseElementRect.height / 2 - baloon.offsetHeight / 2 + 'px';
    baloon.style.left = baseElementRect.left + baseElementRect.width + 10 + 'px';
}

function hideBaloon() {
    baloon.style.display = 'none';
}

function showBaloon() {
    baloon.style.display = 'flex';
}

function setBaloonContent(step: IStep) {
    baloon.innerHTML = `
	<h4>${step.content}</h4>
	`;
}

function finishStep() {
    const message: IMessage = { type: 'finish-step', step: workflow.steps[currStep] };
    sendMessage(message);
}

//Set content and position of baloon
function configureBaloon() {
    if (currStep == -1) return;
    const step = workflow.steps[currStep];
    setBaloonContent(step);
    adjustBaloon();
}

function addDOMListener() {
    const observer = new MutationObserver(function (records) {
        let valid = true;
        records.map(function (record) {
            if (record.target.id === baloon.id) {
                valid = false;
                return;
            }
        });
        if (valid) {
            configureBaloon();
        }
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
    });
}

//Remove listener after step finished
function removeStepListener() {
    const message: IMessage = {
        type: 'remove-step-listener',
        step: workflow.steps[currStep],
    };
    sendMessage(message);
}

let scrollableParents: HTMLElement[] = [];

function addScrollToParents() {
    const step = workflow.steps[currStep];
    let currDocEle;
    if (step.iframes.length == 0) {
        //This doc contains element
        currDocEle = document.querySelector(step.selector);
    } else {
        //This doc doesn't contain element,but contains the frame that does
        currDocEle = document.querySelector(step.iframes[0]);
    }
    //Add Scroll to all parents, so that when any parent is scrolled, baloon is adjusted
    currDocEle = currDocEle ? currDocEle.parentElement : null;
    while (currDocEle) {
        currDocEle.addEventListener('scroll', adjustBaloon);
        scrollableParents.push(currDocEle);
        currDocEle = currDocEle.parentElement;
    }
}

//Remove scroll listener on parents after step finished
function removeScrollOfParents() {
    for (const parent of scrollableParents) {
        parent.removeEventListener('scroll', adjustBaloon);
    }
    scrollableParents = [];
}

window.addEventListener('message', function (event) {
    let message: IMessage = event.data;
    let rect: IRectangle, frameSelector, step: IStep, focusElement;
    switch (message.type) {
        case 'rect-response':
            rect = message.rect;
            if (rect.height === 0 || currStep === -1) {
                //Element invisible or workflow didn't start
                hideBaloon();
                break;
            }
            frameSelector = message.frameSelector;
            if (frameSelector) {
                //Element is inside frame, add frame's top,left
                const frame = document.querySelector(frameSelector);
                const frameRect = frame.getBoundingClientRect();
                const newRect: IRectangle = {
                    height: rect.height,
                    width: rect.width,
                    top: rect.top + frameRect.top,
                    left: rect.left + frameRect.left,
                };
                setBaloonPosition(newRect);
            } else {
                setBaloonPosition(rect);
            }
            break;
        case 'rect-request':
            step = event.data.step;
            if (step.iframes.length > 0) break; //Element not in this doc
            focusElement = document.querySelector(step.selector);
            if (!focusElement) break;
            message = {
                type: 'rect-response',
                rect: focusElement.getBoundingClientRect(),
            };
            sendMessage(message);
            break;
        case 'add-step':
            step = event.data.step;
            if (step.iframes.length == 0) {
                focusElement = this.document.querySelector(step.selector);
                if (!focusElement) break;
                focusElement.addEventListener(step.type, finishStep);
            }
            addScrollToParents();
            configureBaloon();
            break;
        case 'remove-step-listener':
            step = event.data.step;
            if (step.iframes.length > 0) break;
            focusElement = this.document.querySelector(step.selector);
            if (!focusElement) break;
            focusElement.removeEventListener(step.type, finishStep);
            break;
        case 'finish-step':
            removeScrollOfParents();
            removeStepListener();
            goToNextStep();
            break;
        case 'adjust-baloon':
            adjustBaloon();
            break;
    }
});

window.onload = function () {
    addCSS();
    fetchWorkflows();
    document.addEventListener('scroll', adjustBaloon);
    baloon.classList.add('step-dialog');
    baloon.id = 'apty-baloon';
    document.body.appendChild(baloon);
    hideBaloon();
    // document.getElementById("main-input").style.display = "none";
    addDOMListener();
    // setTimeout(function () {
    // 	document.getElementById("main-input").style.display = "block";
    // }, 2000);
};

async function fetchWorkflows() {
    const messageService = MessagingService.getInstance();
    workflow = await messageService.sendMessage({ type: 'request', resource: 'workflow' });
    const workflowButton = document.createElement('button');
    workflowButton.innerHTML = 'Start Workflow';
    workflowButton.addEventListener('click', startWorkflow);
    workflowButton.style.cssText = `position:fixed;top:0px;left:0px;`;
    document.body.appendChild(workflowButton);
}

function addCSS() {
    const style = document.createElement('style');
    style.innerHTML = baloonCSS;
    document.head.appendChild(style);
}

export {};
