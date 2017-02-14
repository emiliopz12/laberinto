/**
 * @author Marco Vinicio Cambronero Fonseca <marcovcambronero@gmail.com>
 * @author Emilio Pérez Chinchilla <12epz12@gmail.com>
 * @author Jean Carlo Saborío Ugalde <jecasau14@gmail.com>
 */
 
// llamar a los paquetes necesarios
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var mongoose   = require('mongoose');

// configurar app
app.use(morgan('dev'));


// configurar body parser
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({limit: "50mb"}));

// establecer puerto
var port     = process.env.PORT || 8080; 
mongoose.connect('mongodb://node:nodeuser@jello.modulusmongo.net:27017/Igu3syme');

// mongoose.connect('mongodb://localhost/Juego');

const maze  = require('./app/laberinto/Laberinto');

const promise  = require('./app/models/iPromise');

const rmc  = require('./app/laberinto/RutaMasCorta');

var Juego  = require('./app/models/Juego');

const RutaMasCorta = rmc.RutaMasCorta;
const Laberinto = maze.Laberinto;
const PP = promise.PPromise;

// ROUTAS PARA NUESTRA API
// =============================================================================

// crear el router
var router = express.Router();

// middleware para usar para todos los Request
router.use(function(req, res, next) {
	console.log('Something is happening.');
	
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Content-Length, Accept");
	
	next();
});
app.use(express.static('public')); 

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// route que termina con -> /laberinto
// ----------------------------------------------------
router.route('/laberinto')

	.post(function(req, res) {
		
		console.log('post')
        req.on('data', (data) =>
		 PP.from(JSON.parse(data))
           .then( it => new Laberinto(it) )
		   .then( it => it.matrix )
		   .then( x => res.json(x) )
	       .catch(PP.log) 
			  )
		
	})


	.get(function(req, res) {
		console.log('GET ' + req.body.fil);
		 PP.from({x: 10, y:10})
           .then( generarLaberinto )
		   .then( x => res.json(x) )
	       .catch(PP.log)

	})
	
	// route que termina con -> /guardaLaberinto
	// ----------------------------------------------------
	router.route('/guardaLaberinto')

	.post(function(req, res) {

        var jsonString = '';

        req.on('data', function (data) {
            jsonString += data;
        });

        req.on('end', function () {			
			obj = JSON.parse(jsonString);
			
			var juego = new Juego();
			juego.player = obj.player;
			juego.laberinto = obj.laberinto;

		juego.save(function(err) {
			if (err)
				res.send(err);
            console.log('Post ' + err);
			res.json({ message: 'Bear created!', "bearId" : 1});
	});
	
        });
	
		
	})

	.get(function(req, res) {
		Juego.find(function(err, bears) {
			if (err)
				res.send(err);

			res.json(bears);
		});
	});
	

	function saveBD(data){
		var juego = new Juego();

		juego.save(function(err) {
			if (err)
				res.send(err);
            console.log('Post ' + err);
			res.json({ message: 'Bear created!', "bearId" : 1});
	});
}



// route que termina con -> /solucion
// ----------------------------------------------------

router.route('/solucion')

	.post(function(req, res) {
					
		let jsonString = '';

        PP.from(req.on('data', (data) =>
            jsonString += data));

        req.on('end', () => {			
			
			PP.from( jsonString )
			.then( JSON.parse ) 
			.then( RutaMasCorta.dijkstra ) 
			.then( x => res.json(x) )
			.catch(PP.log)
			
		});
		
	})

	.get(function(req, res) {	
					
	})
// route que termina con -> /laberinto/:bear_id
// ----------------------------------------------------


router.route('/laberinto/:player_name')

	.get(function(req, res) {

		Juego.find({"player.name": req.params.player_name }, {"Laberinto": 0},function(err, bear) {
			if (err)
				res.send(JSON.parse(err));
			res.json(bear);
		});
	})

	.delete(function(req, res) {
		Juego.remove(
			{"player.name": req.params.player_name
		}, function(err, bear) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTRAR ROUTES
app.use('/api', router);

// INICIAR EL SERVIDOR
// =============================================================================
app.listen(port);
console.log('Running on ' + port);
