const express = require('express');
const exphbs = require("express-handlebars");
var methodOverride = require('method-override');
const cookieSession = require('cookie-session');

const app = express();
const port = 80

var db = require("./models");

app.use(methodOverride("_method"));
app.use(express.static('public'));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// APPLY COOKIE SESSION MIDDLEWARE
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge:  3600 * 1000 // 1hr
}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(require('./controllers/index_controller'));
app.use(require('./controllers/profile_controller'));

app.use('/', function(req, res) {
    res.render('index');
});

db.sequelize.sync().then(function() {
  app.listen(port, () => 
  console.log("----------------------"),
  console.log(` APP listening at PORT : ${port}`));
});