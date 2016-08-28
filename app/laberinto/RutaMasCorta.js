
const cl = require('../structuras/ColaPrioridad');
const lab = require('../laberinto/Laberinto');

const Cola = cl.ColaPrioridad;
const obtenerVecinos = lab.obtenerVecinos;

function buscaRuta (tree) {
    let resuelve = ( hijo, ruta ) => (hijo) ? (tree, resuelve(tree[hijo.padre] , ruta.concat({i: hijo.i, j: hijo.j}))): ruta;
  return resuelve(tree[cellId(maze[0].length-1, maze.length-1)], []);
}

var cellId = (i, j) => i.toString().concat(","+j);
 
 
function dijkstra(){
 
let nodos = [], distancias = [ ], vistos = [];
 
maze.forEach( (row, i) => row.forEach( (cell, j) => (distancias[ cell.id ] = 99999999, vistos[ cell.id ] = false, nodos[ cell.id ] = {casilla: cell, dis: 0}) ) );
 
let u, vecinos;
let calculaDistancias = (cola, padre) => (
( !cola.empty() ) ? (
 
u = cola.dequeue(),
vistos[u.casilla.id] = true,
vecinos = obtenerVecinosSinMuro(maze, u.casilla.i, u.casilla.j), 
vecinos.forEach( (v) => 
( vistos[cellId(v.i, v.j)] === false && distancias[cellId(v.i, v.j)] > (distancias[u.casilla.id] + 1) && cola.enqueue(nodos[cellId(v.i, v.j)]) ) ?             
                  ( nodos[cellId(v.i, v.j)].dis = distancias[cellId(v.i, v.j)] = distancias[u.casilla.id] + 1,
                                    padre[cellId(v.i, v.j)] = {padre: u.casilla.id, i: u.casilla.i, j: u.casilla.j})                
                   : 0               
                   ), calculaDistancias(cola, padre)
                    
                   ) : padre
 
);
 
var cola = new ColaPrioridad();
distancias[ '0,0' ] = 0;
 
cola.enqueue( nodos['0,0'] );
 
return calculaDistancias(cola, []);             
}
            
//let tree = dijkstra();
//console.log(tree)
//console.log(buscaRuta( treea ));

module.exports = 
{
	CalculaRuta: dijkstra,
	pp: buscaRuta
}
