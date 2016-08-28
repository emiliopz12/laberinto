window.onload = function(){
	window.onkeydown = p.movimiento;

  // Para no utilizar el scrollbar con las flechas de arriba y abajo:
  document.onkeydown = elEvento =>      
    !(elEvento.keyCode > 36 && elEvento.keyCode < 41); 
};


class Settings {
	
}
	
class Player {

  constructor(alias, x = 0, y = 0, desplX = 0, desplY = 0, size = 0) {
    this.name = alias;
    this.x = x;
    this.y = y;
    this.desplX = desplX;
    this.desplY = desplY;
    this.size = size;
  }

  setX(newx) {
	  this.x = newx;
  }

  setY(newy) {
	  this.y = newy;
  }

  setDesplX(newDesplX){
  	 this.desplX = newDesplX
  }
  
  setDesplY(newDesplY){
  	this.desplY = newDesplY;
  }

  setSize(newSize){
    this.size = newSize;
  }

  getName() {
    return this.name();
  }

   getX() {
	  return this.x;
  }

  getY() {
	  return this.y;
  }

  getDesplX(){
  	return this.desplX;
  }

  getDesplY(){
  	return this.desplY;
  }
  
  getSize(){
    return this.size;
  }

  dibujarCara(contexto) {
  	let imgFace = document.getElementById("cara");
    contexto.drawImage(imgFace, this.getX(), this.getY(), this.getSize(), this.getSize());
  }
  

  movimiento(eventoTecla){

  	p.setDesplX(0);
    p.setDesplY(0);

  	(eventoTecla.keyCode == 38) ? p.setDesplY(-1): // Arriba

  	(eventoTecla.keyCode == 40) ? p.setDesplY(1):  // Abajo

  	(eventoTecla.keyCode == 37) ? p.setDesplX(-1): // Izq.

  	(eventoTecla.keyCode == 39) ? p.setDesplX(1): 0; // Der.

    // Se debe dibujar de nuevo, pues hubo movimiento
  	p.drawAgain();

  }


  compruebaColorNegro(array){
    return (array[0] == 0 && array[1] == 0 && array[2] == 0);
  }


  comprobarChoque(contexto){

    // Obtener porción de canvas a ver si la imagen chocó con pared
      let imagenData = contexto.getImageData(p.getX(), p.getY(), p.getSize(), p.getSize());
      let pixeles = imagenData.data;

      // Se obtiene un arreglo que contiene otros arreglos adentro
      // Su estructura es:  nuevo = [[r,g,b], [r,g,b],...].
      let nuevo = pixeles.reduce( (s,e,i) => (((i+1)%4) == 0) ? ( s.concat( [[pixeles[i-3], pixeles[i-2], pixeles[i-1]]] ) ) : s, []);

      // Aquí se quiere confirmar si existe algún elemento de la forma [0,0,0] en nuevo,
      // es decir, que sea negro.
      let confirma = nuevo.some((_,i) => p.compruebaColorNegro(nuevo[i]));

      return confirma;
  }


  drawAgain(){

    let imgFace = document.getElementById("cara");
    let sonidoChoque = new Audio('sounds/crash.mp3');

  	let canvas = document.getElementById("canvas");
	let ctx = canvas.getContext("2d");

    // Pintar el rastro:
	  ctx.beginPath();
    ctx.fillStyle = "lightgreen";
    ctx.rect(p.getX(), p.getY(), p.getSize(), p.getSize());
    ctx.fill();

    // Actualizar x,y de la imagen.
    p.x += p.getDesplX();
    p.y += p.getDesplY();

    (p.comprobarChoque(ctx)) ? 
          (
            console.log("negro"),
            p.x -= p.getDesplX(),
            p.y -= p.getDesplY(),
            p.setDesplX(0),
            p.setDesplY(0)
           // sonidoChoque.play()
          ): (console.log("blanco"))

    ctx.drawImage(imgFace, p.getX(), p.getY(), p.getSize(), p.getSize());

    //let timer = setTimeout("drawAgain()", 10);
  }
}






let p = new Player();

class Drawer {
	
}

const UP_WALL = 0, DOWN_WALL = 1, LEFT_WALL = 2, RIGHT_WALL = 3;


	$(document).ready(function(){
	$("#requestMaze").click(function(){
	   // Request de Ajax (es una promesa) estilo callback
	   let valores = [$("#filas").val(), $('#columnas').val()];
	   (valores.every( (s) => s > 0 && s !== "" )) ?
	   $.ajax({url: 'http://25.134.244.205:8080/api/laberinto', 
			   type:'GET',
			   data: {fil: 10, col: 10},
			   dataType:'json',
			   

			 }).done(function(result){
						var canvas = document.getElementById("canvas");
						var context = canvas.getContext("2d");
						/*ctx.clearRect(0, 0, canvas.width, canvas.height);
						let anchoMuro = canvas.width / valores[0];
						ctx.fillStyle = "red";
						var centerX = anchoMuro/2;
						var centerY = anchoMuro/2;
						var radius = 4;

      /*ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);    
      ctx.fill();
						;*/
						
						//result.forEach( (row, i) => row.forEach( (cell, j) =>(cell.muro)? (ctx.fillStyle = "black",ctx.fillRect(j * anchoMuro, i * anchoMuro, anchoMuro, anchoMuro)): (ctx.fillStyle = "white",ctx.fillRect(j * anchoMuro, i * anchoMuro, anchoMuro, anchoMuro))) );
						
						let anchoMuro = (canvas.width / result.length);
						let alto = (canvas.height / result.length);
						
						context.beginPath();
       
						context.lineWidth = 5;
						
 
						result.forEach( (row, i) => row.forEach( function (cell, j) {  /*if(cell.muros[UP_WALL]) {context.moveTo(j * anchoMuro, i * alto); context.lineTo(j * anchoMuro + anchoMuro, i * alto); } */ if(cell.muros[LEFT_WALL]) {context.moveTo(j * anchoMuro , i * alto); context.lineTo(j * anchoMuro , i * alto + alto);} if(cell.muros[RIGHT_WALL]) {context.moveTo(j * anchoMuro + anchoMuro, i * alto); context.lineTo(j * anchoMuro + anchoMuro, i * alto + alto);} if(cell.muros[DOWN_WALL]) {context.moveTo(j * anchoMuro, i * alto + alto); context.lineTo(j * anchoMuro + anchoMuro, i * alto + alto);} }));
   
						context.strokeStyle = 'BLACK';
						context.stroke();
						
						p.setSize(anchoMuro/2);
						p.setX(anchoMuro/2);
						p.setY(anchoMuro/2);
						p.dibujarCara(context);
						p.setDesplX(0);
						p.setDesplY(0);
  })
			  .fail(function(e){alert(e);})
			  
			  : alert("Debe ingresar valores validos");
		}); // onclick
		
			});