const fsPromises = require('fs').promises;


//Funcion wil return promise
function readfiles()
{
  return new Promise((res, rej) => {
    //Chaining of promises,when then there is no error in reading both the files then read both the files together otherwise throw error
    fsPromises.readFile('./sample_1.js',{encoding:'utf-8'})
     .then(data1 => {
       fsPromises.readFile('./sample_2.js',{encoding:'utf-8'})
        .then(data2 => {
          return res({data1,data2});
        })
        .catch(err1 => {
          return rej(err1);
        })
     })
     .catch(err2 => {
       return rej(err2);
     })
  });

}

const rea = readfiles();
rea.then(data => {
    console.log(data);
})
.catch(err => {
    console.log(err);
});




//Method 2

/*const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);


function readfiles()
{
  return new Promise((res, rej) => {
   readFile('./sample_1.js' , {encoding:'utf-8'})
    .then(data1 => {
       readFile('./sample_2.js' , {encoding : 'utf-8'})
        .then(data2 => {
          return res({data1,data2});
        })
        .catch(err1 => {
          return  rej(err1);
        })
    })
    .catch(err2 => {
     return  rej(err2)
   })
 })
}

const rea = readfiles();
rea.then(data => {
    console.log(data);
})
.catch(err => {
    console.log(err);
});
*/



 //Original
/*const {readFile} = require('fs');



function readfiles()
{
  return new Promise((res, rej) => {
   
    readFile('sample_1.js' , {encoding:'utf-8'},(err,data1) =>{
     if(err)
      return rej(err)
      
      readFile('./sample_2.js' , {encoding : 'utf-8'} ,(err,data2) =>{
       if(err)
        return rej(err)
       
     
       res({data1,data2});
      })
    })
  })
}

const rea = readfiles();
rea.then(data => {
    console.log(data);
})
.catch(err => {
    console.error(err);
});
*/
