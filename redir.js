const http = require('https'); //protocol the server works on
const fs = require('fs'); //file system
const hbs = require('hbs'); //handlebars html templating
const express = require('express'); //allows to create the web app
const bodyParser = require("body-parser");
const app = express();





var server = http.createServer(app);





hbs.registerPartials(__dirname + '/views/partials');
app.set("view_engine", "hbs");

//this is statically adding all the pages to the server you have add the .html which is annoying



app.get('/', (req, res) => {
	res.redirect('https://barackplumbing.com');
});




server.listen(80);
