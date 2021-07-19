import { baloonCSS, notInDomRect } from '../constants';
import { MessagingService } from '../popup/utils/chrome.message';
import { IStep, IMessage, IWorkflow, IRectangle } from '../interfaces';

//Elements to which we added scroll listeners
let scrollableParents: Element[] = [];

let observer: MutationObserver;

function addScrollToParents(step: IStep) {
    let currDocEle;
    if (window == window.top) {
        if (step.iframes.length == 0) {
            //Main doc contains element
            currDocEle = document.querySelector(step.selector);
        } else {
            //Main doc doesn't contain element,but contains the frame that does
            currDocEle = document.querySelector(step.iframes[0]);
        }
        addScrollToElementParents(currDocEle);
    } else {
        currDocEle = document.querySelector(step.selector);
        addScrollToElementParents(currDocEle);
    }
}

//Add Scroll to all parents, so that when any parent is scrolled, baloon is adjusted
function addScrollToElementParents(currDocEle: Element | null) {
    currDocEle = currDocEle ? currDocEle.parentElement : null;
    while (currDocEle) {
        currDocEle.addEventListener('scroll', adjustBaloon);
        scrollableParents.push(currDocEle);
        currDocEle = currDocEle.parentElement;
    }
}

//Remove scroll listener on parents after step finished
const removeScrollOfParents = function () {
    for (const parent of scrollableParents) {
        parent.removeEventListener('scroll', adjustBaloon);
    }
    scrollableParents = [];
};

function adjustBaloon() {
    const message = { type: 'adjust-baloon' };
    sendMessageToMain(message);
}

function sendMessageToMain(message: any) {
    window.top.postMessage(message, '*');
}

//Observer for iframe
function getObserverFrame() {
    return new MutationObserver(function () {
        //Element could've been added to DOM or removed from DOM. So always ask to re-add
        reAddStep();
    });
}

function startObserver() {
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
    });
}

function stopObserver() {
    observer.disconnect();
}

const finishStep = function (event) {
    event.target.removeEventListener(event.type, finishStep);
    if (window != window.top) {
        //Stop listening to changes on iframe as it is an unnecessary overhead
        stopObserver();
        //Remove scroll of parents inside iframe
        removeScrollOfParents();
    }
    const message = { type: 'finish-step' };
    sendMessageToMain(message);
};

function reAddStep() {
    const message = { type: 're-add-step' };
    sendMessageToMain(message);
}

