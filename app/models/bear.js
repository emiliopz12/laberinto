//====================================================================
var exports = {

    crearMatrix: function(y, x, objeto) {
      return Array.from({length: x}).map((e) => Array.from({length: y}).map( (a) => _.clone(objeto)) );
    },
	
    crearLaberinto: function(matrix, start) {
      matrix[start.x][start.y].muro = false;
      var vecinoAleatorio = _.sample(
        this.obtenerVecinos(matrix, start.y, start.x)
      );
      this.eliminarMuro(matrix, vecinoAleatorio.y, vecinoAleatorio.x);
    },

    eliminarMuro: function(matrix, y, x) {
      var vecinos = this.obtenerVecinos(matrix, y, x);
      var murosVecino = vecinos.filter((vecino) =>
         matrix[vecino.y][vecino.x].muro
      );

      if (vecinos.length - murosVecino.length === 1) {
        matrix[y][x].muro = false;
        murosVecino = _.shuffle(murosVecino);
        murosVecino.forEach( (element) =>
          this.eliminarMuro(matrix, element.y, element.x)
        );
      }
    },
	
    obtenerVecinos: function(matrix, y, x) {
      var vecinos = [];
      if (y > 0)
        vecinos.push({y: y - 1, x: x});
      if (y < matrix.length - 1) 
        vecinos.push({y: y + 1, x: x});
      if (x > 0) 
        vecinos.push({y: y, x: x - 1});
      if (x < matrix[0].length - 1) 
        vecinos.push({y: y, x: x + 1});
      return vecinos;
    },
    pintarMatrix: function(matrix) {
      var output = '\n';
      _.each(matrix, function(row, i) {
        _.each(row, function(cell, j) {
          output += cell.muro ? '#' : '-';
        });
        output += '\n';
      });
      console.log(output);
    },
    generar: function(x, y) {
		
      var matrix = this.crearMatrix(x, y, {muro: true});
      this.crearLaberinto(matrix, {x: 0, y:0});

      this.pintarMatrix(matrix);
      
      return matrix;
    }
  };
//====================================================================