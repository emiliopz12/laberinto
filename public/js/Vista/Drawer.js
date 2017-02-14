/**
 * @author Marco Vinicio Cambronero Fonseca <marcovcambronero@gmail.com>
 * @author Emilio Pérez Chinchilla <12epz12@gmail.com>
 * @author Jean Carlo Saborío Ugalde <jecasau14@gmail.com>
 */


/**
 * Clase que representa la vista de la aplicación como parte del MVC.
 */


class Drawer{


/**
 * Define las variables que luego serán inicializadas.
 * @constructor
 */
constructor(){
	
	this.canvas;
	this.context;
	this.control;
	this.anchoMuro;
	this.sonidoChoque	
	this.control;
	this.mode;
	this.dificultad;
	this.generarBoton;
	this.solveBoton;
	this.loginBoton;
	this.sprites;
	this.bandera;
	this.txt;
}
	
/**
 * Método que inicializa las variables y/o elementos que serán utilizados
 * a lo largo de la clase Drawer.
 */
init(){
		
	addEventListener("update", t => iPromise.from(t).then(vista.update))

	this.control = new Controller();
	this.canvas = $('#myCanvas')[0];
	this.anchoMuro = 40;
	this.context = this.canvas.getContext('2d');
	this.sprites = {right: $('#caraRight')[0], left: $('#caraLeft')[0], up: $('#caraUp')[0], down: $('#caraDown')[0]}
	this.bandera = $('#bandera')[0];
	this.sonidoChoque = new Audio('sounds/crash.wav');
	this.generarBoton = $('#generar');
	this.descargarBoton = $('#descargar')[0];
	this.txt = $('#txt')[0];
	this.all_Click_Init();

	document.onkeydown = e => (e.keyCode > 36 && e.keyCode < 41) ? (e.preventDefault(), this.movimiento(e)): e;
	
	this.descargarBoton.addEventListener('click', (e) =>
	vista.downloadCanvas('myCanvas', 'test.png')
	, false);
}

  dateToHHMMSS( date ) { return [date.getHours(), date.getMinutes(), date.getSeconds()]
						              .map(s => vista.addZero(s.toString()))
						              .join(":"); }
		  ;
		  addZero(s) { return (s.length < 2) ? ("0" + s) : s; }

