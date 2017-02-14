var UP_WAL = 0, DOWN_WAL = 1, LEFT_WAL = 2, RIGHT_WAL = 3;

const cl = require('../structuras/ColaPrioridad');
const lab = require('../laberinto/Laberinto');

const ColaPrioridad = cl.ColaPrioridad;
const obtenerVecinosSinMuro = lab.obtenerVecinosSinMuro;

class RutaMasCorta{


 /**
 * Método que se encarga de buscar las distancias más cortas hacias las celdas de la matrix
 * @param {Object} tree - objeto que contiene la ruta más corta desde la primera celda hacia las demás
 * @param {Object} maze - la matrix para obtener la última celda del laberinto
 * @return {Array} retorna un Array con la ruta desde la última celda de la matrix hasta la primera
 */
static buscaRuta (tree, maze) {
    let resuelve = ( hijo, ruta ) => (hijo) ? (tree, resuelve(tree[hijo.padre] , ruta.concat({i: hijo.i, j: hijo.j}))): ruta;
  return resuelve(tree[RutaMasCorta.cellId(maze[0].length-1, maze.length-1)], []);
}

 /**
 * Obtener las coordenadas y la dirección hacia la cual está cada celda vecina a una específica en el laberinto
 * @param {Object} matrix - la matrix de la cual se quiere tener información
 * @param {Number} i - el número de la fila de la celda 
 * @param {Number} j - el número de la columna de la celda 
 * @return {Array} retorna un Array con objetos que contienen las coordenadas y la dirección hacia la cual está cada celda vecina
 */
static obtenerVecinosSinMuro (matrix, i, j) {   
     return [{i: i - 1, j: j, direccion: UP_WAL}, {i: i + 1, j: j, direccion: DOWN_WAL}, {i: i, j: j - 1, direccion: LEFT_WAL}, {i: i, j: j + 1, direccion: RIGHT_WAL}]
	  .filter( (coord) => ((coord.i >= 0) && (coord.i < matrix.length) && (coord.j >= 0) && (coord.j < matrix[0].length) && !matrix[i][j].muros[coord.direccion] ));
} 

 /**
 * Obtener las coordenadas en filas 'i', columnas 'j' concatenadas en un String
 * @return {String} retorna las coordenadas en filas 'i', columnas 'j' concatenadas
 */
static cellId(i, j) { return i.toString().concat(","+j); }
 
 /**
 * Método que se encarga de buscar las distancias más cortas hacias las celdas de la matrix
 * @param {Object} maze - la matrix de la cual se quiere tener información
 * @return {Array} retorna un Array con la ruta desde la última celda de la matrix hasta la primera
 */
static dijkstra(maze){
 
let nodos = [], distancias = [ ], vistos = [], u, vecinos, id;
 
maze.forEach( (row, i) => row.forEach( (cell, j) => (distancias[ cell.id ] = 99999999, vistos[ cell.id ] = false, nodos[ cell.id ] = {casilla: cell, dis: 0}) ) );
 
let calculaDistancias = (cola, padre) => (
( !cola.empty() ) ? (
 
u = cola.dequeue(),
vistos[u.casilla.id] = true,
vecinos =  RutaMasCorta.obtenerVecinosSinMuro(maze, u.casilla.i, u.casilla.j), 
vecinos.forEach( (v) => (id =  RutaMasCorta.cellId(v.i, v.j),
( !vistos[id] && distancias[id] > (distancias[u.casilla.id] + 1) && cola.enqueue(nodos[id]) ) ?             
                  ( nodos[id].dis = distancias[id] = distancias[u.casilla.id] + 1,
					padre[id] = {padre: u.casilla.id, i: u.casilla.i, j: u.casilla.j}) : 0  )               
                                
                   ), calculaDistancias(cola, padre)
                    
                   ) : padre
 
);

var cola = new ColaPrioridad();
distancias[ '0,0' ] = 0;
cola.enqueue( nodos['0,0'] );
 
return  RutaMasCorta.buscaRuta(calculaDistancias(cola, []), maze);             
}

}
            
//let tree = dijkstra();
//console.log(tree)
//console.log(buscaRuta( treea ));

module.exports = 
{
	RutaMasCorta: RutaMasCorta
}
