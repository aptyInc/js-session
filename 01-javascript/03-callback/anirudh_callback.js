function factorial(number)
{
  if (number === 0 || number === 1)
   return 1;
  
  for (let i = number - 1; i >= 1; i--)
   number = number * i;
  
  return number;
}

/*

//Stack
function factor(number)
{ //Web Api
  setTimeout( () => {
    if(typeof number !== "number" || number<0)
     console.log("Error is caught");
    
    return (factorial(number));
  } ,1000);
}
console.log(factor(5));
//Output:undefined 

//why undefined??Because the function factor is not returning anything and the setTimeout function will return anything after 1000 seconds.This is the reason why it is returning undefined.
//The setTimeout function loads “asynchronously”, as it starts loading now, but runs later, when the function has already finished.
*/

//callback function example
//A function goes into Web Api if it satisty any of the two conditions: Callback or promises.
//Since it is javascript we can have another function as an arguement of a function.
//Stack
function factor(number , callback) {
  //Web Api
  setTimeout( (err,data) => {
    
    if(typeof number !== "number" || number<0)
     err=true;
    
    if(err)
     return callback(err,null);
    
    data = factorial(number);
    return callback(null , data);
   },1000);
//The function would not have returned anything if there was no callback function
}

datausage=(data)=>console.log(data);
errorhandling=(err)=>console.log("Error is caught");

let callback = (err , data) =>
{
  if(err !== null)
  errorhandling(err);
  
  else
  datausage(data);
  
  return;
}
factor(5,callback);
//Output: 120
factor("Anirudh",callback);
//Output : Error is caught
