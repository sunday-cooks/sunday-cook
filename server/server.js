var path        = require('path'),
    express     = require('express'),
    morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser');


// Initialize express
var app = express();

// Dev logging
app.use(morgan('dev'));

// Body parser
app.use(bodyParser.urlencoded({extended: true}));
// JSON support for body parsing
app.use(bodyParser.json());

// Serving static client files
app.use(express.static(path.join(__dirname,'../client')));


// Routes go here



// Listen!
console.log('Listening on port 8000!');
app.listen(8000);