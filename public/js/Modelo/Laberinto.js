/** @constant
    @type {Number}
    @default
*/
const UP_WALL = 0, DOWN_WALL = 1, LEFT_WALL = 2, RIGHT_WALL = 3;

/**
 * @author Marco Vinicio Cambronero Fonseca <marcovcambronero@gmail.com>
 * @author Emilio Pérez Chinchilla <12epz12@gmail.com>
 * @author Jean Carlo Saborío Ugalde <jecasau14@gmail.com>
 */

/**
 * Clase que representa un laberinto
 */  

class Laberinto{
	
 /**
 * Inicializa la matrix del laberinto
 * @constructor
 */
constructor(){
	this.matrix;
}

 /**
 * Modificar la matrix
 * @param {Object} maze - la nueva matrix
 */
setLaberinto(maze){
	this.matrix = maze;
}
 
 /**
 * Crear una nueva matrix
 * @param {Object} coord - objeto con la cantidad de filas 'x' y la cantidad de columnas 'y'
 */
crearMatrix(coord) { 
//this.matrix = Array.from({length: coord.x}).map((e, i) => Array.from({length: coord.y}).map( (a, j) => new Casilla(i,j)) ); 
this.matrix = new Matrix(coord.x, coord.y)
}
 
 /**
 * Obtener las coordenadas y la dirección hacia la cual está cada celda vecina a una específica
 * @return {Array} retorna un Array con objetos que contienen las coordenadas y la dirección hacia la cual está cada celda vecina
 */
obtenerVecinos (matrix, i, j) { 
      return [
                {i: i - 1, j: j, direccion: UP_WALL}, 
                {i: i + 1, j: j, direccion: DOWN_WALL}, 
                {i: i, j: j - 1, direccion: LEFT_WALL}, 
                {i: i, j: j + 1, direccion: RIGHT_WALL}
              ]
	             .filter( (coord) => ((coord.i >= 0) && 
                                    (coord.i < matrix.length) && 
                                    (coord.j >= 0) && 
                                    (coord.j < matrix[0].length))
                      );
}   
 
 /**
 * Método que genera un laberinto aleatorio sobre la matrix
 * @param {Object} obj - objeto con la cantidad de filas 'x' y la cantidad de columnas 'y' para crear la matrix
 * @return {Object} retorna el laberinto, es decir, la matrix resultante
 */
generarLaberinto(obj) {  
  
let crearLaberinto = (matrix, i = 0, j = 0) => (
        (matrix[i][j].estado) ? 
          (
              matrix[i][j].estado = false,   
              new PArray(...this.obtenerVecinos(matrix, i, j))
                        .shuffle().filter((vecino) => matrix[vecino.i][vecino.j].murosActivos() >= obj.dificultad)
                        .forEach( (cell) => (matrix[cell.i][cell.j].murosActivos() >= obj.dificultad) ? 
                                              (matrix[i][j].eliminarMuro(cell.direccion), 
                                                matrix[ cell.i ][cell.j].eliminarMuroContrario(cell.direccion), 
                                                crearLaberinto(matrix, cell.i, cell.j)
                                              )
                                            : 0
                                )
          ) : 0 );

this.crearMatrix(obj);
crearLaberinto( this.matrix, 
                MyMath.RandomInt(this.matrix.length, 0), 
                MyMath.RandomInt(this.matrix[0].length, 0) 
              );
return this.matrix;

}

}//fin class