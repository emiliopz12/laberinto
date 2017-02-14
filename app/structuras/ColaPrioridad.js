class ColaPrioridad{
 
constructor(){
    this.array = [];
    this.front = -1;
}
 
dequeue(){
 this.front--;
  
 var e = this.array.sort(function(a, b) {
  return a.dis - b.dis;
 }).splice(0,1)[0];
 
 return e;
}
 
enqueue(obj){
     this.array[++this.front] = obj;
   return true;
}
 
empty(){
  return (this.front === -1);
}
}

module.exports = 
{
	ColaPrioridad: ColaPrioridad
}