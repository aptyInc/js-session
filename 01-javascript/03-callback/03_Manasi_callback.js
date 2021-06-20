// synchronous callback

function add(a,b,callback){
    let sum = a+b;
    callback(sum);
}

function additionPossible(sum){
    if(typeof sum === 'number') 
    console.log("The sum of the numbers is:", sum);
    else
    console.log("Cannot find sum");
}

add("a", 5, additionPossible);


// asynchronous callback

function identity(firstName, lastName,callback){
   console.log("Displaying your name....");
   if(firstName && lastName)
   console.log("Your full name is",firstName+" " +lastName);

    callback(firstName==null);
}

function check (err){
        setTimeout(()=>{
            if(err)
            console.log("You committed a mistake!! Please enter your first name");
            else
            console.log("You entered a valid name");
         } ,2000);
    
}

identity(null, "Anderson", check);
