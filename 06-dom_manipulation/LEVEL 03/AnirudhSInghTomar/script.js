const arr = ["p", "button", "li"];
const text = ["Hey this is Anirudh Singh Tomar", "Click to Know me", "By"];
function addtagss() {
  let observer;
  observer = new MutationObserver(mutated);
  let config = {
    childList: true,
  };
  observer.observe(document.body, config);

  for (let i = 0; i < arr.length; i++) {
    var node = document.createElement(arr[i]);
    var textnode = document.createTextNode(text[i]);
    node.appendChild(textnode);
    var element = document.getElementById("body");
    element.appendChild(node);
  }
}
function mutated(mutationList) {
  Array.prototype.forEach.call(mutationList, function (data) {
    let newnodes = data.addedNodes;
    Array.prototype.forEach.call(newnodes, function (newN) {
      console.log("Added a new node", newN.tagName);
    });
  });
}
