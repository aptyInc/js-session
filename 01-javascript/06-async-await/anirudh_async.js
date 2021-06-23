const {readFile} = require('fs');


function ReadFilePromise(path)
{
  return new Promise((res, rej) => {
    readFile(path , {encoding:'utf-8'},(err,data) =>{
     if(err)
      return rej(err);

      return res(data);
    })
})
}

async function readFiles()
{
  let count=0;
let paths=['./anirdhsinghtomar.js','./index.js'];
let content;
for(const file of paths)
{  count++;
   try {
     content = await ReadFilePromise(file);
   } catch(err) {
     if(count===1)
     console.log("File 1 ");
     else if(count==2)
     console.log("File 2");
   }
 }
 return content;
}
readFiles();
