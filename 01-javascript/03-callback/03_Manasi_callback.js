//simple example using callback function
function add(a,b,callback){
    let sum = a+b;
    let err = typeof sum != 'number';
    if(err)
    return callback(err,null);
    callback(null,sum); 
}

function additionPossible(err,data){
    if(err) 
    console.error("Enter valid numbers.Numbers not valid!!");
    else
    console.log("The sum of the numbers is:", data);
}

add(7, 5, additionPossible);

//Another example using filesystem module
//The given example reads a file, updates it and deletes the file which is not required.
//Appropriate callback function is called based on whether the function gives error or not. 

var fs = require('fs');

function fileUpdate(callback){

    fs.readFile('./Personaltxt.txt', { encoding: 'utf-8' }, (err, data) => {
        if(err)
        return callback(err,null);
        fs.appendFile('./Personaltxt.txt', 'Designation: Software Engineer', err =>{
            if(err)
            return callback(err,null);
            fs.readFile('./Personaltxt.txt', {encoding: 'utf-8'}, (err,dataup)=>{
                if(err)
                return callback(err,null);
                callback(null,dataup);
                fs.unlink('./Personal.docx', err => {
                    if (err) 
                    callback(err,null);
                    console.log('File deleted!');
                })
            })
        })
    })
}



fileUpdate((err,data)=>{
    if(err)
    console.error("The following error occured",err);
    else
    console.log(data);
});
//A very bad way of writing code as it is difficult to debug and read. This can be improved using promises.
