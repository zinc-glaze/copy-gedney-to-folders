const fs = require('fs');
const path = require('path');

let counter = 0;

const traverseFileSystem = function (currentPath) {
  let files = fs.readdirSync(currentPath);
  //traverse file system recursively
  for (let i in files) {
    let currentFile = files[i];
    let currentFilePath = path.join(currentPath, currentFile);
    let stats = fs.statSync(currentFilePath);
    //look at current file
    if (stats.isFile() && currentFilePath.includes('.tif')) {
      //set new directory name and path
      let folderName = currentFile.substring(0, 11);
      let newDirPath =path.join(currentPath, '../', folderName);
      //set destination path and name for copied file
      let newFilePath = path.join(newDirPath, currentFile);
      //if current file meets the criteria, copy it, and give confirmation
      if (!fs.existsSync(newDirPath)) {
        fs.mkdirSync(newDirPath);
        fs.copyFileSync(currentFilePath, newFilePath);
        counter += 1;
        console.log('Copied: ', currentFile);
      } else if (fs.existsSync(newDirPath)) {
        fs.copyFileSync(currentFilePath, newFilePath);
        counter += 1;
        console.log('Copied: ', currentFile);
      }
    } else if (stats.isDirectory()) {
      traverseFileSystem(currentFilePath);
    }
  }
};


//run copy function
traverseFileSystem(__dirname);
//print results
console.log(`${counter} files copied`);
