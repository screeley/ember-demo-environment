
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , member = require('./routes/member')
  , org = require('./routes/org')
  , http = require('http')
  , path = require('path');

/**
 * grunt-connect-proxy adds a transfer-encoding header, which
 * causes express to attempt to decode the non-existant body.
 */
function hackDeleteHeaders(req, res, next) {
  if (req.method === 'DELETE') {
    delete req.headers['transfer-encoding'];
  }
  next();
}
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(hackDeleteHeaders);
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/rest/1', routes.index);
member.setupRoutes(app);
org.setupRoutes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
