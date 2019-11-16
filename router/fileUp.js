let express = require('express');
let router = express.Router();
let multer = require('multer');
let fs  = require('fs')

if(!fs.existsSync('./product')){
	fs.mkdirSync('./product',0777)
}

if(!fs.existsSync('./product/images')){
	fs.mkdirSync('./product/images',0777)
}
let random = Math.random()
let changeName = function(filename){
    let last = filename.split('.')
    return last[0]+random+'.png'
}
let storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './product/images')
    },
    filename: function (req, file, cb){
        
        cb(null, changeName(file.originalname))
    }
});
let upload = multer({
    storage: storage
})

router.post('/imgupload', upload.single('file'), function (req, res, next) {
    var url = '//' + req.headers.host + '/images/' + changeName(req.file.originalname)
    res.json({
        code : 200,
        data : url
    })
});

module.exports = router;