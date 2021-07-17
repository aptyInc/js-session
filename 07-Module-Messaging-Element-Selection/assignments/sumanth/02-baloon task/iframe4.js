const frameSelector = "#iframe4";
window.addEventListener("message", function (event) {
	let message = event.data;
	let focusElement, step, rect, handler;
	switch (message.type) {
		case "chat":
			const newMessage = document.createElement("h5");
			newMessage.innerText = message.text;
			const inbox = this.document.getElementById("iframe-inbox");
			inbox.appendChild(newMessage);
			break;
		case "rect-request":
			step = message.step;
			if (step.iframes.length == 0 || step.iframes[0] !== frameSelector) break;
			focusElement = this.document.querySelector(step.selector);
			rect = focusElement.getBoundingClientRect();
			const visible = rect.top > 0 && rect.bottom < window.innerHeight;
			message = {
				type: "rect-response",
				rect,
				frameSelector: frameSelector,
				visible,
			};
			this.window.top.postMessage(message, "*");
			break;
		case "add-step":
			step = message.step;
			if (step.iframes.length == 0 || step.iframes[0] !== frameSelector) break;
			focusElement = this.document.querySelector(step.selector);
			focusElement.addEventListener(step.type, finishStep);
			addScrollToParents(step);
			break;
	}
});

var scrollableParents = [];

function addScrollToParents(step) {
	if (step.iframes.length == 0 || step.iframes[0] !== frameSelector) return;
	document.addEventListener("scroll", adjustBaloon);
	let currDocEle = document.querySelector(step.selector);
	currDocEle = currDocEle.parentElement;
	while (currDocEle) {
		currDocEle.addEventListener("scroll", adjustBaloon);
		scrollableParents.push(currDocEle);
		currDocEle = currDocEle.parentElement;
	}
}

function adjustBaloon() {
	const message = { type: "adjust-baloon" };
	sendMessage(message);
}

function removeScrollOfParents() {
	for (const parent of scrollableParents) {
		parent.removeEventListener("scroll", adjustBaloon);
	}
	document.removeEventListener("scroll", adjustBaloon);
	scrollableParents = [];
}

function finishStep(event) {
	removeScrollOfParents();
	event.target.removeEventListener(event.type, finishStep);
	const message = { type: "finish-step" };
	sendMessage(message);
}

function sendMessage(message) {
	window.top.postMessage(message, "*");
}

function sendToMain() {
	const text = document.getElementById("iframe-input").value;
	const message = { type: "chat", text };
	sendMessage(message);
}

function addDOMListener() {
	const observer = new MutationObserver(function () {
		adjustBaloon();
	});
	observer.observe(document.body, {
		childList: true,
		subtree: true,
		attributes: true,
	});
}

window.onload = function () {
	addDOMListener();
	// const ele = document.getElementById("iframe-input");
	// ele.style.display = "none";
	// setTimeout(function () {
	// 	ele.style.display = "block";
	// }, 10000);
};
