// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var underscore     = require('underscore');
var lodash = require('lodash');
// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
//mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database
mongoose.connect('mongodb://localhost/bears');
const maze  = require('./app/laberinto/Laberinto');

const rmc  = require('./app/laberinto/RutaMasCorta');

const calculaRuta = rmc.CalculaRuta;
const pp = rmc.pp;

const generar = maze.generar;

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(express.static('public'));
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /laberinto
// ----------------------------------------------------
var underscore     = require('underscore');
var lodash = require('lodash');
router.route('/laberinto')

	// create a bear (accessed at POST http://localhost:8080/laberinto)
	.post(function(req, res) {
		console.log('Post ' + req.body.name);
		var bear = new Bear();		// create a new instance of the Bear model
		bear.name = req.body.name;  // set the laberinto name (comes from the request)

		bear.save(function(err) {
			if (err)
				res.send(err);
            console.log('Post ' + err);
			res.json({ message: 'Bear created!', "bearId" : bear._id});
		});

		
	})

	// get all the laberinto (accessed at GET http://localhost:8080/api/laberinto)
	.get(function(req, res) {	
			res.json(generar(10,10));
	})
// on routes that end in /laberinto/:bear_id
// ----------------------------------------------------

router.route('/solucion')

	// create a bear (accessed at POST http://localhost:8080/api/solucion)
	.post(function(req, res) {
		console.log('Post ' + req.body.name);
		var bear = new Bear();		// create a new instance of the Bear model
		bear.name = req.body.name;  // set the laberinto name (comes from the request)

		bear.save(function(err) {
			if (err)
				res.send(err);
            console.log('Post ' + err);
			res.json({ message: 'Bear created!', "bearId" : bear._id});
		});

		
	})

	// get all the laberinto (accessed at GET http://localhost:8080/api/solucion)
	.get(function(req, res) {	
			//console.log(calculaRuta());
			//res.json(pp(calculaRuta()));
	})
// on routes that end in /laberinto/:bear_id
// ----------------------------------------------------


router.route('/laberinto/:bear_id')

	// get the bear with that id
	.get(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	})

	// update the bear with this id
	.put(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {

			if (err)
				res.send(err);

			bear.name = req.body.name;
			bear.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Bear updated!' });
			});

		});
	})

	// delete the bear with this id
	.delete(function(req, res) {
		Bear.remove({
			_id: req.params.bear_id
		}, function(err, bear) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
