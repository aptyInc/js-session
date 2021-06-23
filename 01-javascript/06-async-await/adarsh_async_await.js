// @ts-check

const { readFile } = require('fs');

function readFilePromise(path) {
  return new Promise((res,rej)=>{
    readFile(path,{encoding:'utf-8'},(err,data) => {
      return err ? rej({path,err}) : res(data);
    });
  });
}

async function readFiles() {
  try {
    const asyncData = await readFilePromise('./async.js');
    const callBackData = await readFilePromise('./callback.js');
    console.log({asyncData,callBackData});
  } catch (error) {
    console.log('[ERROR] Can not open file:', error.path)
  }
}

readFiles();
