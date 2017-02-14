 /**
 * @author Marco Vinicio Cambronero Fonseca <marcovcambronero@gmail.com>
 * @author Emilio Pérez Chinchilla <12epz12@gmail.com>
 * @author Jean Carlo Saborío Ugalde <jecasau14@gmail.com>
 */

 /**
 * Clase que representa un Array.
 */  

class PArray extends Array{ 	

 /**
 * Crea un nuevo Array, por medio de un rango
 * @param {Number} a - límite inferior del rango
 * @param {Number} b - límite superiot del rango
 * @return {Array} Retorna un array que cumple el rango
 */
static range(a, b){	
	return Array.from({length : b - a}, (_, k) => k + a); 	
} 

 /**
 * Método desordena un Array
 * @return {Array} Retorna un array con los elementos en desorden con respecto al original
 */
shuffle(){
	return this.map((n) =>  [Math.random(), n] )
             .sort().map((n) => n[1] );
			 
}

}  