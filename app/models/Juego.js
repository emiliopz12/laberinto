var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var JuegoSchema   = new Schema({
	player: {},
	laberinto: {}
	//coord: {y: Number, x: Number}
});

module.exports = mongoose.model('Juego', JuegoSchema);