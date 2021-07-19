const workflow = {
	name: "frames flow",
	steps: [
		{
			name: "step1",
			content: "Enter message to send to iframe",
			iframes: [],
			selector: "#main-input",
			type: "keypress",
		},
		{
			name: "step2",
			content: "Send message to iframe1",
			iframes: [],
			selector: "#main-send",
			type: "click",
		},
		{
			name: "step3",
			content: "Enter message to send to main window",
			iframes: ["#iframe1"],
			selector: "#iframe-input",
			type: "keypress",
		},
		{
			name: "step4",
			content: "Send message to main",
			iframes: ["#iframe1"],
			selector: "#frame-send",
			type: "click",
		},
		{
			name: "step5",
			content: "Enter message to send to main window",
			iframes: ["#iframe2"],
			selector: "#iframe-input",
			type: "keypress",
		},
		{
			name: "step6",
			content: "Send message to main",
			iframes: ["#iframe2"],
			selector: "#frame-send",
			type: "click",
		},
		{
			name: "step7",
			content: "Enter message to send to main window",
			iframes: ["#iframe3"],
			selector: "#iframe-input",
			type: "keypress",
		},
		{
			name: "step8",
			content: "Send message to main",
			iframes: ["#iframe3"],
			selector: "#frame-send",
			type: "click",
		},
		{
			name: "step9",
			content: "Enter message to send to main window",
			iframes: ["#iframe4"],
			selector: "#iframe-input",
			type: "keypress",
		},
		{
			name: "step10",
			content: "Send message to main",
			iframes: ["#iframe4"],
			selector: "#frame-send",
			type: "click",
		},
	],
};

const baloon = document.createElement("div");

let currStep = -1; //Track current step in workflow

function startWorkflow() {
	currStep = 0;
	executeNextStep();
}

function executeNextStep() {
	if (currStep == workflow.steps.length) {
		//Workflow completed
		currStep = -1;
		alert("Workflow exectuted successfully!");
		return;
	}

	const message = { type: "add-step", step: workflow.steps[currStep] };
	sendMessage(message);
}

//Handle step-finish
function goToNextStep() {
	hideBaloon();
	currStep++;
	executeNextStep(); //Execute next steps
}

function sendMessage(message) {
	const iframes = document.getElementsByTagName("iframe");
	window.postMessage(message, "*");
	for (const iframe of iframes) {
		const iframeWindow = iframe.contentWindow;
		iframeWindow.postMessage(message, "*");
	}
}

function adjustBaloon() {
	if (currStep == -1) return;
	const message = { type: "rect-request", step: workflow.steps[currStep] };
	sendMessage(message);
}

function setBaloonPosition(baseElementRect) {
	showBaloon();
	//Align baloon center with element center
	baloon.style.top =
		baseElementRect.top +
		baseElementRect.height / 2 -
		baloon.offsetHeight / 2 +
		"px";
	baloon.style.left = baseElementRect.left + baseElementRect.width + 10 + "px";
}

function hideBaloon() {
	baloon.style.display = "none";
}

function showBaloon() {
	baloon.style.display = "flex";
}

function setBaloonContent(step) {
	baloon.innerHTML = `
	<h4>${step.content}</h4>
	`;
}

function finishStep() {
	const message = { type: "finish-step", step: workflow.steps[currStep] };
	sendMessage(message);
}

//Set content and position of baloon
function configureBaloon() {
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

let scrollableParents = [];

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
	currDocEle = currDocEle.parentElement;
	while (currDocEle) {
		currDocEle.addEventListener("scroll", adjustBaloon);
		scrollableParents.push(currDocEle);
		currDocEle = currDocEle.parentElement;
	}
}

//Remove scroll listener on parents after step finished
function removeScrollOfParents() {
	for (const parent of scrollableParents) {
		parent.removeEventListener("scroll", adjustBaloon);
	}
	scrollableParents = [];
}

function chat() {
	const text = document.getElementById("main-input").value;
	const message = { type: "chat", text };
	sendMessage(message);
}

window.addEventListener("message", function (event) {
	let message = event.data;
	let rect, frameSelector, step, focusElement;
	switch (message.type) {
		case "chat":
			const newMessage = document.createElement("h5");
			newMessage.innerText = message.text;
			const inbox = this.document.getElementById("main-inbox");
			inbox.appendChild(newMessage);
			break;
		case "rect-response":
			if (!message.visible) {
				hideBaloon();
				break;
			}
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
				const newRect = {
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
		case "rect-request":
			step = event.data.step;
			if (step.iframes.length > 0) break; //Element not in this doc
			focusElement = document.querySelector(step.selector);
			rect = focusElement.getBoundingClientRect();
			const visible = rect.top > 0 && rect.bottom < window.innerHeight;
			message = {
				type: "rect-response",
				rect,
				visible,
			};
			sendMessage(message, "*");
			break;
		case "add-step":
			step = event.data.step;
			if (step.iframes.length == 0) {
				focusElement = this.document.querySelector(step.selector);
				focusElement.addEventListener(step.type, finishStep);
			}
			addScrollToParents();
			configureBaloon();
			break;
		case "finish-step":
			step = workflow.steps[currStep];
			if (step.iframes.length == 0) {
				focusElement = this.document.querySelector(step.selector);
				focusElement.removeEventListener(step.type, finishStep);
			}
			removeScrollOfParents();
			goToNextStep();
			break;
		case "adjust-baloon":
			adjustBaloon();
			break;
	}
});

window.onload = function () {
	document.addEventListener("scroll", adjustBaloon);
	baloon.classList.add("step-dialog");
	baloon.id = "apty-baloon";
	document.body.appendChild(baloon);
	hideBaloon();
	// document.getElementById("main-input").style.display = "none";
	addDOMListener();
	// setTimeout(function () {
	// 	document.getElementById("main-input").style.display = "block";
	// }, 2000);
};
