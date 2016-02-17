var Field = function(options){
  this.$el = options.$el;
  this.generateField();
  this.checkItem = options.checkItem || function(){}
}

Field.prototype.generateField = function(){
  for(var i = 0; i < 100; i++){
    this.$el.append('<div class="field_item"></div>')
  }
}

Field.prototype.getItem = function(numbers){
  var index = numbers[1]*10 + numbers[0];
  return $('.field_item', this.$el).eq(index);
}
Field.prototype.show = function(){
  this.$el.addClass('show')
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
      _this.getItem(location).addClass('ship')
    });
  });
}

var RivalField = function(options){
  Field.apply(this, arguments);
  var _this = this
  $('.field_item', this.$el).click(function(){
    _this.checkItem($(this).index());
  })
}
RivalField.prototype = Object.create(Field.prototype);





var Ship = function(options){
  this.amount = options.amount
  this.location = options.location;
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