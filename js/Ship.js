var Ship = function(options){
  this.amount = options.amount;
  this.amountAlive = options.amount;
  this.location = options.location;
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
Ship.prototype.checkAlive = function(){
  return this.amountAlive;
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