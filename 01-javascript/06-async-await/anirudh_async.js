const {readFile} = require('fs');

//Function returns promise
function ReadFilePromise(path)
{
  return new Promise((res, rej) => {
   readFile(path , {encoding:'utf-8'},(err,data) =>{
    if(err)
     return rej(err);

     return res(data);
   });
 });
}

async function readFiles()
{ //variable to see the path through which the error is generated.
  let count=0;
  //if error found in any step its value will be incremented. 
  let errorrr=0;
  let paths=['./anirudhsinghtomar.js','./index.js'];
  //arrsy to store content of the file which it want to read
  let content =[];
  //running loop for both the files....
  for(const file of paths)
  {
    count++;
    try {
      content.push(await ReadFilePromise(file));
    } catch(err) {
      errorrr++;
      if(count===1)
      console.log("File 1 ");

      else if(count==2)
      console.log("File 2");
   }   
  }
  if(errorrr===0)
   console.log({content});
}

readFiles();

//Method 2
/*
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
  let datadisc ;
  let databdisc;
  try{

    const data = await ReadFilePromise('./anirdhsinghtomar.js');
    if(data)
    {
       datadisc = true;
    }
    const datab = await ReadFilePromise('./index.js');
    if(datab)
    {
    databdisc = true;
    }
    console.log({data,datab});
  }
    catch(err)
    {
      if(!datadisc)
      console.log("Anirudhsinghtomar.js file is not found");

      else if(!databdisc)
      console.log("index,js file is not found");
    }

}


readFiles();
*/
