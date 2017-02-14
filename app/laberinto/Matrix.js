 /**
 * @author Marco Vinicio Cambronero Fonseca <marcovcambronero@gmail.com>
 * @author Emilio Pérez Chinchilla <12epz12@gmail.com>
 * @author Jean Carlo Saborío Ugalde <jecasau14@gmail.com>
 */

 /**
 * Clase que representa la matrix del laberinto
 */  

 /**
 * Modulos requeridos
 */	 
const pArray = require('../laberinto/PArray'); 
const casilla = require('../laberinto/Casilla'); 
const PArray = pArray.PArray;  
const Casilla = casilla.Casilla; 
 
class Matrix extends Array{ 	

 /**
 * Inicializa la matrix
 * @param {Number} n - el número de filas que contiene la matrix
 * @param {Number} m - el número de columnas que contiene la matrix
 * @constructor
 */	 	
constructor(n, m){ 		
super(); 		
this.n = n; 		
this.m = m; 		
this.init(); 	
} 	 	

 /**
 * Método que inicializa la matrix de n * m con objetos Casilla)
 */
init(){ 	
	PArray.range(0, this.n).forEach( (_, i) => 			
		this[i] = PArray.range(0, this.m).map( ( _, j ) => new Casilla(i,j) )); 	
} 

}

	module.exports = 
	{
		Matrix: Matrix
	}