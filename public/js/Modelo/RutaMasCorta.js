/** @constant {number} */
var UP_WAL = 0, DOWN_WAL = 1, LEFT_WAL = 2, RIGHT_WAL = 3;

/**
 * @author Marco Vinicio Cambronero Fonseca <marcovcambronero@gmail.com>
 * @author Emilio Pérez Chinchilla <12epz12@gmail.com>
 * @author Jean Carlo Saborío Ugalde <jecasau14@gmail.com>
 */

/**
 * Clase que representa una ruta en el laberinto
 */  

class RutaMasCorta{


 /**
 * Método que se encarga de buscar las distancias más cortas hacias las celdas de la matrix
 * @param {Object} tree - objeto que contiene la ruta más corta desde la primera celda hacia las demás
 * @param {Object} maze - la matrix para obtener la última celda del laberinto
 * @return {Array} retorna un Array con la ruta desde la última celda de la matrix hasta la primera
 */
buscaRuta (tree, maze) {
    let resuelve = ( hijo, ruta ) => (hijo) ? 
											  (tree, resuelve(tree[hijo.padre], 
											   ruta.concat({i: hijo.i, j: hijo.j}))
											  )
											: 
											  ruta;
	return resuelve(tree[RutaMasCorta.cellId(maze[0].length-1, maze.length-1)], []);
}

 /**
 * Obtener las coordenadas y la dirección hacia la cual está cada celda vecina a una específica en el laberinto
 * @param {Object} matrix - la matrix de la cual se quiere tener información
 * @param {Number} i - el número de la fila de la celda 
 * @param {Number} j - el número de la columna de la celda 
 * @return {Array} retorna un Array con objetos que contienen las coordenadas y la dirección hacia la cual está 
 * cada celda vecina.
 */
obtenerVecinosSinMuro (matrix, i, j) {   
     return [
             {i: i - 1, j: j, direccion: UP_WAL}, 
             {i: i + 1, j: j, direccion: DOWN_WAL}, 
			 {i: i, j: j - 1, direccion: LEFT_WAL}, 
			 {i: i, j: j + 1, direccion: RIGHT_WAL}
			]
            .filter( (coord) => ((coord.i >= 0) && 
			                     (coord.i < matrix.length) && 
								 (coord.j >= 0) && 
								 (coord.j < matrix[0].length) && 
								 !matrix[i][j].muros[coord.direccion] 
								));
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
dijkstra(maze){
 
let nodos = [], distancias = [ ], vistos = [], u, vecinos, id;
 
maze.forEach( (row, i) => row.forEach( (cell, j) => (distancias[ cell.id ] = 99999999, 
                                                     vistos[ cell.id ] = false, 
													 nodos[ cell.id ] = {casilla: cell, dis: 0}
													) 
									  ) 
			);
 
let calculaDistancias = (cola, padre) => (
( !cola.empty() ) ? (
						u = cola.dequeue(),
						vistos[u.casilla.id] = true,
						vecinos =  this.obtenerVecinosSinMuro(maze, u.casilla.i, u.casilla.j), 
						vecinos.forEach( (v) => (id =  RutaMasCorta.cellId(v.i, v.j),
												( !vistos[id] && distancias[id] > (distancias[u.casilla.id] + 1) 
												  && cola.enqueue(nodos[id]) ) ?
												  
													( nodos[id].dis = distancias[id] = distancias[u.casilla.id] + 1,
													  padre[id] = {padre: u.casilla.id, i: u.casilla.i, j: u.casilla.j}
													) 
												: 
													0  
												)               			
										), calculaDistancias(cola, padre)
					) 
			   : 
					padre
);

var cola = new ColaPrioridad();
distancias[ '0,0' ] = 0;
cola.enqueue( nodos['0,0'] );
 
return  this.buscaRuta(calculaDistancias(cola, []), maze);             
}


}




/**
 * Clase que representa una ruta en el laberinto
 */  

class ColaPrioridad{
 
 /**
 * Inicializa la Cola de prioridad
 * @constructor
 */
constructor(){
    this.array = [];
    this.front = -1;
}
 
 /**
 * Método para obtener el elemento con la distancia mínima de la cola
 * @return {Object} retorna el objeto con la distancia mínima de la cola
 */
dequeue(){
 this.front--;
  
 return this.array.sort(function(a, b) {
  return a.dis - b.dis;
 }).splice(0,1)[0];

}
 
 /**
 * Método que pone en cola un objeto
 * @return {Boolean} retorna verdadero 
 */
enqueue(obj){
     this.array[++this.front] = obj;
   return true;
}
 
 /**
 * Método que verifica si la cola está vacía
 * @return {Boolean} retorna verdadero si la cola está vacía o falso en caso contrario
 */
empty(){
  return (this.front === -1);
}
}

 /**
 * Evento que permite crear un WebWorker y notificar el resultado
 * @param {Object} e - la matrix de la cual se quiere obtener la solución más corta
 */
onmessage = function(e) {
  let r = new RutaMasCorta().dijkstra(e.data.msj);
  var workerResult = {
      msg : r
  } ;
  postMessage(workerResult);
}