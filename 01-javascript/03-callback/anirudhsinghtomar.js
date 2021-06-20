//Simple factorial function using for loop
function factorial(number)
{
  if (number === 0 || number === 1)
    return 1;


  for (let i = number - 1; i >= 1; i--)
  {

    number = number * i;

  }
   return number;
}


//callback function example
//A function goes into Web Api if it satisty any of the two conditions: Callback or promises.
//Since it is javascript we can have another function as an arguement of a function.
function factor(number , callback) {
  setTimeout( () => {
   //In case you input a string as an input then the output cannot be calculated
    if(typeof number !== "number")
    {
      err = true;
      // callback is a error first function, since first arguments is error and second is data
      callback(err,null);
      return;
    }
    if(number<0)
    {
      err = true;
      // callback is a error first function, since first arguments is error and second is data
      callback(err,null);
      return;
    }  

  const result = factorial(number);
  // callback is a error first function, since first arguments is error and second is data
  callback(null , result);

},1000);
}


let callback = (err , result) =>
{
  if(err !== null)
  {
    console.log("Error is caught" );
    return;
  }
  console.log(result);

}

factor(5,callback);
//Output: 120
factor("Anirudh",callback);
//Output : Error is caught
