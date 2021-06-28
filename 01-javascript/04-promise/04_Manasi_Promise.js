const {promises: {readFile} } = require('fs');

// Promises are success first function, since first argument is resolve and second is reject
// When a promise is resolved code inside 'then' will execute and if the promise is rejected code inside 'catch' will be executed

    readFile('./lol.txt').then((lol)=>{
      
        console.log(lol.toString());
        return readFile('./sasa.txt');
    
    }).then((sasa)=>{
    
      console.log(sasa.toString());
        return readFile('./whatever.txt');
    
    }).then((wData)=>{
    
      console.log(wData.toString());
    
    }).catch(err=>console.error(err));

  
  
