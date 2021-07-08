// the below file has the handAdd function which does the needfull for a dropDown selection.
// chose a option is defalt option which is ignored and rest are processed further for element creation

document.body.addEventListener("DOMNodeInserted",(e)=>{console.log("Added",e.target.tagName,"element")});

let handleAdd = (elementType) => {
    // get the type of html element
    let tag = elementType.value;
    
    // No action for default values
    if(tag == "#")  
        return;
    // Creating the element
    let element = document.createElement(tag);
    
    // To identify the element
    element.innerHTML = tag
    
    // Element is appended to the DOM
    document.body.append(element);
}

