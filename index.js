const https = require('https'); //protocol the server works on
const fs = require('fs'); //file system
const hbs = require('hbs'); //handlebars html templating
const express = require('express'); //allows to create the web app
const bodyParser = require("body-parser");
const app = express();



const options = {
	  key: fs.readFileSync('/etc/letsencrypt/live/barackplumbing.com/privkey.pem'),
	  cert: fs.readFileSync('/etc/letsencrypt/live/barackplumbing.com/fullchain.pem')
};

var server = https.createServer(options, app);


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);



hbs.registerPartials(__dirname + '/views/partials');
app.set("view_engine", "hbs");

//this is statically adding all the pages to the server you have add the .html which is annoying

app.use(express.static(__dirname + '/public'));

hbs.registerHelper("year", ()=>{
	return new Date().getFullYear();
});
app.use(bodyParser.json());


hbs.registerHelper('list', function(items, options) {
  var out = "<ul>";

  for(var i=0, l=people.length; i<l; i++) {
    out = out + "<li>" + people[i].firstName + " "+ people[i].lastName + "</li>";
  }

  return out + "</ul>";
});



app.get('/', (req, res) => {
	res.render("home.hbs");
});
app.get('/reviews', (req, res) => {
	res.render("reviews.hbs");
});
app.get('/contact', (req, res) => {
	res.render("contact.hbs");
});
app.get('/services', (req, res) => {
	res.render("services.hbs");
});
app.get('/about', (req, res) => {
	res.render("aboutus.hbs");
});
app.get('/sitemap', (req, res) => {
	res.send(fs.readFileSync('public/sitemap.xml'));
});
function get_content(title){
	return fs.readFileSync("content/" + title+".html");
}


server.listen(443);
