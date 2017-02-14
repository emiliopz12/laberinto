/** @constant
    @type {string}
    @default
 */
const URL1 = 'http://localhost:8080/api/laberinto'

/**
 * @author Marco Vinicio Cambronero Fonseca <marcovcambronero@gmail.com>
 * @author Emilio Pérez Chinchilla <12epz12@gmail.com>
 * @author Jean Carlo Saborío Ugalde <jecasau14@gmail.com>
 */


/**
 * Clase que representa el control de la aplicación como parte del MVC.
 */

class Controller{
	
/**
 * Inicializa el modelo
 * @constructor
 */
constructor(){
				
	this.model = new Modelo();
}
	
/**
 * Método que resetea e inicializa de nuevo los datos del player al comenzar
 * un nuevo juego. Hace llamado al Modelo.
 */
init(){
	  
	this.model.Player_resetPosition();
	this.model.Player_setSize(vista.getAnchoMuro()/2);
	this.model.Player_setX(vista.getAnchoMuro()/4);
	this.model.Player_setY(vista.getAnchoMuro()/4);					  
}

/**
 * Método que obtiene porción del canvas de la imagen del player, y comprueba si ha chocado con pared.
 * @return {Boolean} Retorna verdadero o falso sobre el choque del player con la pared.
 */
comprobarChoque(){

    // Obtener porción de canvas a ver si la imagen chocó con pared
    let imagenData = vista.getContextoCanvas().getImageData(this.model.player.getX()-1, 
	                                                        this.model.player.getY()-1, 
															this.model.player.getSize()+2, 
															this.model.player.getSize()+2
															);
	      
    let pixeles = imagenData.data;
	// El array de pixeles es de la forma: [r, g, b, alpha, r, g, b, alpha...]

    // Se quiere obtener un arreglo que contenga otros arreglos adentro,
    // cuya estructura sea:  nuevo = [[r,g,b], [r,g,b],...].
    let nuevo = pixeles.reduce( (s,e,i) => (((i+1)%4) == 0) ? 
	                                                         ( s.concat( [[pixeles[i-3], pixeles[i-2], pixeles[i-1]]] ) ) 
															 : 
															 s, 
			                   []);

    // Aquí se quiere confirmar si existe algún elemento de la forma [12,12,12] en nuevo,
    // es decir, que sea del color de las paredes del laberinto.
    let confirma = nuevo.some((_,i) => this.compruebaColorNegro(nuevo[i]));

    return confirma;
} 

/**
 * Comprueba si el [r,g,b] es [12,12,12]
 * @param {Array} array - El array contiene los valores de rojo, verde y azul.
 * @return {Boolean} Retorna verdadero o falso para conocer si los tres colores cumplen la condición dada.
 */
compruebaColorNegro(array){
    return (array[0] == 12 && array[1] == 12 && array[2] == 12);
  }  
  
/**
 * Comprueba si se ha alcanzado la posición donde se encuentra la bandera de llegada.
 * @return {Boolean} Retorna verdadero o falso para conocer si el player ha llegado al fin del laberinto.
 */
compruebaFin(){
	return ((this.model.player.getX() + this.model.player.getSize()) > (vista.getCanvasWidth() - vista.getAnchoMuro()) &
			(this.model.player.getY() + this.model.player.getSize()) > (vista.getCanvasHeigth() - (vista.getAnchoMuro())) )
}

/**
  * Modificar el 'x' del jugador.
  * Hace el llamado al Modelo.
  * @param {Number} x - El x contiene el nuevo valor de la posición 'x' del jugador.
  */
Player_setX(x) {
	  this.model.Player_setX(x);
}

/**
  * Modificar el 'y' del jugador.
  * Hace el llamado al Modelo.
  * @param {Number} y - La y contiene el nuevo valor de la posición 'y' del jugador.
  */
Player_setY(y) {
	this.model.Player_setY(y);
}

/**
  * Obtener el 'x' del jugador.
  * Hace el llamado al Modelo.
  * @return {Number} El valor de x.
  */
 Player_getX() {
	 return this.model.Player_getX();
  }
  
/**
  * Obtener el 'y' del jugador.
  * Hace el llamado al Modelo.
  * @return {Number} El valor de 'y'.
  */
  Player_getY() {
	  return this.model.Player_getY();
  }
  
/**
  * Modificar el 'name' del jugador.
  * Hace el llamado al Modelo.
  * @param {String} newName - El parámetro newName contiene el nuevo valor del 'name' del jugador.
  */
  Player_setName(newName){
  	 return this.model.Player_setName(newName);
  }
  
/**
  * Modificar el 'desplazamiento x' del jugador.
  * Hace el llamado al Modelo.
  * @return {Boolean} Retorna true si se pudo modificar.
  * @param {Number} newDesplX - El parámetro newDesplX contiene el nuevo valor del 'desplazamiento x' del jugador.
  */
  Player_setDesplX(newDesplX){
  	 return this.model.Player_setDesplX(newDesplX)
  }
  
/**
  * Modificar el 'desplazamiento y' del jugador.
  * Hace el llamado al Modelo.
  * @return {Boolean} Retorna true si se pudo modificar.
  * @param {Number} newDesplY - El parámetro newDesplX contiene el nuevo valor del 'desplazamiento x' del jugador.
  */
  Player_setDesplY(newDesplY){
  	return this.model.Player_setDesplY(newDesplY);
  }
  
/**
  * Obtener el 'tamaño' del jugador.
  * @return {Number} El valor del 'tamaño'.
  */
  Player_getSize(newDesplY){
  	return this.model.Player_getSize();
  }
  
/**
  * Actualiza el 'x' e 'y' del jugador sumando el 'desplazamiento x' y 'desplazamiento y' respectivamente.
  * Hace el llamado al Modelo.
  */
   Player_actualizarXY(){
    this.model.Player_actualizarXY();
  }
  
/**
  * Actualiza el 'x' e 'y' del jugador restando el 'desplazamiento x' y 'desplazamiento y' respectivamente.
  * Hace el llamado al Modelo.
  */
  Player_backPosition(){
      this.model.Player_backPosition();
	}
	
/**
  * Modifica el 'desplazamiento x' y 'desplazamiento y', ambos a 0.
  * Hace el llamado al Modelo.
  */
  Player_stop(){	  
	  return this.model.Player_stop();  
  }

/** 
 * Método que realiza una solicitud al servidor del laberinto,
 * utilizando FETCH.
 * Los datos pasados al servidor en el body son la cantidad de
 * filas, columnas y la dificultad.    
   
 * El servidor devuelve en el result la información
 * correspondiente para construir el laberinto, 
 * disparando luego un evento que es capturado
 * en el Modelo.
 * @param {Number} fil - El parámetro fil contiene la cantidad de filas.
 * @param {Number} col - El parámetro col contiene la cantidad de columnas.
 * @param {Number} dif - El parámetro dif indica si el laberinto es fácil o difícil.
 */
getLaberintoRemoto(fil, col, dif){
		
	fetch('http://localhost:8080/api/laberinto', {
        method: 'post',
		body: JSON.stringify({'x': fil, 'y': col, 'dificultad': dif}),
		header: {
			
			'Accept': 'application/json',
			'Content-Type': 'application/json'
			
		}   
    })
	.then( response => response.json() ) 
        .then((result) => 			
			new CustomEvent("modelUpdateMaze",
				{
					'detail': result
				})
					
		)
		.then(dispatchEvent)
        .catch(e => console.log(e));
			  
}


/** 
 * Método que realiza una solicitud al servidor del laberinto,
 * utilizando AJAX.
 * Los datos pasados al servidor en el body es el laberinto
 * del modelo.    
   
 * El servidor devuelve en el result la información
 * correspondiente a la ruta más corta para la 
 * solución del laberinto, a través de un array
 * que contiene las posiciones del camino más corto.
 */
getRutaMasCortaRemoto(){
				  
	fetch('http://localhost:8080/api/solucion', {
        method: 'post',
		body: JSON.stringify(this.model.laberinto.matrix), 
		header: {
			
			'Accept': 'json',
			'Content-Type': 'json',

			
		}   
    })
	.then( response => response.json() ) 
        .then((result) => 			
			new CustomEvent("update",
				{
					'detail': {type: 'path', tree: result }
				})
					
		)
		.then(dispatchEvent)
        .catch(e => console.log(e));
			  
}

/**
  * Método que se utiliza para obtener la ruta más corta para la 
  * solución del laberinto, a través de un array
  * que contiene las posiciones del camino más corto.
  */
getRutaMasCortaLocal(){
			
	return this.model.getMasCorta();
}

/**
  * Método que se usa para crear un laberinto localmente.
  * Hace el llamado al Modelo.
  */
crearLaberintoLocal(obj){
	
	this.model.crearLaberinto(obj);
}

/**
  * Método que almacena en el Local Storage la información
  * del juego.
  * Hace el llamado al Modelo.
  */
salvar_LocalStorage(){
	
	this.model.save_LocalStorage();
}

/**
  * Método que obtiene del Local Storage la información
  * almacenada del juego.
  * Hace el llamado al Modelo.
  */
cargar_LocalStorage(){
	
	this.model.load_localStorage();
}

/**
  * Método que realiza la solicitud al servidor, para obtener
  * la información del juego guardada en la base de datos de un player
  * en específico, utilizando FETCH.
  */
cargar_MongoBD(){

	return fetch('http://localhost:8080/api/laberinto/' + this.model.Player_getName(), {
        method: 'get',
		body: {},
		header: {
			
			'Accept': 'application/json',
			'Content-Type': 'application/json'
			
		}   
    })
    .then( response => response.json() ) 
        .then((result) => 			
			new CustomEvent("modelUpdateMazeBD",
				{
					'detail': result
				})			
		)
		.then(dispatchEvent)
        .catch(e => console.log(e));
}

/**
  * Retorna el objeto de la clase Modelo.
  * @return {Modelo} El objeto de la clase Modelo.
  */
getModelo(){
	
	return this.model;
}

/**
  * Modifica el objeto de la clase Modelo por uno nuevo.
  * @param {Modelo} modelo - El parámetro modelo es el nuevo objeto de la clase Modelo.
  */
setModelo(modelo){
	
	this.model = modelo;
}

/**
  * Método que realiza la solicitud al servidor, para eliminar
  * la información guardada en la base de datos de un player
  * en específico, utilizando FETCH.
  * @param {String} user - El parámetro user es el 'name' del player.
  */
delete_MongoDB(user){
	
	fetch('http://localhost:8080/api/laberinto/' + user, {
        method: 'delete',
		body: {},
		header: {
			
			'Accept': 'application/json',
			'Content-Type': 'application/json'
			
		}   
    })
	.then('T')
    .catch(e => console.log("Ha ocurrido el siguiente error: " + e));
}

/**
  * Método que realiza la solicitud al servidor, para almacenar
  * en la base de datos la información del juego(contenida en 
  * el Modelo) utilizando FETCH.
  */
save_MongoDB(){
	
	this.delete_MongoDB(this.model.Player_getName());
	fetch('http://localhost:8080/api/guardaLaberinto', {
        method: 'post',
		body: this.model.get_LaberintoJSON(),
		header: {
			
			'Accept': 'application/json',
			'Content-Type': 'application/json'
			
		}   
    })
	.then(alert("Registro insertado en la Base de Datos"))
    .catch(e => console.log("Ha ocurrido el siguiente error: " + e));
}


}
