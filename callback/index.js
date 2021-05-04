const { readFile } = require('fs');

// callback is a function
// callback is a error first function, since first arguments is error and second is data 

// stack
function fileReader(callback) {
    // WEBAPI
    readFile('./lol.txt', { encoding: 'utf-8' }, (err, lol) => {
        if (err) {
            return callback(err, null)
        }
        readFile('./sasa.txt', { encoding: 'utf-8' }, (saErr, sasa) => {
            if (saErr) {
                return callback(saErr, null)
            }
            readFile('./whatever.txt', { encoding: 'utf-8' }, (wErr, wData) => {
                if (wErr) {
                    return callback(wErr, null)
                }
                return callback(null, { lol, sasa, wData });
            })
        })
    })
}

// function response(err, data) {
//     console.log(err, data);
// }



fileReader((err, data) => {
    if(err) {
        console.error(err)
        return
    }
    console.log(data);
});