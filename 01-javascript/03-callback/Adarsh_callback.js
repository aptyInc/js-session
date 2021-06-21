//Hey, Welcome to callback example using file system in javascript.
//The callback is used to achieve execution sequence in javascript.
/*
The below example creates a busFile named .txt file in our local system and initializes it with a description.
Then we add some bus details in our busFile; these programs need to be nested to achieve execution one after another. At the end callback function is return with the entire data situated in the file.
*/
var fs = require('fs'); // we require javascript filesystem to use inbuild file handling library.

var busFile='myBusFile.txt' 

let filesys = function (busFile, callback) {

  fs.writeFile(busFile, 'This is ' + busFile + ' content..\n', function (err) {  
    // writeFile creates a file named busFile if not present in the directory
    // and write the given text in it. 
    if (err) 
      return callback(err,null);
    
    console.log(busFile , " is created");

    fs.appendFile(busFile, 'B01 Ind->Jp'+'\n', function (err) { 
    // we append a bus detail in busFile 
      if (err) 
      return callback(err,null);
      
      console.log('B01 Ind->Jp added');
      
      fs.appendFile(busFile, 'B02 Dhl->Bom'+'\n', function (err) {
      // we append another bus detail in busFile  
        if (err) 
        return callback(err,null);
        
        console.log('B02 Dhl->Bom added');
        
        fs.readFile(busFile, 'utf8' , (err, data) => {
          if (err) 
          return callback(err,null);
          
          // here we return the file data
          return callback(null,data);

        });
      });
    });
  });
}

usefurther = (outputData) => console.log("output has length",outputData.length +'\n',outputData );   
handleError = (err) => console.log("error has the following text",err);   

filesys(busFile, (err,data) => err?handleError(err):usefurther(data));


//The drawback with callback is it requires a lot of nesting 
//which makes your program complex and less readable.
