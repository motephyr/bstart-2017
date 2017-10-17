import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import bodyParser from 'body-parser'
import session from 'express-session'
import methodOverride from 'method-override'

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

// I am adding this here so that the Heroku deploy will work
// Indicates the app is behind a front-facing proxy,
// and to use the X-Forwarded-* headers to determine the connection and the IP address of the client.
// NOTE: X-Forwarded-* headers are easily spoofed and the detected IP addresses are unreliable.
// trust proxy is disabled by default.
// When enabled, Express attempts to determine the IP address of the client connected through the front-facing proxy, or series of proxies.
// The req.ips property, then, contains an array of IP addresses the client is connected through.
// To enable it, use the values described in the trust proxy options table.
// The trust proxy setting is implemented using the proxy-addr package. For more information, see its documentation.
// loopback - 127.0.0.1/8, ::1/128
app.set('trust proxy', 'loopback');
// Create a session middleware with the given options
// Note session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.
// Options: resave: forces the session to be saved back to the session store, even if the session was never
//                  modified during the request. Depending on your store this may be necessary, but it can also
//                  create race conditions where a client has two parallel requests to your server and changes made
//                  to the session in one request may get overwritten when the other request ends, even if it made no
//                  changes(this behavior also depends on what store you're using).
//          saveUnitialized: Forces a session that is uninitialized to be saved to the store. A session is uninitialized when
//                  it is new but not modified. Choosing false is useful for implementing login sessions, reducing server storage
//                  usage, or complying with laws that require permission before setting a cookie. Choosing false will also help with
//                  race conditions where a client makes multiple parallel requests without a session
//          secret: This is the secret used to sign the session ID cookie.
//          name: The name of the session ID cookie to set in the response (and read from in the request).
//          cookie: Please note that secure: true is a recommended option.
//                  However, it requires an https-enabled website, i.e., HTTPS is necessary for secure cookies.
//                  If secure is set, and you access your site over HTTP, the cookie will not be set.
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
