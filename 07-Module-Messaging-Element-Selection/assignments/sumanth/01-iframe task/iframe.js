window.addEventListener("message", function (event) {
	const newMessage = document.createElement("h5");
	newMessage.innerText = event.data;
	const inbox = this.document.getElementById("iframe-inbox");
	inbox.appendChild(newMessage);
});
function sendToMain() {
	const text = document.getElementById("iframe-input").value;
	window.top.postMessage(text, "*");
}
