var Ship = function(options){ // Класс корабля
  this.amount = options.amount; // Количесво палуб корабля
  this.amountAlive = options.amount; // Количество не потопленых палуб корабля
  this.location = options.location; // Координаты палуб корабля
  this.calculateNearbyPoints();

}
Ship.prototype.checkAlive = function(){ // Проверка жизни корабля
  return this.amountAlive;
}

Ship.prototype.calculateNearbyPoints = function(){ // Расчет точек вокруг корабля
  this.nearbyPoints = [];
  var _this = this;
  $.each(this.location, function(num, location){
    for(var i=-1; i<2; i++){
      for(var j=-1; j<2; j++){
        var firstIndex = location[0]+i;
        var lastIndex = location[1]+j;
        if(firstIndex>=0&&firstIndex<=9&&lastIndex>=0&&lastIndex<=9){
          _this.nearbyPoints.push(firstIndex+ lastIndex*10);
        }
      }
    }
  })
}


var Ship1 = function(options){
  options.amount = 1;
  Ship.call(this, options);
}
Ship1.prototype = Object.create(Ship.prototype);

var Ship2 = function(options){
  options.amount = 2;
  Ship.call(this, options);
}
Ship2.prototype = Object.create(Ship.prototype);

var Ship3 = function(options){
  options.amount = 3;
  Ship.call(this, options);
}
Ship3.prototype = Object.create(Ship.prototype);

var Ship4 = function(options){
  options.amount = 4;
  Ship.call(this, options);
}
Ship4.prototype = Object.create(Ship.prototype);