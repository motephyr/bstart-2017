import fs from 'fs'
import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import bodyParser from 'body-parser'
import session from 'express-session'
import methodOverride from 'method-override'
import multer from 'multer'
var upload = multer({ dest: 'uploads/' })

var PostgreSqlStore = require('connect-pg-simple')(session);
var path = require('path');
var secrets = require('./secrets');
var connection = require('../knexfile.js').connection;

import api from './api'

const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

var lockit_config = require('./lockit.js');
var Lockit = require('lockit');

app.set('port', port)

// X-Powered-By header has no functional value.
// Keeping it makes it easier for an attacker to build the site's profile
// It can be removed safely
app.disable('x-powered-by');
app.set('views', path.join(__dirname, 'views'));
app.set('view cache', false);
app.set('view engine', 'jade');

// Body parser, to access req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(methodOverride());

app.set('trust proxy', 'loopback');

var sess = {
  resave: true,
  saveUninitialized: false,
  secret: secrets.sessionSecret,
  proxy: true, // The "X-Forwarded-Proto" header will be used.
  name: 'sessionId',
  // Add HTTPOnly, Secure attributes on Session Cookie
  // If secure is set, and you access your site over HTTP, the cookie will not be set
  cookie: {
    httpOnly: true
  },
  store: new PostgreSqlStore({
    conString: `postgres://${connection.user}:${connection.password}@${connection.host}:5432/${connection.database}`
  })
};

var node_env = process.env.NODE_ENV;
console.log('Environment: ' + node_env);
if (node_env === 'production') {
  sess.cookie.secure = true; // Serve secure cookies
}

app.use(session(sess));

app.use(function(req, res, next){
  // console.log(req)
  res.locals.req = req;
  next();
})

var lockit = new Lockit(lockit_config);
//只能用jade,不能用pug,因為lockit的layout.jade吃的位置
app.use(lockit.router);

// you now have all the routes like /login, /signup, etc.
// and you can listen on events. For example 'signup'
lockit.on('signup', function(user, res) {
  console.log('a new user signed up');
});

lockit.on('login', function(user, res) {
  console.log('a new user login');
  // res.redirect(`/#/auth?token=${user.authenticationToken}`);
  // res.redirect('/');   // set signup.handleResponse to 'false' for this to work
});

lockit.on('logout', function(user, res) {
  console.log('logout');
  res.redirect('/#/logout');
});

// Import API Routes
app.use('/api', api)



var createFolder = function(folder){
  try{
    fs.accessSync(folder);
  }catch(e){
    fs.mkdirSync(folder);
  }
};
var uploadFolder = './upload/';
createFolder(uploadFolder);


app.post('/upload', upload.single('logos'), function(req, res, next){
  res.send({ret_code: '0'});
  // file.path('/upload/asd');
  var file = req.file;
  console.log('文件类型：%s', file.mimetype);
  console.log('原始文件名：%s', file.originalname);
  console.log('文件大小：%s', file.size);
  console.log('文件保存路径：%s', file.path);
});

app.get('/form', function(req, res, next){
  var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
  res.send(form);
});


// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)

console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
