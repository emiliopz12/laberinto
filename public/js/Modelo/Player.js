/**
 * @author Marco Vinicio Cambronero Fonseca <marcovcambronero@gmail.com>
 * @author Emilio Pérez Chinchilla <12epz12@gmail.com>
 * @author Jean Carlo Saborío Ugalde <jecasau14@gmail.com>
 */

/**
 * Clase que representa al jugador.
 */

class Player {

/**
 * Inicializa el modelo
 * @param {String} alias - Contiene el 'name' del jugador.
 * @param {Number} x - Contiene la posición 'x' del jugador. Por defecto es 10.
 * @param {Number} y - Contiene la posición 'y' del jugador. Por defecto es 10.
 * @param {Number} desplX - Contiene en desplazamiento en x del jugador. Por defecto es 0.
 * @param {Number} desplX - Contiene en desplazamiento en y del jugador. Por defecto es 0.
 * @param {Number} size - Contiene el tamaño del jugador. Por defecto es 20.
 * @constructor
 */
  constructor(alias, x = 10, y = 10, desplX = 0, desplY = 0, size = 20) {
    this.name = alias;
    this.x = x;
    this.y = y;
    this.desplX = desplX;
    this.desplY = desplY;
    this.size = size;
  }
  
 /**
 * Modificar el 'name' del jugador.
 * @param {String} newAlias - El parámetro newAlias contiene el nuevo valor del 'name' del jugador.
 */
  setName(newAlias){
    this.name = newAlias;
  }

/**
 * Modificar el 'x' del jugador.
 * @param {Number} newx - El parámetro newx contiene el nuevo valor del 'x' del jugador.
 */
  setX(newx) {
	  this.x = newx;
  }
  
/**
 * Modificar el 'y' del jugador.
 * @param {Number} newx - El parámetro newy contiene el nuevo valor del 'y' del jugador.
 */
  setY(newy) {
	  this.y = newy;
  }
  
/**
 * Modificar el 'desplX' del jugador.
 * @param {Number} newDesplX - El parámetro newDesplX contiene el nuevo valor del 'desplX' del jugador.
 * @return {Boolean} Retorna true si se pudo modificar.
 */
  setDesplX(newDesplX){
  	 this.desplX = newDesplX
     return true;
  }

/**
 * Modificar el 'desplY' del jugador.
 * @param {Number} newDesplY - El parámetro newDesplY contiene el nuevo valor del 'desplY' del jugador.
 * @return {Boolean} Retorna true si se pudo modificar.
 */  
  setDesplY(newDesplY){
  	this.desplY = newDesplY;
    return true;
  }

/**
 * Modifica el 'desplazamiento x' y 'desplazamiento y', ambos a 0.
 */  
  stop(){
	  this.desplX = this.desplY = 0;
  }

/**
 * Modificar el 'size' del jugador.
 * @param {Number} newSize - El parámetro newSize contiene el nuevo valor del 'size' del jugador.
 */  
  setSize(newSize){
    this.size = newSize;
  }

/**
  * Obtener el 'name' del jugador.
  * @return {String} El valor de 'name'.
  */
  getName() {
    return this.name;
  }

/**
  * Obtener el 'x' del jugador.
  * @return {Number} El valor de 'x'.
  */
   getX() {
	  return this.x;
  }

/**
  * Obtener el 'y' del jugador.
  * @return {Number} El valor de 'y'.
  */
  getY() {
	  return this.y;
  }

/**
  * Obtener el 'desplX' del jugador.
  * @return {Number} El valor de 'desplX'.
  */
  getDesplX(){
  	return this.desplX;
  }

/**
  * Obtener el 'desplY' del jugador.
  * @return {Number} El valor de 'desplY'.
  */
  getDesplY(){
  	return this.desplY;
  }
  
/**
  * Obtener el 'desplX' del jugador.
  * @return {Number} El valor de 'desplX'.
  */
  getSize(){
    return this.size;
  }
  
/**
  * Actualiza el 'x' e 'y' del jugador restando el 'desplazamiento x' y 'desplazamiento y' respectivamente.
  */
  backPosition(){
      this.x -= this.desplX;
      this.y -= this.desplY;      
      this.desplX = 0;
      this.desplY = 0;
  }

/**
  * Reinicializa el 'x','y','desplX' y 'desplY' del jugador.
  */
  resetPosition(){
      this.x = 0;
      this.y = 0;
      this.desplX = 0;
      this.desplY = 0;
  }
  
/**
  * Actualiza el 'x' e 'y' del jugador sumando el 'desplazamiento x' y 'desplazamiento y' respectivamente.
  */
  actualizarXY(){
    this.x += this.desplX;
    this.y += this.desplY;
	return true;
  }
}