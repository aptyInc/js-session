const number1 = document.querySelector("#inp-1");

const number2 = document.querySelector("#inp-2");

const result = document.querySelector(".result");

var num1;
var num2;

number1.onchange = (e)=>{
	num1 = parseInt(e.target.value);
	console.log(num1);
}

number2.onchange = (e)=>{
	num2 = parseInt(e.target.value);
	console.log(num2);
	
}

if(window.Worker){
	const myWorker = new Worker("worker.js");

	function submit(){
		myWorker.postMessage([num1, num2]);
	}
	
	myWorker.onmessage = (res)=>{
		result.textContent = res.data;
		console.log('result received from workers');
	}
}
else{
	console.log("web workers not supported");
}