		  startClock(){
		    setInterval(() =>  this.txt.innerHTML = this.dateToHHMMSS(new Date()), 10);
		  }

/**
 * Método que inicializa los eventos click de cada uno de los botones.
 */
all_Click_Init(){
	
	this.startClock();
	this.click_Generar();
	this.click_Automatico();
	this.click_Guardar();
	this.click_Loguear();
}


/**
 * Método que define la acción del evento click perteneciente al
 * botón 'generar'. Hace uso de la clase iPromise para hacer uso
 * de promesas.
 * Se accede al botón mencionado haciendo uso de jQuery.
 */
click_Generar(){
	$('#generar').click( e => 
			 
		iPromise.from(this)	
		.then( vista.getConexionMode )
		.switch([iPromise.case('Local'), vista.eventCrearLaberintoLocal],  
			   [iPromise.case('Remoto'), vista.eventCrearLaberintoRemoto], 
			   [iPromise.default(), it => false])				   
		//el modelo notifica cambio		   
	 );
}

/**
 * Método que define la acción del evento click perteneciente al
 * botón 'automatico'. Hace uso de la clase iPromise para hacer uso
 * de promesas.
 * Se accede al botón mencionado haciendo uso de jQuery.
 */
click_Automatico(){
	$('#automatico').click(e => 

		//falta deshabilitar radios
		iPromise.from(this)	
		.then( vista.getConexionMode )
		.switch([iPromise.case('Local'), vista.eventRutaLocal],  
			   [iPromise.case('Remoto'), vista.eventRutaRemota], 
			   [iPromise.default(), it => false])				   
		//el modelo notifica cambio
	 );
}


/**
 * Método que define la acción del evento click perteneciente al
 * botón 'guardar'. Hace uso de la clase iPromise para hacer uso
 * de promesas.
 * Se accede al botón mencionado haciendo uso de jQuery.
 */
click_Guardar(){
	// Guardar (localmente o remotamente)
	$('#guardar').click(e => {
			
			let aliasUser = $('#usuario').val();

			(aliasUser != "")?
				(iPromise.from(this)	
					.then( vista.control.Player_setName(aliasUser) )
					.then( vista.getConexionMode )
					.switch([iPromise.case('Local'), vista.salvar_Localmente],  
							[iPromise.case('Remoto'), vista.salvar_enBD], 
							[iPromise.default(), it => false])
				)
			:
				alert('Debe digitar un usuario');
		});
}


/**
 * Método que define la acción del evento click perteneciente al
 * botón 'loguear'. Hace uso de la clase iPromise para hacer uso
 * de promesas.
 * Se accede al botón mencionado haciendo uso de jQuery.
 */
click_Loguear(){
	$('#loguear').click(e =>{
		// Se verifica si input de local está checked...
		let aliasUser = $('#usuario').val();

		// Se verifica si digitó un alias...
		(aliasUser != "")?
			(iPromise.from(this)	
				.then( vista.control.Player_setName(aliasUser) )
				.then( vista.getConexionMode )
				.switch([iPromise.case('Local'), vista.cargar_Localmente],  
						[iPromise.case('Remoto'), vista.cargar_enBD], 
						[iPromise.default(), it => false])
			)
		:
			alert('Debe digitar un usuario')
	});
}

	
/**
 * Método que recibe un laberinto, una ruta por medio del elemento notify del modelo 
 * y pinta el laberinto o la ruta.
 * @param {Object} msj - datos
 */
update(msj){
	(msj.detail.type == 'maze') ? 
		(
			(vista.drawMaze(msj.detail.maze), 
			 vista.dibujarCara(msj.detail.player_x, msj.detail.player_y, msj.detail.player_size, 'right'), 
			 vista.enableBotonGenerar())
		)
	 : (vista.Obtener_RutaMasCorta(msj.detail.tree))			
}
	

/**
 * 
 */
downloadCanvas(canvasId, filename) {
	vista.descargarBoton.href = vista.canvas.toDataURL();
	vista.descargarBoton.download = filename;
}

/**
 * Deshabilita el botón Generar para que no pueda ser pulsado.
 */
disableBotonGenerar(){
	vista.generarBoton[0].disabled = true;
}

/**
 * Habilita el botón Generar para que pueda ser pulsado.
 */
enableBotonGenerar(){
	vista.generarBoton[0].disabled = false;
}

/**
 * Encargado de llamar al método del Control encargado de generar el laberinto
 * a nivel local. A dicho método se le pasan las filas, columnas y dificultad.
 */
eventCrearLaberintoLocal(){
	 vista.control.crearLaberintoLocal({x: $('#filas').val(), y: $('#columnas').val(), dificultad: vista.getDificultad()})
}

/**
 * Encargado de llamar al método del Control encargado de generar el laberinto
 * a nivel remoto. A dicho método se le pasan las filas, columnas y dificultad.
 */
eventCrearLaberintoRemoto(){
	 vista.control.getLaberintoRemoto($('#filas').val(), $('#columnas').val(),  vista.getDificultad())
}

/**
 * Encargado de llamar al método del Control encargado de retornar el arreglo 
 * de posiciones de la ruta más corta, a nivel local. 
 * @return {Array} Retorna el arreglo de posiciones del camino más corta.
 */
eventRutaLocal(){
	
	return vista.control.getRutaMasCortaLocal()
}

/**
 * Encargado de llamar al método del Control encargado de retornar el arreglo 
 * de posiciones de la ruta más corta, a nivel remoto. 
 * @return {Array} Retorna el arreglo de posiciones del camino más corta.
 */
eventRutaRemota(){
	
	return vista.control.getRutaMasCortaRemoto()
}
	
/**
 * Modifica el ancho del muro o casilla del laberinto.
 * @param {Number} a - El nuevo tamaño del ancho del muro.
 */
setAnchoMuro(a){
	
	this.anchoMuro = a;
}

/**
 * Retorna el ancho del muro o casilla del laberinto.
 * @return {Array} Retorna el arreglo de posiciones del camino más corta.
 */
getAnchoMuro(){
	
	return this.anchoMuro;
}

/**
 * Retorna el ancho del muro o casilla del laberinto.
 * @return {canvas} Retorna el objeto de tipo canvas.
 */
getCanvas(){
	
	return this.canvas;
}

/**
 * Modifica el ancho del objeto canvas.
 * @param {Number} width - El nuevo ancho del canvas.
 */
setCanvasWidth(width){
	
	this.canvas.width = width;
}

/**
 * Modifica el alto del objeto canvas.
 * @param {Number} height - El nuevo alto del canvas.
 */
setCanvasHeight(height){
	
	this.canvas.height = height;
}

/**
 * Modifica el objeto canvas por uno nuevo.
 * @param {canvas} newCanvas - El nuevo objeto de tipo canvas.
 */
setCanvas(newCanvas){
	
	this.canvas = newCanvas;
}

/**
 * Obtiene el contexto del objeto canvas.
 * @return {CanvasRenderingContext2D} Retorna el contexto de canvas.
 */
getContextoCanvas(){
	
	return this.canvas.getContext('2d');
}

/**
 * Obtiene el alto del objeto canvas.
 * @return {Number} Retorna el alto de canvas.
 */
getCanvasHeigth(){
	
	return this.canvas.height;
}

/**
 * Obtiene el ancho del objeto canvas.
 * @return {Number} Retorna el ancho de canvas.
 */
getCanvasWidth(){
	
	return this.canvas.width;
}

/**
 * Método que gestiona los eventos de las flechas del teclado.
 * Dependiendo de la tecla o dirección oprimida, se realiza una acción.
 * Hace uso de la clase iPromise para poder utilizar promesas, que permitan
 * además actualizar el posicionamiento del player en el laberinto.
 * @param {KeyboardEvent} eventoTecla - El objeto que contiene el evento de la tecla.
 */
movimiento(eventoTecla){

	iPromise.from(eventoTecla.keyCode)
	   .do(vista.disableKeyDown)
	   .switch([iPromise.case(38), vista.moveUp],  
			   [iPromise.case(40), vista.moveDown], 
			   [iPromise.case(37), vista.moveLeft],
			   [iPromise.case(39), vista.moveRight],
			   [iPromise.default(), it => false])				   
	   .then( vista.drawAgain ) 
	   .then( vista.stopPlayer )	
	   
}

/**
 * 
 */
disableKeyDown(){
	vista.keydown = true;
}

/**
 * 
 */
enableKeyDown(){
	vista.keydown = false;
}

/**
 * Llama al método del Control encargado de modificar el 
 * 'desplazamiento x' y 'desplazamiento y' del player, ambos a 0.
 */
stopPlayer(){
	vista.control.Player_stop();
}

/**
 * Método que se llama cuando la tecla de arriba es pulsada.
 * Actualiza el desplazamientoY del player.
 * @return {String} Retorna el string con el nombre de la tecla oprimida.
 */
moveUp(){
	vista.control.Player_setDesplY(-2)
	return 'up'
}

/**
 * Método que se llama cuando la tecla de abajo es pulsada.
 * Actualiza el desplazamientoY del player.
 * @return {String} Retorna el string con el nombre de la tecla oprimida.
 */
moveDown(){
	vista.control.Player_setDesplY(2)
	return 'down'
}

/**
 * Método que se llama cuando la tecla de la derecha es pulsada.
 * Actualiza el desplazamientoX del player.
 * @return {String} Retorna el string con el nombre de la tecla oprimida.
 */
moveRight(){
	vista.control.Player_setDesplX(2)
	return 'right'
}

/**
 * Método que se llama cuando la tecla de la izquierda es pulsada.
 * Actualiza el desplazamientoX del player.
 * @return {String} Retorna el string con el nombre de la tecla oprimida.
 */
moveLeft(){
	vista.control.Player_setDesplX(-2)
	return 'left'
}

/**
 * 
 */
fromEvent(e, f = x => x){ 
	return Promise.resolve(f(e));
}

/**
 * Método encargado de actualizar los valores del player al existir un movimiento,
 * así como de comprobar si existe choque con alguna pared, si se llegó al final
 * del laberinto, así como de dibujar de nuevo la imagen del player.
 * @param {Object} e - Si es String, es el nombre de la dirección de la tecla oprimida. Si es false indica que no
 * se oprimió una tecla direccional.
 */
drawAgain(e){

	if(e){
		  
		vista.pintarRastro(vista.control.Player_getX(), vista.control.Player_getY(), vista.control.Player_getSize());

		vista.control.Player_actualizarXY();
		  
		(vista.control.comprobarChoque()) ? (vista.control.Player_backPosition(), vista.sonidoChoque.play()) : false;

		vista.dibujarCara(vista.control.Player_getX(), vista.control.Player_getY(), vista.control.Player_getSize(), e);
		  
		(vista.control.compruebaFin()) ? alert('Has ganado!!') : false;
  
	}
		   
}

/**
 * Método que dibuja el laberinto en el canvas.
 * @param {Array} maze - Recibe el array (matriz) para dibujar el laberinto.
 */
drawMaze(maze){    

	this.context.clearRect(0, 0, this.getCanvasWidth(), this.getCanvasHeigth());				
	this.setCanvasWidth( this.anchoMuro * maze[0].length);
	this.setCanvasHeight( this.anchoMuro * maze.length );					
	this.context.beginPath();   
	this.context.lineWidth = 5;	

	var context = this.context;
	var ancho = this.getAnchoMuro();
					
	maze.forEach( (row, i) => 
		  row.forEach( function (cell, j) { 
			if(cell.muros[UP_WALL]) {
			  context.moveTo(j * ancho, i * ancho); 
			  context.lineTo(j * ancho + ancho, i * ancho); 
			} 
			if(cell.muros[LEFT_WALL]) {
			  context.moveTo(j * ancho , i * ancho); 
			  context.lineTo(j * ancho , i * ancho + ancho);
			} 
			if(cell.muros[RIGHT_WALL]) {
			  context.moveTo(j * ancho + ancho, i * ancho); 
			  context.lineTo(j * ancho + ancho, i * ancho + ancho);
			} 
			if(cell.muros[DOWN_WALL]) {
			  context.moveTo(j * ancho, i * ancho + ancho); 
			  context.lineTo(j * ancho + ancho, i * ancho + ancho);
			}  
		  }));

	this.context.strokeStyle = 'rgb(12,12,12)';
	this.context.stroke();
	this.pintarFin();
}
  
/**
 * Encargado de dibujar la imagen del player en el laberinto.
  * @param {Number} x - La posición 'x' del player.
  * @param {Number} y - La posición 'y' del player.
  * @param {Number} size - El tamaño o 'size' del player.
  * @param {String} spr - El nombre de la dirección de la tecla oprimida, con el propósito de elegir 
  * la imagen acorde a la tecla presionada.
 */
dibujarCara(x,y,size, spr) {
	spr = this.sprites[spr];
	this.context.drawImage(spr, x, y, size, size); 
}

/**
 * Busca mediante jQuery, el valor del modo de juego que se encuentre seleccionado (Manual o Automático).
 * @return {String} Retorna el valor del modo de juego seleccionado.
 */
getGameMode(   ){

	return $('input[name="modo"]:checked').val();
}

/**
 * Busca mediante jQuery, el valor del modo de conexión que se encuentre seleccionado (Local o Remoto).
 * @return {String} Retorna el valor del modo de conexión seleccionado.
 */
getConexionMode(   ){
	
	return $('input[name="conexion"]:checked').val();
}

/**
 * Busca mediante jQuery, el valor de la dificultad que se encuentre seleccionado (Fácil = 3, Difícil = 4).
 * @return {Number} Retorna el valor de la dificultad seleccionada.
 */
getDificultad( ){
	
	return Number($('input[name="modo2"]:checked').val());
}

/**
 * Pinta de color blanco, el rastro dejado por la imagen del player, sobre el laberinto.
 * @param {Number} x - La posición 'x' del player.
 * @param {Number} y - La posición 'y' del player.
 * @param {Number} size - El tamaño o 'size' del player.
 */
pintarRastro(x, y, size){
	
	this.context.beginPath();
	this.context.fillStyle = 'white';
	this.context.rect(x, y, size, size);
	this.context.fill(); 
}
  
/**
 * Método que pinta el camino de la ruta más corta para solucionar el laberinto.
 * @param {Array} ruta - Contiene las posiciones (x,y) que deben ser pintadas para la ruta más corta.
 */
Obtener_RutaMasCorta(ruta){ 

	this.context.fillStyle = 'black';
  
	let pintaPunto = (i, j) => vista.context.fillRect(j * vista.getAnchoMuro() + vista.getAnchoMuro()*0.5, i * vista.getAnchoMuro() + vista.getAnchoMuro()*0.5, vista.getAnchoMuro()*0.1, vista.getAnchoMuro()*0.1);
  
	ruta.forEach( (cell) => (pintaPunto(cell.i, cell.j)) );
}

/**
 * Dibuja sobre el laberinto la imagen de la bandera de llegada, en una posición específica.
 */
pintarFin(){
	this.context.drawImage(this.bandera, (this.getCanvasWidth() - this.getAnchoMuro()), (this.getCanvasHeigth() - this.getAnchoMuro()), this.getAnchoMuro() - 2, this.getAnchoMuro() - 2); 
}

/**
 * Llama al método del Control encargado de salvar la información en el Local Storage.
 */
salvar_Localmente(){
	return  vista.control.salvar_LocalStorage();
}

/**
 * Llama al método del Control encargado de salvar la información en la Base de Datos.
 */
salvar_enBD(){
	return vista.control.save_MongoDB();
}

/**
 * Llama al método del Control encargado de recuperar la información del Local Storage.
 */
cargar_Localmente(){
	return vista.control.cargar_LocalStorage();
}

/**
 * Llama al método del Control encargado de recuperar la información de la Base de Datos.
 */
cargar_enBD(){
	return vista.control.cargar_MongoBD();
}

}