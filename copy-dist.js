let fs  = require('fs')
let path = require('path')
let deleteall =function (path) {  
	var files = [];  
	if(fs.existsSync(path)) {  
			files = fs.readdirSync(path);  
			files.forEach(function(file, index) {  
					var curPath = path + "/" + file;  
					if(fs.statSync(curPath).isDirectory()) { // recurse  
							deleteall(curPath);
							   
					} else { // delete file  
							fs.unlinkSync(curPath);  
					}  
			});
			fs.rmdirSync(path);   
	}  
}; 
 
let copyFile = function(srcPath, tarPath, cb) {
 let rs = fs.createReadStream(srcPath)
 rs.on('error', function(err) {
  if (err) {
   console.log('read error', srcPath)
  }
  cb && cb(err)
 })
 let ws = fs.createWriteStream(tarPath)
 ws.on('error', function(err) {
  if (err) {
   console.log('write error', tarPath)
  }
  cb && cb(err)
 })
 ws.on('close', function(ex) {
  cb && cb(ex)
 })
 
 rs.pipe(ws)
}

let copyFolder = function(srcDir, tarDir, cb) {
    fs.readdir(srcDir, function(err, files) {
     let count = 0
     let checkEnd = function() {
      ++count == files.length && cb && cb()
     }
    
     if (err) {
      checkEnd()
      return
     }
    
     files.forEach(function(file) {
      let srcPath = srcDir + '/'+file
      let tarPath = tarDir + '/'+file
      fs.stat(srcPath, function(err, stats) {
       if (stats.isDirectory()) {
        fs.mkdir(tarPath, function(err) {
         if (err) {
          console.log(err)
          return
         }
    
         copyFolder(srcPath, tarPath, checkEnd)
        })
       } else {
        copyFile(srcPath, tarPath, checkEnd)
       }
      })
     })
    
     //为空时直接回调
     files.length === 0 && cb && cb()
    })
   }

deleteall('./product')
if(!fs.existsSync('./product')){
	fs.mkdir('./product')
}
copyFolder('./dist', './product', function(err) {
		if (err) {
				return
		}
		//continue
})