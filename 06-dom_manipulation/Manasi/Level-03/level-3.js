//choosing the target which is to be observed
var target = document.querySelector('body');  

//creating a MutationObserver
var observer = new MutationObserver(callback);

function callback(mutationList) {
  //console.log(mutationList);
for(let j = 0; j < mutationList.length; j++) {
      console.log("Added " +mutationList[j].addedNodes[0].tagName+ " node");
    }
   
}

//observing DOM changes
observer.observe(target, {
		childList: true,
    });

//adding nodes to body element using for loop
for(let i = 1; i <= 10; i++){
	if(i%4 === 0){
	    var child1 = document.createElement("p");
	    child1.innerText = "New paragraph created";
	    document.body.appendChild(child1);
	}else if(i%4 === 1){
	    var child2 = document.createElement("h1");
	    child2.innerText = "New heading created";
	    document.body.appendChild(child2);
  	}else if(i%4 === 2){
	    var child3 = document.createElement("div");
	    child3.textContent = "New div tag created";
	    document.body.appendChild(child3);
  	}else {
	    var child4 = document.createElement("button");
	    child4.value = "New button created";
	    document.body.appendChild(child4);
	}
  
   
}
