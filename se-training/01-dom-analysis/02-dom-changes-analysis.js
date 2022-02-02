// Run this script in the browser console in host application tab
// This will print all the DOM changes when you interact with DOM
// and help to identify continuous DOM changes to ignore them from admin
new MutationObserver((mutations) => {
  console.log('Dom Changes', mutations);
}).observe(window.document.body, {
  attributes: true,
  childList: true,
  subtree: true,
  attributeOldValue: true
});