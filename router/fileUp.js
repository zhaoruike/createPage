let express = require('express');
let router = express.Router();
let multer = require('multer');
let fs  = require('fs')

if(!fs.existsSync('./product/images')){
	fs.mkdir('./product/images')
}

let storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './product/images')
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
});
let upload = multer({
    storage: storage
})

router.post('/imgupload', upload.single('file'), function (req, res, next) {
    var url = '//' + req.headers.host + '/images/' + req.file.originalname
    res.json({
        code : 200,
        data : url
    })
});

module.exports = router;