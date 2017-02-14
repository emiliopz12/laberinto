 /**
 * @author Marco Vinicio Cambronero Fonseca <marcovcambronero@gmail.com>
 * @author Emilio Pérez Chinchilla <12epz12@gmail.com>
 * @author Jean Carlo Saborío Ugalde <jecasau14@gmail.com>
 */

 /**
 * Clase que representa Aleatoriedad
 */  
class MyMath{

 /**
 * Método estático que genera un número aleatorio entero entre un rango 
 * @param {Number} min - límite inferior del rango, inclusive
 * @param {Number} max - límite superior del rango, exclusive
 * @return {Number} Retorna un número aleatorio entero entre el rango establecido
 */
	static RandomInt(max, min) { 
		return Math.floor(Math.random() * (max - min)) + min; 
	}

}