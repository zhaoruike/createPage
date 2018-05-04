let token = require('../common/token.js')
let express = require('express');
let fs = require('fs')
let router = express.Router();
let codeData = {
    success: { code: 200, msg: '登陆成功' },
    noName: { code: 201, msg: '用户不存在' },
    pwError: { code: 202, msg: '密码错误' },
    tokenLose: {code:201, msg:'请登陆'},
    tokenSuccess: {code:200,msg:'已登陆'}
}

router.post('/login', function (req, res) {
    let data = fs.readFileSync('user.json', 'utf-8');
    if (data) {
        data = JSON.parse(data)
        if (!data[req.body.name]) {
            res.send(codeData.noName)
        }
        if (data[req.body.name]) {
            if(req.body.password == data[req.body.name].password){
                let newToken = token.createToken(req.body,60*60*24)
                res.cookie('token',newToken, { expires: new Date(Date.now() + 1000*3600*24), httpOnly: true } )
                let resData = codeData.success
                resData.data = {}
                for(let attr in data[req.body.name]){
                    if(attr !== 'password'){
                        resData.data[attr] = data[req.body.name][attr]
                    }
                }
                res.send(resData)
            }else{
                res.send(codeData.pwError)
            }
            
        }
    }
});

router.post('/check', function (req, res) {
    let reqToken = req.cookies.token
    if(reqToken){
        let tokenType = token.checkToken(reqToken)
        if(tokenType){
            let data = fs.readFileSync('user.json', 'utf-8');
            if (data) {
                data = JSON.parse(data)
                if (data[tokenType.data.name]) {
                    if(tokenType.data.password == data[tokenType.data.name].password){
                        let resData = codeData.success
                        resData.data = {}
                        for(let attr in data[tokenType.data.name]){
                            if(attr !== 'password'){
                                resData.data[attr] = data[tokenType.data.name][attr]
                            }
                        }
                        res.send(resData)
                    }else{
                        res.send(codeData.tokenLose)
                    }
                    
                }
            }
        }
        if(!tokenType){
            res.send(codeData.tokenLose)
        }
    }else{
        res.send(codeData.tokenLose)
    }
});

router.post('/updataheadimg', function (req, res) {
    let reqToken = req.cookies.token
    if(reqToken){
        let tokenType = token.checkToken(reqToken)
        if(tokenType){
            let data = fs.readFileSync('user.json', 'utf-8');
            if (data) {
                data = JSON.parse(data)
                if (data[tokenType.data.name]) {
                    if(tokenType.data.password == data[tokenType.data.name].password){
                        data[tokenType.data.name].headImg = req.body.headImg
                        let resData = codeData.success
                        resData.data = {}
                        for(let attr in data[tokenType.data.name]){
                            if(attr !== 'password'){
                                resData.data[attr] = data[tokenType.data.name][attr]
                            }
                        }
                        fs.writeFileSync("user.json", JSON.stringify(data))
                        res.send(resData)
                    }else{
                        res.send(codeData.tokenLose)
                    }
                    
                }
            }
        }
        if(!tokenType){
            res.send(codeData.tokenLose)
        }
    }else{
        res.send(codeData.tokenLose)
    }
    
});

module.exports = router