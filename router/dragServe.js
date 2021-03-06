﻿let express = require('express');
let router = express.Router();
let fs = require('fs')
let config = require('../configServe.js')
let codeData = {
    success: { code: 200, msg: '创建成功' },
    publishSuccess: { code: 200, msg: '创建成功' },
    publishInexistence: { code: 201, msg: '页面不存在' },
    exist: { code: 201, msg: '页面已存在' },
    readSuccess: { code: 200, msg: '读取' }
}

// 该路由使用的中间件
router.use(function resetHead(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Max-Age", 60);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header("Access-Control-Allow-Credentials",true)
// Access-Control-Allow-Origin: <origin> | * // 授权的访问源
// Access-Control-Max-Age: <delta-seconds> // 预检授权的有效期，单位：秒
// Access-Control-Allow-Credentials: true | false // 是否允许携带 Cookie
// Access-Control-Allow-Methods: <method>[, <method>]* // 允许的请求动词
// Access-Control-Allow-Headers: <field-name>[, <field-name>]* // 额外允许携带的请求头
// Access-Control-Expose-Headers: <field-name>[, <field-name>]* // 额外允许访问的响应头

    next();
});
// 定义网站主页的路由
router.get('/', function (req, res) {
    res.send('Birds home page');
});
// 定义 about 页面的路由
router.post('/publish', function (req, res) {
    let data = fs.readFileSync('data.json', 'utf-8');
    if (data) {
        data = JSON.parse(data)
        if (data[req.body.pageName]) {
            data[req.body.pageName] = req.body.data
            fs.writeFile('./product/' + req.body.pageName + '.html', config.htmlPre + req.body.html + config.htmlEnd, function (err) { console.log('写入成功') })
            fs.writeFileSync("data.json", JSON.stringify(data))
            res.send(codeData.publishSuccess)
        }

        if (!data[req.body.pageName]) {
            res.send(codeData.publishInexistence)
        }
    }
    if (!data) {
        res.send(codeData.publishInexistence)
    }

});

router.post('/newpage', function (req, res) {
    let data = fs.readFileSync('data.json', 'utf-8');
    if (data) {
        data = JSON.parse(data)
        if (!data[req.body.pageName]) {
            data[req.body.pageName] = {}
            fs.createWriteStream('./product/' + req.body.name + '.html')
            fs.writeFileSync("data.json", JSON.stringify(data))
            codeData.success.pageName = req.body.pageName
            res.send(codeData.success)
        }

        if (data[req.body.pageName]) {
            res.send(codeData.exist)
        }
    }
    if (!data) {
        data = {};
        data[req.body.pageName] = {}
        fs.createWriteStream('./product/' + req.body.pageName + '.html')
        fs.writeFileSync("data.json", JSON.stringify(data))
        codeData.success.pageName = req.body.pageName
        res.send(codeData.success)
    }

});

router.post('/tolead/list', function (req, res) {
    let data = fs.readFileSync('data.json', 'utf-8');
    let list = []
    if (data) {
        data = JSON.parse(data)
        for (let attr in data) {
            list.push(attr)
        }
    }
    codeData.readSuccess.data = list
    res.send(codeData.readSuccess)
});

router.post('/tolead/item', function (req, res) {
    let data = fs.readFileSync('data.json', 'utf-8');
    var sendData = {}
    if (data) {
        data = JSON.parse(data)
        if (data[req.body.pageName]) {
            sendData.pageName = req.body.pageName
            sendData.data = data[req.body.pageName]
        }
    }
    codeData.readSuccess.data = sendData
    res.send(codeData.readSuccess)
});


module.exports = router;