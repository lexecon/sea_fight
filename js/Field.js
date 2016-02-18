var Field = function(options){
  this.$el = options.$el;
  this.onCheckItem = options.onCheckItem || function(){};
  this.onChangeState = options.onChangeState || function(){};
  this.onChangeAlive = options.onChangeAlive || function(){}
  this.virtualField = []; // 0 - пустая клетка, 1 - палуба корабля, 2 - подбитая палуба корабля, 3 - пустое поле в которое стреляли
  this.aliveShips = 10; // Сколько кораблей еще на плаву
  this.generateField();
}
Field.prototype.setVirtualField = function(location, state, ship){ // Изменение в виртуальном поле
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

Field.prototype.setEmptyPoints = function(points){ // Обведение точками потопленного корабля
  var _this = this;
  $.each(points, function(num, point){
    if(_this.virtualField[point].state == 0){
      _this.virtualField[point].state = 3;
      _this.getItem(point).addClass('empty');
    }
  })
}

Field.prototype.addLoading = function(){ // Перевести поле в режим ожидания сервера
  this.$el.addClass('load');
}
Field.prototype.removeLoading = function(){ // Перевести поле в обычный режим, после ожидания сервера
  this.$el.removeClass('load');
}
Field.prototype.addBlocking = function(){ // Заблокировать поле (не твой ход)
  this.$el.addClass('blocked');
}
Field.prototype.removeBlocking = function(){ // Разблокировать поле
  this.$el.removeClass('blocked');
}
Field.prototype.generateField = function(){ // Создает клетки на поле и оздает пустое виртуальное поле
  for(var i = 0; i < 100; i++){
    this.$el.append('<div class="field_item"></div>')
    this.virtualField[i] = {state: 0, ship: null}
  }
}
Field.prototype.getIndex = function(location){ // Получить номер по координатам
  return location[1]*10 + location[0];
}

Field.prototype.getItem = function(location){ // Получить DOM объект клетки по координатам или индексу
  var index = location;
  if(typeof location == "object"){
    index = location[1]*10 + location[0];
  }
  return $('.field_item', this.$el).eq(index);
}
Field.prototype.show = function(){ // Показать поле
  this.$el.addClass('show')
}
Field.prototype.checkItem = function(number){ // Стрельба по полю number
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



var PlayerField = function(options){ // Класс игрового поля игрока
  Field.apply(this, arguments);
  this.generateShips();
  this.paintShips();
}
PlayerField.prototype = Object.create(Field.prototype);
PlayerField.prototype.generateShips = function(){ // Заполнение поля случайной комбинацией кораблей
  function randomInteger(min, max) {
    var rand = min + Math.random() * (max - min)
    rand = Math.round(rand);
    return rand;
  }
  var index = randomInteger(0, Game_variant.length-1)
  this.ships = Game_variant[index];
}
PlayerField.prototype.paintShips = function(){ // Отрисовка кораблей на поле
  var _this = this;
  $.each(this.ships, function(num, ship){
    $.each(ship.location, function(num, location){
      _this.setVirtualField(location, 1, ship)
    });
  });
}

var RivalField = function(options){  // Класс игрового поля соперника
  Field.apply(this, arguments);
  var _this = this;
  $('.field_item', this.$el).click(function(){
    if($(this).attr('class') == 'field_item'){
      _this.onCheckItem($(this).index());
    }

  })
}
RivalField.prototype = Object.create(Field.prototype);