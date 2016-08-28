/*
        NOMBRE              ID           HORARIO
1)
2)
3)
4)  
*/

class PPromise extends Promise{
	static from(value){
		return this.resolve(value)
	}
	static in() {return x => x};
	
	static log(...args){
		return console.log(...args);
	}
	
	constructor(ex){
		super(ex);	
	}
	continue(s){
		return this.then(it =>{console.log(s + it); return it;});
	}
	if(c, t, e){
		return this.then((c) ? e: t); 
	}
	static case(c){
		return (typeof c == 'function') ? c : (it => c == it);
	}
	static default(){
		return _ => true;
	}
	switch(...cases){
		return this.then(it => ((cases).find((b) => b[0](it)) [1](it) ));
	}
}

module.exports = {
	PPromise : PPromise
}