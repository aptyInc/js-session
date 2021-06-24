//Method 1
const{readFile} = require('fs');
//Generates a promise version of the readFile
const fsPromises = require('fs').promises;


//Funcion wil return promise
function readfiles()
{
  return new Promise((res, rej) => {
    fsPromises.readFile('./sample_1.js',{encoding:'utf-8'})
     .then(data => {
       fsPromises.readFile('./sample_2.js',{encoding:'utf-8'})
          .then(datab => {
            return res({data,datab})
          })
          .catch(errr => {
            return rej(errr)
         })
    })
    .catch(err => {
       return rej(err);
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




//Method 2

/*const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);


function readfiles()
{
  return new Promise((res, rej) => {
   readFile('./sample_1.js' , {encoding:'utf-8'})
    .then(data => {
       readFile('./sample_2.js' , {encoding : 'utf-8'})
        .then(datab => {
          return res({data,datab});
         })
         .catch(err => {
           return  rej(err);
     })
    })
    .catch(err => {
     return  rej(err)
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
    readFile('./sample_1.js' , {encoding:'utf-8'},(err,data) =>{
     if(err)
      {
      return rej(err)
      }
    readFile('./sample_2.js' , {encoding : 'utf-8'} ,(err,datab) =>{
    if(err)
      {
      return rej(err)
      }
      res({data,datab});
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
