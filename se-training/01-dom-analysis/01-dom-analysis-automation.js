// This function is a wrapper for all the functions to handle errors
var makeSafe = function(fn){
  return function(){
    try{
      return fn.apply(this, arguments);
    }catch(error){
      console.log("DOM Analysis error: ", error);
    }
  };
};

// This function will return all the elements found in given root
var getAllElements = makeSafe((root) => {
  return root.querySelectorAll('*')
});

var crossOriginCount = 1;
// This function will return URL location of the given element/root
var getIFrameOrigin = (element) => {
  var origin = "";
  try {
    origin = element.contentWindow && element.contentWindow.location.href;
  } catch(e) {
    origin = `Cross Origin ${crossOriginCount}`;
    crossOriginCount++;
  }
  return origin;
}

// This function will return if the element is cross origin element or not
var isCrossOriginFrame = makeSafe((element) => {
  var isCrossOrigin = false;
  try {
    var origin = element.contentWindow && element.contentWindow.location.origin;
    isCrossOrigin = window.top.location.origin !== origin;
  } catch(e) {
    isCrossOrigin = true;
  }
  return isCrossOrigin;
});

// This function will find iframe and elements inside it
var findIFrame = makeSafe((tag, element, elementsOutput) => {
  if (tag === 'iframe') {
    var origin = getIFrameOrigin(element);
    if (!elementsOutput.iframes) {
      elementsOutput.iframes = {};
    }
    if (!elementsOutput.iframes[origin]) {
      elementsOutput.iframes[origin] = {
        isCrossOrigin: isCrossOriginFrame(element)
      }
      var frameElements = getAllElements(element.contentDocument && element.contentDocument);
      if (frameElements && frameElements.length) {
        startDomAnalysis(frameElements, elementsOutput.iframes[origin]);
      }
    }
  }
});

// This function will find all the attributes of a given element
var findAttributes = makeSafe((element, elementsOutput) => {
  for(var j=0; j< (element.attributes || []).length; j++){
    var attribute = element.attributes[j];
    if (!elementsOutput.attributes) {
      elementsOutput.attributes = {};
    }
    if (!elementsOutput.attributes[attribute.name]) {
      elementsOutput.attributes[attribute.name] = {}
    }
    if (!elementsOutput.attributes[attribute.name][attribute.value]) {
      elementsOutput.attributes[attribute.name][attribute.value] = 0
    }
    elementsOutput.attributes[attribute.name][attribute.value]++;
  }
});

// This function will find shadow roots and it's elements ofr given element
var findShadowRoots = makeSafe((tag, element, elementsOutput) => {
  if (element && element.shadowRoot instanceof DocumentFragment) {
    if (!elementsOutput.shadowRoots) {
      elementsOutput.shadowRoots = {};
    }
    if (!elementsOutput.shadowRoots[tag]) {
      elementsOutput.shadowRoots[tag] = {};
      var shadowRootElements = getAllElements(element.shadowRoot);
      if (shadowRootElements && shadowRootElements.length) {
        startDomAnalysis(shadowRootElements, elementsOutput.shadowRoots[tag]);
      }
    }
  }
});

// This function is the main function which will do the DOM analysis
var startDomAnalysis = makeSafe((elements, elementsOutput) => {
  if (!elementsOutput) {
    elementsOutput = {}
  };
  for(var i=0; i< (elements || []).length; i++){
    var element = elements[i];
    if (!element) {
      continue;
    }

    // Checking for tag name
    var tag = (element.tagName || '').toLowerCase();
    if (!elementsOutput.tags) {
      elementsOutput.tags = {};
    }
    if (!elementsOutput.tags[tag]) {
      elementsOutput.tags[tag] = 0;
    }
    elementsOutput.tags[tag]++;

    // Checking for attributes like class, id, etc.,
    findAttributes(element, elementsOutput);

    // Checking for iFrames
    findIFrame(tag, element, elementsOutput);

    // Checking for shadow roots
    findShadowRoots(tag, element, elementsOutput);
  };
  return elementsOutput;
});

var allElements = getAllElements(document);
var domAnalysis = startDomAnalysis(allElements);

console.log('String', JSON.stringify(domAnalysis));
