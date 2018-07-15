var express = require('express');

var app = express();
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

console.log('dir: ' + __dirname + '/../dist');


app.use(express.static(__dirname + '/../dist'));

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/headers', function(req, res) {
  res.set('Content-Type', 'text/plain');
  var s = '';
  for(var name in req.headers) s += name + ": " + req.header[name] + '\n';
  res.send(s);
});

app.use(function(req, res, next) {
  res.locals.showTests = app.get('env') !== 'production' &&
                          req.query.test === '1';
  next();
});

app.use(function(req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
});



app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
});
