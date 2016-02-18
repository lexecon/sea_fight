CHANNEL = 'default';

var Game = function(){
}

Game.prototype.startGame = function(user){  //Начало игры user - информация о сопернике
  var _this = this;
  this.rivalUser = user;
  $('#game_content').html('<h1>'+User.name+' - '+user.name+'</h1><div class="my_field show"></div><div class="field"></div>')
  this.subscribe(User.email+'-'+user.email); // Подписка на канал сообщений
  this.myField = new PlayerField({
    $el: $('.my_field', this.$el),
    onChangeState: function(location, state){
      if(state == 2){
        _this.rivalField.addBlocking();
      }
      _this.sendMessage({state: 'answer_check_item', data:{location: location, state: state}});
    },
    onChangeAlive: function(points){
      _this.myField.setEmptyPoints(points);
      _this.sendMessage({state: 'set_empty_points', data:{points: points}});
      if(!_this.myField.aliveShips){
        alert('Вы проиграли')
        _this.sendMessage({state: 'you_win'});
      }
    }
  });
  this.rivalField = new RivalField({
    $el: $('.field', this.$el),
    onCheckItem: function(index){
      _this.rivalField.addLoading();
      _this.sendMessage({state: 'check_item', data: index});
    }
  });
  this.sendMessage({state: 'start_game'});

}
Game.prototype.checkItem = function(index){ // Проверка клетки на моем поле
  if(!this.myField.checkItem(index)){
    this.rivalField.removeBlocking();
  }
}
Game.prototype.initRival = function(){ // Соперник появился
  this.rivalField.show();

}
Game.prototype.subscribe = function(subtopic){ // Подписка на канал сообщений
  var subscriptionOptions = new SubscriptionOptions({subtopic:subtopic});
  var sub = Backendless.Messaging.subscribe( CHANNEL, $.proxy(this.onMessage, this), subscriptionOptions);
  return sub;
}
Game.prototype.sendMessage = function(message){ // Отправка сообщения в канал
  var publishOptions = new PublishOptions();
  publishOptions.publisherId = User.name;
  publishOptions.subtopic = this.rivalUser.email+'-'+User.email;
  Backendless.Messaging.publish( CHANNEL, JSON.stringify(message), publishOptions);
}

Game.prototype.onMessage = function(result){ // Слушатель сообщений
  var _this = this;
  $.each( result.messages, function (){
    var answer = JSON.parse(this.data);
    switch(answer.state){
      case 'start_game':{
        _this.initRival();
        break;
      }
      case 'check_item':{
        _this.checkItem(answer.data);
        break;
      }
      case 'answer_check_item':{
        _this.rivalField.removeLoading();
        _this.rivalField.setVirtualField(answer.data.location, answer.data.state);
        if(answer.data.state == 3){
          _this.rivalField.addBlocking();
        }
        break;
      }
      case 'set_empty_points':{
        _this.rivalField.setEmptyPoints(answer.data.points);
        break;
      }
      case 'you_win':{
        successModal.show();
        break;
      }
    }
  });
}
