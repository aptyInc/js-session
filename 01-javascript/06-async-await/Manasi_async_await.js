const { readFile } = require('fs');

//variables to check whether there is an error while reading the file
var lolfound = false;
var sasafound = false;


//function returns a promise
function fileReaderPromise(path) {
    return new Promise((res,rej)=>{
        readFile(path, { encoding: 'utf-8' }, (err, data) => {
                return err ? rej(err) : res(data);
            
        })
    })
}


//try catch block is used to catch any errors while reading files
async function readFiles(){
    try{
            const loldata = await fileReaderPromise('./lol.txt');
            if(loldata)
                lolfound = true;

            const sasadata = await fileReaderPromise('./sasa.txt');
            if(sasadata)
                sasafound = true;

            console.log({loldata,sasadata});
      }catch (error){
            if(!lolfound)
                console.log("File1 caused error");
            else if(!sasafound)
                console.log("File2 caused error");

            console.error(error);
    }
}

//Calling the readFiles function
readFiles();
