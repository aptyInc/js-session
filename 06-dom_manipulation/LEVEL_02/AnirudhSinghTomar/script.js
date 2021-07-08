addnumber = () => {
    let num1 = parseInt(document.getElementById("number1").value);
    let num2 = parseInt(document.getElementById("number2").value);
    if (window.Worker) {
        let worker1 = new Worker("worker.js");
        let message = {
            toadd: {
                number1: num1,
                number2: num2
            }
        };
        worker1.postMessage(message)

        worker1.onmessage = function(e) {
            console.log(e.data.result);
        };
    }
}
