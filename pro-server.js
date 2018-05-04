let express = require('express');
let path = require('path');
let ejs = require('ejs');
let app = express();
let proxy = require('http-proxy-middleware');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let dragServe = require('./router/dragServe.js');
let fileUp = require('./router/fileUp.js');
let login = require('./router/login.js')

let port = process.env.PORT || 8000;

app.set('views', path.join(__dirname, 'product'));
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('product'));

//路由
app.use('/drag', dragServe);
app.use('/file', fileUp);
app.use('/login',login)

app.listen(port, function () {
  console.log('listen port ' + port + ' success...')
});