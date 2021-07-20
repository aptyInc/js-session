// below code add event listeners to various html elements
// And handls the user actions 


// Single function for all type of click handling. 
const handleClickEvent = (e) => { 
    console.log("Hey, Here is element with id:",e.target.id);
}

// Here, we collect all the buttons to add a click event listner for them
buttons = document.querySelectorAll('button');
for(let i=0;i<buttons.length;i++) {
    buttons[i].addEventListener("click",handleClickEvent);
}

// Here, we collect all the inputs to add a click event listner for them
inputs = document.querySelectorAll('input');
for(let i=0;i<inputs.length;i++) {
    inputs[i].addEventListener("input",handleClickEvent);
}

// We add click event listner for our single H1 element persent on in index file.
document.getElementById('h1').addEventListener("click",handleClickEvent);


// We add click event listner for our single H2 element persent on in index file.
document.getElementById('h2').addEventListener("click",handleClickEvent);
