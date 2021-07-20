/*
This file is run by web workers when required
is exicuted apart form main thread as a background thread 
*/

// shorting down the math.pow function for better readability
let p = (a,b) => Math.pow(a,b);

// onmessage gets an input perameter which has all the data
onmessage = (perameter) => {
    
    // base and perpendiculr length are extracted 
    let base = perameter.data[0];
    let perp = perameter.data[1];
    // hypotenious is calculated
    let hyp = p(p(base,2)+p(perp,2),0.5).toFixed(3);
    
    // the value here is sent to main thread.
    postMessage(hyp);
}