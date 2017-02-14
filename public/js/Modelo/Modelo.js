/**
 * @author Marco Vinicio Cambronero Fonseca <marcovcambronero@gmail.com>
 * @author Emilio Pérez Chinchilla <12epz12@gmail.com>
 * @author Jean Carlo Saborío Ugalde <jecasau14@gmail.com>
 */

/**
 * Clase que representa el modelo de la aplicación como parte del MVC.
 */

class Modelo{
	
/**
 * Inicializa el player y el laberinto
 * Inicia eventos para escuchar eventos del controller
 * @constructor
 */
constructor(){
	this.player = new Player();
	this.laberinto = new Laberinto();
	
	addEventListener( 'modelUpdateMaze', t => this.setLaberinto(t.detail))
	addEventListener( 'modelUpdateMazeBD', t => this.setLaberintoBD(t.detail))
}

/** 
 * y llama al método notify() pasandole los datos a enviar a la vista
 */
setLaberintoGeneral(maze){
	this.laberinto.setLaberinto(maze);
	Modelo.notify({type: 'maze', maze: maze, player_x: this.Player_getX(), player_y: this.Player_getY(), player_size: this.Player_getSize() });
}

/** 
 * Método que se usa para cargar un laberinto que estaba guardado en la base de datos del servidor.
 * @param {array} maze - la matrix que contiene la configuración del laberinto
 */
setLaberintoBD(maze){
	(maze.length != 0)?
		(
		this.setPlayer(new Player(maze[0].player.name, 
							maze[0].player.x, 
							maze[0].player.y, 
							maze[0].player.desplX, 
							maze[0].player.desplY, 
							maze[0].player.size
						   )),
		this.setLaberintoGeneral(maze[0].laberinto.matrix)
	)
	: alert("No existe el ususario: " + this.Player_getName());
}

/** 
 * Método que se usa para cargar un laberinto nuevo proveniente del servidor.
 * @param {array} maze - la matrix que contiene la configuración del laberinto
 */
setLaberinto(maze){

	this.Player_setX(10);
	this.Player_setY(10);
	this.setLaberintoGeneral(maze);
}
	
/** 
 * Método que se usa para cargar un laberinto que estaba guardado en localStorage.
 * @param {array} maze - la matrix que contiene la configuración del laberinto
 */
setLaberinto_LocalStorage(maze){
	
	this.setLaberintoGeneral(maze.matrix);
}
	
/** 
 * Método que se usa para crear un laberinto localmente.
 * @param {Object} obj - el objeto con la información necesaria para crear el laberinto x, y, dificultad
 */
crearLaberinto(obj){	
	this.laberinto.generarLaberinto(obj);
	
	this.Player_setX(10);
	this.Player_setY(10);

	Modelo.notify({type: 'maze', maze: this.laberinto.matrix, player_x: this.Player_getX(), player_y: this.Player_getY(), player_size: this.Player_getSize() });
}
	
	
/** 
 * Método estatico que se usa para crear y disparar el evento update.
 * @param {Object} data - el objeto con la información a enviar con el evento update
 */
static notify(data){
		var myEvent = new CustomEvent("update",
		{
			'detail': data
		});

		dispatchEvent(myEvent);
}
	
/** 
 * Método que modifica el player del Modelo.
 * @param {Player} player - El nuevo objeto Player
 */
setPlayer(player){
	
	this.player = player;
}

/** 
 * Método que se encarga de crear un WebWorker para resolver el laberinto usando el script 'RutaMasCorta.js'
 * Captura la respuesta del worker y notifica a la vista para que se pinte la ruta
 */
getMasCorta(){
	
	let worker = new Worker('js/Modelo/RutaMasCorta.js');
	var data  =  {msj: this.laberinto.matrix }
	worker.postMessage( data );
	worker.onmessage = e => Modelo.notify({type: 'path', tree: e.data.msg });
}

/** 
 * Método que actualiza el 'name' del player
 * @param {String} newName - El nuevo name del player.
 */	
Player_setName(newName){
	
	this.player.setName(newName);
}

/** 
 * Método que actualiza el 'x' del player
 * @param {Number} newx - El nuevo x del player.
 */
Player_setX(newx) {
	
	this.player.setX(newx);
}

/** 
 * Método que actualiza el 'y' del player
 * @param {Number} newy - El nuevo y del player.
 */
Player_setY(newy) {
	
	this.player.setY(newy);
}

/** 
 * Método que actualiza el 'desplX' del player
 * @param {Number} newDesplX - El nuevo desplX del player.
 * @return {Boolean} Retorna true si se pudo modificar.
 */
Player_setDesplX(newDesplX){
	
	return this.player.setDesplX(newDesplX)
}

/** 
 * Método que actualiza el 'desplY' del player
 * @param {Number} newDesplY - El nuevo desplY del player.
 * @return {Boolean} Retorna true si se pudo modificar.
 */
Player_setDesplY(newDesplY){
	
	return this.player.setDesplY(newDesplY);
}

/** 
 * Modifica el 'desplazamiento x' y 'desplazamiento y', ambos a 0.
 */ 
Player_stop(){	  

	return this.player.stop();  
}

/** 
 * Método que actualiza el 'size' del player
 * @param {Number} newSize - El nuevo size del player.
 */
Player_setSize(newSize){
	
	this.player.setSize(newSize);
}

/**
 * Obtener el nombre
 * @return {string} el nombre del player
 */
Player_getName() {
	
	return this.player.getName();
}

/**
  * Obtener el x
  * @return {number} la posición en x del player
  */
Player_getX() {
	
	return this.player.getX();
}

/**
 * Obtener el y
 * @return {number} la posición en y del player
 */
Player_getY() {
	
	return this.player.getY();
}

/**
 * Obtener el desplazamiento x
 * @return {number} el desplazamiento actual en x del player
 */
Player_getDesplX(){
	
	return this.player.getDesplX();
}

/**
 * Obtener el desplazamiento y
 * @return {number} el desplazamiento actual en y del player
 */
Player_getDesplY(){
	
	return this.player.getDesplY();
}
  
/**
 * Obtener el tamano del player
 * @return {number} el desplazamiento actual en y del player
 */
Player_getSize(){
	
	return this.player.getSize();
}

/** 
 * Actualiza el 'x' e 'y' del jugador restando el 'desplazamiento x' y 'desplazamiento y' respectivamente.
 */
Player_backPosition(){
	
	this.player.backPosition();
}

/** 
 * Reinicializa el 'x','y','desplX' y 'desplY' del jugador.
 */
Player_resetPosition(){
	
	this.player.resetPosition();
}

/** 
 * Actualiza el 'x' e 'y' del jugador sumando el 'desplazamiento x' y 'desplazamiento y' respectivamente.
 */
Player_actualizarXY(){
	
	this.player.actualizarXY();
}


/** 
 * Método que almacena en Local Storage la información correspondiente del
 * laberinto, usando el name del player como key del ítem.
 */
save_LocalStorage(){  

let loc_Stor = localStorage.getItem(this.Player_getName());
	(typeof(Storage) !== 'undefined')?
		((loc_Stor)?
			(localStorage.removeItem(this.Player_getName()),
			(localStorage.setItem(this.Player_getName(), this.get_LaberintoJSON()), alert('Guardado exitoso')))
		:
			(localStorage.setItem(this.Player_getName(), this.get_LaberintoJSON()), alert('Guardado exitoso'))
		)
	:
	 alert('Su browser no soporta Local Storage');  
}


/** 
 * Método que recupera del Local Storage la información del laberinto
 * perteneciente a un player indicado.
 */
load_localStorage(){

let loc_Stor = localStorage.getItem(this.Player_getName());
  (loc_Stor)? 
	this.setearModelo(JSON.parse(loc_Stor))
  :
	alert('No hay nada en Local Storage');
}


/** 
 * Método que cambia el modelo actual por uno nuevo.
 * @param {Object} obj - El nuevo modelo.
 */
setearModelo(obj){
  this.setPlayer(new Player(obj.player.name, 
							obj.player.x, 
							obj.player.y, 
							obj.player.desplX, 
							obj.player.desplY, 
							obj.player.size
						   )
				)
  this.setLaberinto_LocalStorage(obj.laberinto);
}


/**
 * Obtener el player en formato JSON
 * @return {JSONobject} el desplazamiento actual en y del player
 */
get_LaberintoJSON(){
	
	return JSON.stringify(this);
}
	
	
}