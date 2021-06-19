//Hey, Welcome to callback example using file system in javascript.
//The callback is used to achieve execution sequence in javascript.
/*
The below example creates a busFile named .txt file in our local system and initializes it with a description.
Then we add some bus details in our busFile; these programs need to be nested to achieve execution one after another. At the end printDataBase function prints the entire data situated in the file.
*/
var fs = require('fs'); // we require javascript filesystem to use inbuild file handling library.

var busFile='myBusFile.txt' 

printDataBase = (file) =>   // printDataBase print file's content  
{
    fs.readFile(file, 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(data)
  });
}

fs.writeFile(busFile, 'This is ' + busFile + ' content..\n', function (err) {  
  // writeFile creates a file named busFile if not present in the directory
  // and write the given text in it. 
  if (err) 
    throw err;
  
  console.log(busFile , " is created");

  fs.appendFile(busFile, 'B01 Ind->Jp'+'\n', function (err) { 
  // we append a bus detail in busFile 
    if (err) 
      throw err;
    
    console.log('B01 Ind->Jp added');
    
    fs.appendFile(busFile, 'B02 Dhl->Bom'+'\n', function (err) {
    // we append another bus detail in busFile  
      if (err) 
        throw err;
      
      console.log('B02 Dhl->Bom added');
    
      printDataBase(busFile);
      // here we print all the busFile content.
    });
  });
});

//The drawback with callback is it requires a lot of nesting 
//which makes your program complex and less readable.