if (window.top == window) {
    //IN MAIN WINDOW
    let workflow: IWorkflow;

    const baloon = document.createElement('div');

    let currStep = -1; //Track current step in workflow

    const startWorkflow = function () {
        currStep = 0;
        executeStep();
        observer = getDOMObserverMain();
        startObserver();
    };

    const executeStep = function () {
        if (currStep == workflow.steps.length) {
            //Workflow completed
            currStep = -1;
            stopObserver();
            alert('Workflow exectuted successfully!');
            return;
        }
        if (currStep == -1) return;

        const message: IMessage = { type: 'add-step', step: workflow.steps[currStep] };
        sendMessage(message);
    };

    const sendMessage = function (message: IMessage) {
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
    };

    const setBaloonPosition = function (baseElementRect: IRectangle) {
        showBaloon();
        //Align baloon center with element center
        baloon.style.top = baseElementRect.top + baseElementRect.height / 2 - baloon.offsetHeight / 2 + 'px';
        baloon.style.left = baseElementRect.left + baseElementRect.width + 10 + 'px';
    };

    const hideBaloon = function () {
        baloon.style.display = 'none';
    };

    const showBaloon = function () {
        baloon.style.display = 'flex';
    };

    const setBaloonContent = function (step: IStep) {
        baloon.innerHTML = `
        <h4>${step.content}</h4>
        `;
    };

    //Set content and position of baloon
    const configureBaloon = function () {
        if (currStep == -1) return;
        const step = workflow.steps[currStep];
        setBaloonContent(step);
        adjustBaloon();
    };

    //Observer for main window
    const getDOMObserverMain = function () {
        return new MutationObserver(function (records) {
            let valid = true;
            records.map(function (record) {
                if (record.target.id === baloon.id) {
                    valid = false;
                    return;
                }
            });
            if (valid && currStep != -1) {
                //Always re-add step as an element/iframe could've been added or removed
                reAddStep();
            }
        });
    };

    const goToNextStep = function () {
        hideBaloon();
        currStep++;
        executeStep(); //Execute next steps
    };

    const listenToMessages = function () {
        window.addEventListener('message', function (event) {
            let message: IMessage = event.data;

            let rect: IRectangle, frameSelector, step: IStep, focusElement, visible;

            switch (message.type) {
                case 'rect-response':
                    rect = message.rect;
                    visible = message.visible;
                    if (rect.height === 0 || currStep === -1 || !visible) {
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
                    rect = notInDomRect;
                    if (focusElement) {
                        rect = focusElement.getBoundingClientRect();
                    }
                    visible = rect.top > 0 && rect.bottom < window.innerHeight;
                    message = { type: 'rect-response', rect, visible };
                    sendMessage(message);
                    break;

                case 'add-step':
                    step = event.data.step;
                    if (step.iframes.length == 0) {
                        focusElement = document.querySelector(step.selector);
                        if (!focusElement) {
                            //Step not found, hide baloon
                            message = { type: 'step-not-found', step };
                            sendMessage(message);
                            break;
                        }
                        focusElement.addEventListener(step.type, finishStep);
                        message = { type: 'step-found', step };
                        sendMessage(message);
                    }
                    break;

                case 're-add-step':
                    executeStep();
                    break;

                case 'step-found':
                    //Step found. Set baloon and scroll
                    step = message.step;
                    addScrollToParents(step);
                    configureBaloon();
                    break;

                case 'step-not-found':
                    //Step not found, remove scroll and baloon
                    step = message.step;
                    removeScrollOfParents();
                    hideBaloon();
                    break;

                case 'adjust-baloon':
                    if (currStep == -1) break;
                    message = { type: 'rect-request', step: workflow.steps[currStep] };
                    sendMessage(message);
                    break;

                case 'finish-step':
                    removeScrollOfParents();
                    goToNextStep();
                    break;
            }
        });
    };

    const fetchWorkflows = async function () {
        const messageService = MessagingService.getInstance();
        workflow = await messageService.sendMessage({ type: 'request', resource: 'workflow' });
        const workflowButton = document.createElement('button');
        workflowButton.id = 'workflow-button';
        workflowButton.innerHTML = 'Start Workflow';
        workflowButton.addEventListener('click', startWorkflow);
        workflowButton.style.cssText = `position:fixed;top:0px;left:0px;z-index:100`;
        document.body.appendChild(workflowButton);
    };

    const addCSS = function () {
        const style = document.createElement('style');
        style.innerHTML = baloonCSS;
        document.head.appendChild(style);
    };

    window.addEventListener('load', function () {
        addCSS();
        fetchWorkflows();
        document.addEventListener('scroll', adjustBaloon);
        baloon.classList.add('step-dialog');
        baloon.id = 'apty-baloon';
        document.body.appendChild(baloon);
        hideBaloon();
        listenToMessages();
    });
} else {
    //IN IFRAMES
    const frameSelector = '#brandBand_2 > div > div > div.windowViewMode-normal.oneContent.active.lafPageHost > iframe';

    const listenToMessages = function () {
        window.addEventListener('message', function (event) {
            let message = event.data;
            let focusElement, step, rect;

            switch (message.type) {
                case 'rect-request':
                    step = message.step;
                    if (step.iframes.length == 0 || step.iframes[0] !== frameSelector) break;
                    focusElement = this.document.querySelector(step.selector);
                    if (!focusElement) {
                        rect = notInDomRect;
                    } else {
                        rect = focusElement.getBoundingClientRect();
                    }
                    const visible = rect.top > 0 && rect.bottom < window.innerHeight;
                    message = {
                        type: 'rect-response',
                        rect,
                        frameSelector: frameSelector,
                        visible,
                    };
                    sendMessageToMain(message);
                    break;

                case 'add-step':
                    step = message.step;
                    if (step.iframes.length == 0 || step.iframes[0] !== frameSelector) break;
                    if (!observer) {
                        observer = getObserverFrame();
                    }
                    startObserver();
                    focusElement = document.querySelector(step.selector);
                    if (focusElement) {
                        //Element found. Set scroll,add listener
                        focusElement.addEventListener(step.type, finishStep);
                        addScrollToParents(step);
                        message = { type: 'step-found', step };
                        sendMessageToMain(message);
                    } else {
                        //Element not found,remove scroll
                        removeScrollOfParents();
                        message = { type: 'step-not-found', step };
                        sendMessageToMain(message);
                    }
                    break;
            }
        });
    };

    window.onload = function () {
        observer = getObserverFrame();
        listenToMessages();
    };
}
