const fs = require('fs');
// here we can use fs.promises to use promise version of the readFile function
function readFiles()
{
  // returning promise
  return new Promise((res,rej)=>{
    fs.promises.readFile('async.js',{encoding:'utf-8'})
      .then((asyncData)=>{
        fs.promises.readFile('callback.js',{encoding:'utf-8'})
          .then((callData)=>{
            res({asyncData,callData});
          })
          .catch((err)=>{
              rej("error in callback reading",err);
          })
      })
      .catch((err)=>{
        rej("error in async reading",err);
      })
    });
}

readFiles().then((data)=>{
  console.log("Hey here is the file data:",data);
}).catch((error)=>{
  console.error(error)
});