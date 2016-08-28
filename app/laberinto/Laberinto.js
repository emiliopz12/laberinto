const UP_WALL = 0, DOWN_WALL = 1, LEFT_WALL = 2, RIGHT_WALL = 3;

class Casilla{
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
 
eliminarMuro(muro){
this.muros[muro] = false;
}
 
eliminarMuroContrario(muro){
let array = new Array();
array[UP_WALL] = DOWN_WALL;
array[DOWN_WALL] = UP_WALL;
array[LEFT_WALL] = RIGHT_WALL;
array[RIGHT_WALL] = LEFT_WALL;
 
this.muros[array[muro]] = false;
}
 
}

Array.prototype.shuffle = function() {
  return this.map((n) =>  [Math.random(), n] )
             .sort().map((n) => n[1] );
}
 
let crearMatrix = (x, y) => Array.from({length: x}).map((e, i) => Array.from({length: y}).map( (a, j) => new Casilla(i,j)) );
 
var obtenerVecinos = (matrix, i, j) => (
        
      [{i: i - 1, j: j, direccion: UP_WALL}, {i: i + 1, j: j, direccion: DOWN_WALL}, {i: i, j: j - 1, direccion: LEFT_WALL}, {i: i, j: j + 1, direccion: RIGHT_WALL}]
	  .filter( (coord) => ((coord.i >= 0) && (coord.i < matrix.length) && (coord.j >= 0) && (coord.j < matrix[0].length)))
);
 
var obtenerVecinosSinMuro = (matrix, i, j) => (        
      [{i: i - 1, j: j, direccion: UP_WALL}, {i: i + 1, j: j, direccion: DOWN_WALL}, {i: i, j: j - 1, direccion: LEFT_WALL}, {i: i, j: j + 1, direccion: RIGHT_WALL}]
	  .filter( (coord) => ((coord.i >= 0) && (coord.i < matrix.length) && (coord.j >= 0) && (coord.j < matrix[0].length) && matrix[i][j].muros[coord.direccion] === false ))
);
 
     
let crearLaberinto = (matrix, i, j) => (
     
     matrix[i][j].estado = false,
       
     obtenerVecinos(matrix, i, j).shuffle().filter((vecino) =>
         matrix[vecino.i][vecino.j].estado
      ).forEach( (cell) => (matrix[cell.i][cell.j].estado) ? (matrix[i][j].eliminarMuro(cell.direccion), matrix[ cell.i ][cell.j].eliminarMuroContrario(cell.direccion), crearLaberinto(matrix, cell.i, cell.j)): matrix[ cell.i ][cell.j].eliminarMuroContrario(cell.direccion) )
);
	
	
	module.exports = 
	{
		crearMatrix: crearMatrix,
		crearLaberinto: crearLaberinto,
		obtenerVecinos: obtenerVecinosSinMuro
	}