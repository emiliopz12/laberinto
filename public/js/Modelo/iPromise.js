/**
 * @author Marco Vinicio Cambronero Fonseca <marcovcambronero@gmail.com>
 * @author Emilio Pérez Chinchilla <12epz12@gmail.com>
 * @author Jean Carlo Saborío Ugalde <jecasau14@gmail.com>
 */

 
/**
 * Clase que representa una Promesa
 * @extends Promise
 */

class iPromise extends Promise{

/**
 * Método que devuelve la promesa con el valor pasado por parámetro.
 * @param {Number} value - El valor que se retorna como parte de la promesa.
 */	
static from(value){
	
	return this.resolve(value)
}

/**
 * Método que implementa la función identidad al retornar el mismo elemento
 * sin ningún cambio.
 */	
static in() {return x => x};

/**
 * Método que imprime en la consola la lista de argumentos pasados por parámetro.
 * @param {Array} ...args - La lista de argumentos.
 */
static log(...args){
	
	return console.log(...args);
}

/**
 * Llama al constructor de la clase Padre.
 * @constructor
 */
constructor(ex){
	
	super(ex);   
}

do(f){
	return this.then( it => ( f(), it   ) );
}

/**
 *
 */	
continue(){
	
	return this.then(it =>  it);
}

/**
 * Método que evalúa el primer parámetro, si este se cumple ejecuta lo indicado en el segundo,
 * sino ejecuta lo indicado en el tercero.
 */	
if(c, t, e){
	return this.then( it => c(it) ? t(it): e(it) );
}


static case(c){
	
	return (typeof c == 'function') ? c : (it => c == it);
}

static default(){
	
	return _ => true;
}

switch(...cases){
	
	return this.then(it => cases.find((b) => b[0](it)) [1](it) );
}

}