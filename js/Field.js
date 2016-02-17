var Field = function(options){
  this.$el = options.$el;
  this.onCheckItem = options.onCheckItem || function(){};
  this.onChangeState = options.onChangeState || function(){};
  this.onChangeAlive = options.onChangeAlive || function(){}
  this.virtualField = []; // 0 - пустая клетка, 1 - палуба корабля, 2 - подбитая палуба корабля, 3 - пустое поле в которое стреляли
  this.aliveShips = 10;
  this.generateField();
}
Field.prototype.setVirtualField = function(location, state, ship){
  var index = location;
  if(typeof location == "object"){
    index = this.getIndex(location);
  }
  if(ship){
    this.virtualField[index].ship = ship;
  }
  this.virtualField[index].state= state;
  switch(state){
    case 1:{
      this.getItem(location).addClass('ship');
      break;
    }
    case 2:{
      this.getItem(location).addClass('corrupted');
      this.onChangeState(location, state);
      break;
    }
    case 3:{
      this.getItem(location).addClass('empty');
      this.onChangeState(location, state);
      break;
    }
  }
}

Field.prototype.setEmptyPoints = function(points){
  var _this = this
  $.each(points, function(num, point){
    if(_this.virtualField[point].state == 0){
      _this.virtualField[point].state = 3
      _this.getItem(point).addClass('empty');
    }
  })
}

Field.prototype.addLoading = function(){
  this.$el.addClass('load');
}
Field.prototype.removeLoading = function(){
  this.$el.removeClass('load');
}
Field.prototype.addBlocking = function(){
  this.$el.addClass('blocked');
}
Field.prototype.removeBlocking = function(){
  this.$el.removeClass('blocked');
}
Field.prototype.generateField = function(){
  for(var i = 0; i < 100; i++){
    this.$el.append('<div class="field_item"></div>')
    this.virtualField[i] = {state: 0, ship: null}
  }
}
Field.prototype.getIndex = function(location){
  return location[1]*10 + location[0];
}

Field.prototype.getItem = function(location){
  var index = location;
  if(typeof location == "object"){
    index = location[1]*10 + location[0];
  }
  return $('.field_item', this.$el).eq(index);
}
Field.prototype.show = function(){
  this.$el.addClass('show')
}
Field.prototype.checkItem = function(number){
  if(this.virtualField[number].state == 1){
    this.setVirtualField(number, 2);
    this.virtualField[number].ship.amountAlive--;
    if(!this.virtualField[number].ship.checkAlive()){
      this.aliveShips--;
      this.onChangeAlive(this.virtualField[number].ship.nearbyPoints);
    }
    return true;
  }else{
    this.setVirtualField(number, 3);
    return false;
  }
}



var PlayerField = function(options){
  Field.apply(this, arguments);
  this.generateShips();
  this.paintShips();
}
PlayerField.prototype = Object.create(Field.prototype);
PlayerField.prototype.generateShips = function(){
  this.ships = [];
  this.ships.push(new Ship1(
    {location: [[0, 0]]}
  ));
  this.ships.push(new Ship1(
    {location:[[3, 0]]}
  ));
  this.ships.push(new Ship1(
    {location: [[5,0]]}
  ));
  this.ships.push(new Ship1(
    {location: [[7, 0]]}
  ));
  this.ships.push(new Ship2(
    {location: [[0, 2], [1, 2]]}
  ));
  this.ships.push(new Ship2(
    {location: [[4, 2], [5, 2]]}
  ));
  this.ships.push(new Ship2(
    {location: [[7, 2], [8, 2]]}
  ));
  this.ships.push(new Ship3(
    {location: [[0, 4], [0,5], [0, 6]]}
  ));
  this.ships.push(new Ship3(
    {location: [[2, 4], [2,5], [2, 6]]}
  ));
  this.ships.push(new Ship4(
    {location: [[5, 4], [5,5], [5, 6], [5, 7]]}
  ));
}
PlayerField.prototype.paintShips = function(){
  var _this = this;
  $.each(this.ships, function(num, ship){
    $.each(ship.location, function(num, location){
      _this.setVirtualField(location, 1, ship)
    });
  });
}

var RivalField = function(options){
  Field.apply(this, arguments);
  var _this = this;
  $('.field_item', this.$el).click(function(){
    _this.onCheckItem($(this).index());
  })
}
RivalField.prototype = Object.create(Field.prototype);