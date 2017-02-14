/**
 * @author Marco Vinicio Cambronero Fonseca <marcovcambronero@gmail.com>
 * @author Emilio Pérez Chinchilla <12epz12@gmail.com>
 * @author Jean Carlo Saborío Ugalde <jecasau14@gmail.com>
 */

/**
 * Clase que representa cada casilla de la matrix.
 */  
 
class Casilla{
	
	
 /**
 * Inicializa la Casilla
 * @param {Number} i - el número de columnas en el que se encuentra la casilla en la Matrix
 * @param {Number} j - el número de fila en el que se encuentra la casilla en la Matrix
 * @constructor
 */
constructor(i,j){
this.i = i;
this.j = j;
this.muros = new Array();
this.muros [UP_WALL] = true;
this.muros [DOWN_WALL] = true;
this.muros [LEFT_WALL] = true;
this.muros [RIGHT_WALL] = true;
this.estado = true;
this.id = i.toString().concat(","+j);
}
 
 /**
 * Método que elimina un muro de la Casilla 
 * @param {Number} muro - el número del muro a eliminar
 */
eliminarMuro(muro){
this.muros[muro] = false;
}
 
 /**
 * Método que elimina un muro contrario de la Casilla 
 * @param {Number} muro - el número del muro del cual se quiere eliminar el contrario
 */
eliminarMuroContrario(muro){
let array = new Array();
array[UP_WALL] = DOWN_WALL;
array[DOWN_WALL] = UP_WALL;
array[LEFT_WALL] = RIGHT_WALL;
array[RIGHT_WALL] = LEFT_WALL;
 
this.muros[array[muro]] = false;
}

 /**
 * Método desordena un Array
 * @return {Number} Retorna el número de muros existentes en la Casilla
 */
murosActivos(){
	return this.muros.filter( e => e).length
}
}