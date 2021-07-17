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
	],
};

let currStep = 0; //Track current step in workflow

function executeWorkflow(button) {
	if (currStep == workflow.steps.length) {
		//Workflow completed
		currStep = 0;
		button.disabled = false;
		alert("Workflow exectuted successfully!");
		return;
	}
	button.disabled = true; //Only one instance of workflow allowed to run at a time
	let doc = document;
	const step = workflow.steps[currStep++];
	for (const iframe of step.iframes) {
		//Iterate to get the nested iframe in which element is present
		doc = doc.querySelector(iframe).contentDocument;
	}
	//Add CSS to the document which has the element, if not already added
	if (!doc.cssAdded) {
		addCSS(doc);
		//Attach flag to know if style already added.
		doc.cssAdded = true;
	}
	//Baloon element
	const baloon = document.createElement("div");
	baloon.innerHTML = `
	<h4>${step.name}</h4>
	<p>${step.content}</p>
	`;
	baloon.classList.add("baloon");
	//Get selected element
	const focusElement = doc.querySelector(step.selector);
	focusElement.classList.add("outline-yellow");
	focusElement.insertAdjacentElement("afterend", baloon);
	//Handle step-finish
	function stepAction() {
		focusElement.classList.remove("outline-yellow"); //Step executed,no need to highlight
		baloon.remove(); //Remove baloon, as step finished
		focusElement.removeEventListener(step.type, stepAction); //Remove event listener as step finished
		executeWorkflow(button); //Execute next steps
	}
	//Listen for step-execution
	focusElement.addEventListener(step.type, stepAction);
}

function sendToIFrame() {
	const text = document.getElementById("main-input").value;
	const iframe = document.getElementById("iframe1");
	const iframeWindow = iframe.contentWindow;
	iframeWindow.postMessage(text, "*");
}

window.addEventListener("message", function (event) {
	const newMessage = document.createElement("h5");
	newMessage.innerText = event.data;
	const inbox = this.document.getElementById("main-inbox");
	inbox.appendChild(newMessage);
});

function addCSS(doc) {
	const style = doc.createElement("style");
	const css = `
	.outline-yellow{
		outline:yellow 3px solid;
	}
	.baloon{
		background:white;
		background:white;
		padding:0.4rem;
		border-radius:0.4rem;
	}
	.baloon *{
		color:black;
	}
	`;
	style.innerHTML = css;
	doc.head.appendChild(style);
}
