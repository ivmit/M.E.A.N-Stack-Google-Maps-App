/**
 * Created by imitrach on 9/22/2016.
 */
var express        = require('express');
var mongoose       = require('mongoose');
var port           = process.env.PORT || 3003;
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();


mongoose.connect("mongodb://localhost/MeanMapApp");

//Logging and Parsing

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());



//Routes




//Listen
app.listen(port);
console.log('Magic happens on port: ' + port);