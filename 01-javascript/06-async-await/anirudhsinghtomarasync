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
