var koa = require('koa');
var request = require('superagent');
var mount = require('koa-mount');
var path = require('path');
var staticCache = require('koa-static-cache');
var serve = require('koa-static');
var app = module.exports = koa();


var session = require('koa-generic-session');
app.keys = ['your-session-secret'];
app.use(session());

var koaBodyParser = require('koa-bodyparser');
app.use(koaBodyParser());

var env = process.env.NODE_ENV || 'development';
var addr = process.env.PICKLETE_PORT_1337_TCP_ADDR || 'localhost';
var port = process.env.PICKLETE_PORT_1337_TCP_PORT || '1336';

//todo: use PICKLETE_ENDPOINT_URL=http://localhost:1337/

var restServerUrl = 'http://' + addr + ':' + port;

var Router = require('koa-router');
/* public routes */

var guest = new Router();

app.use(guest.middleware());

guest.get('/', function *(next){
  if (/mobile/i.test(this.request.header['user-agent'])){
    this.redirect('/app/');
  }else{
    this.redirect('/public/');
  }
});

guest.get('/siteProfile', function *(next){
  try {
    var result = yield request.get(restServerUrl+'/siteProfile?domain='+extractDomain(this.request.header.referer));
    this.body = result.body;
  } catch (e) {
    console.log(e);
  }
});

guest.post('/auth/local/', function *(next) {
  var loginForm = this.request.body;
  loginForm.domain = extractDomain(this.request.header.referer);
  console.log("/auth/local/",loginForm);
  try {
    var result = yield request.post(restServerUrl+'/auth/local/')
    .send(loginForm)
    .set('Content-Type', 'application/json')
    .set('x-requested-with', 'XMLHttpRequest');
    this.body = result.body;
    console.log(result.body);
    if(result.body.status == 'ok'){
      this.session.login = true;
      this.session.user = result.body.user;
      console.log(this.session);
    }
  } catch (e) {
    console.log(e);
  }
});

guest.get('/user/loginStatus', function *(next){
  console.log(this);
  try {
    var status = this.session.login || false;
    this.body = status;
  } catch (e) {
    console.log(e);
  }
});

guest.get('/user/signOut', function *(next){
  console.log(this);
  try {
    this.session.login = false;
    this.session.user = null;
    this.body = this.session.login;
  } catch (e) {
    console.log(e);
  }
});

/* public routes */


var secured = new Router();

app.use(function*(next) {
  if (this.session.login ||
     this.request.url.startsWith("/build") ||
     this.request.url.startsWith("/app") ||
     this.request.url.startsWith("/public")) {
    yield next
  } else {
    // yield next
    this.redirect('/app/index.html');
  }
})
app.use(secured.middleware());

secured.post('/books', function *(next) {
  try {
    var result = yield request.post(restServerUrl+'/books').send(this.session.user)
    this.body = result.body;
  } catch (e) {
    console.log(e);
  }
});

secured.get('/ereader', function *(next){
  console.log(this);
  try {
    var result = yield request.get(restServerUrl+this.request.url)
    .set('x-requested-with', 'XMLHttpRequest');
    console.log("result",result);
    result.body.domain = restServerUrl;
    this.body = result.body;
  } catch (e) {
    console.log(e);
  }
});

secured.post('/member/update', function *(next) {
  var loginForm = this.request.body;
  loginForm.user = this.session.user;
  console.log("/member/update",loginForm);
  try {
    var result = yield request.post(restServerUrl+'/member/update')
    .send(loginForm)
    .set('Content-Type', 'application/json')
    .set('x-requested-with', 'XMLHttpRequest');
    this.body = result.body;
    console.log(result.body);
  } catch (e) {
    console.log(e);
  }
});

// app
//   .use(router.routes())
//   .use(router.allowedMethods());

function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }
    domain = domain.split(':')[0];
    return domain;
}


console.log('=== env ===', env);
if(env === 'development'){
  app.use(mount('/', serve(path.join(__dirname, './'))));
}
else if(env === 'production')
  app.use(mount('/', staticCache(path.join(__dirname, 'dist'))));

// app.use(mount('/bower_components', staticCache(path.join(__dirname, 'bower_components'))));

var port = 3000;

console.log('ec-platform Server Url', restServerUrl);
console.log('mobile site Url', 'http://localhost:' + port);

app.listen(port);
