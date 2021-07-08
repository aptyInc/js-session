/*
This file include functionalities for the background threads in javascript(web workers).
Web workers take a single object input and allows main thread to interact with background threads
with the help of postMessage and onmessage functions, below is the program for the same.
*/

// fatching html input elements
let base = document.getElementById("inp-1");
let perpendicular = document.getElementById("inp-2");

// below function updates the value of the hypotenuse 
// and interact with the worker.js get background thread execution result
let updateHypotenious = (base, perp) => {
    // creating worker instance
    const myWorker = new Worker("worker.js");
    // sending perameters as an array (json can also be used)
    myWorker.postMessage([base,perp]);
    // listning for the response
    myWorker.onmessage = (hyp) => {
        // updating the dom element on response
        document.getElementById("hypotenuse").innerHTML=hyp.data;
    }
}

// setting hypotenious value for the default base and perpendicular
updateHypotenious(base.value,perpendicular.value);

// listening for base change to call action for hypotenious update
base.addEventListener("change",(e)=>{
    // updating base element
    base = document.getElementById("inp-1");
    // call to update
    updateHypotenious(base.value,perpendicular.value);
});

// listening for perpendicular change to call action for hypotenious update
perpendicular.addEventListener("change",(e)=>{
    //updating perpendicular element
    perpendicular = document.getElementById("inp-2");
    // call to update
    updateHypotenious(base.value,perpendicular.value);
});