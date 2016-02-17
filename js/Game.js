CHANNEL = 'default';

var Game = function(){
}

Game.prototype.startGame = function(user){
  this.rivalUser = user;
  $('#game_content').html('<h1>'+User.name+' - '+user.name+'</h1><div class="my_field show"></div><div class="field"></div>')
  this.subscribe(User.email+'-'+user.email);
  //this.subscribe(user.email+'-'+User.email);
  this.sendMessage({state: 'start_game'});
  this.myField = new PlayerField({
    $el: $('.my_field', this.$el)
  });
  this.rivalField = new RivalField({
    $el: $('.field', this.$el),
    checkItem: function(index){

    }
  });

}
Game.prototype.initRival = function(){
  this.rivalField.show()
}
Game.prototype.subscribe = function(subtopic){
  var subscriptionOptions = new SubscriptionOptions({subtopic:subtopic});
  var sub = Backendless.Messaging.subscribe( CHANNEL, $.proxy(this.onMessage, this), subscriptionOptions);
  return sub;
}
Game.prototype.sendMessage = function(message){
  var publishOptions = new PublishOptions();
  publishOptions.publisherId = User.name;
  publishOptions.subtopic = this.rivalUser.email+'-'+User.email;
  Backendless.Messaging.publish( CHANNEL, JSON.stringify(message), publishOptions);
}
Game.prototype.onMessage = function(result){
  var _this = this;
  $.each( result.messages, function (){
    var answer = JSON.parse(this.data);
    switch(answer.state){
      case 'start_game':{
        _this.initRival();
        break;
      }
    }
    console.dir(answer);
  });
}
