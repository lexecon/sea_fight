var Modal = function(options){
  this.$el = options.$el
  var _this = this;
  $('input', this.$el).focus(function(){
    _this.removeErrorState();
  })
}
Modal.prototype.show = function(){
  $('#modal_content').addClass('show');
  clearTimeout(this.timmer);
  this.$el.removeClass('hide');
  this.$el.width(); // Принудительный repaint
  this.$el.addClass('show');
}
Modal.prototype.close = function(){
  var async = $.Deferred();
  this.$el.removeClass('show');
  var _this = this;
  this.timmer = setTimeout(function(){
    _this.$el.addClass('hide');
    $('#modal_content').removeClass('show');
    async.resolve()
  }, 550);
  return async.promise()

}
Modal.prototype.addErrorState = function(){
  this.$el.addClass('error_state');
}

Modal.prototype.removeErrorState = function(){
  this.$el.removeClass('error_state');
}



var AuthModal = function(options){// $el,onClickLogin, onClickRegistration
  Modal.apply(this, arguments);
  this.onClickLogin = options.onClickLogin || function(){};
  this.onClickRegistration = options.onClickRegistration || function(){};
  this.login = $('.email', this.$el);
  this.password = $('.pass', this.$el);
  var _this = this;
  $('.login', this.$el).click(function(){
    _this.onClickLogin({login: _this.login.val(), password: _this.password.val()});
  });
  $('.registration', this.$el).click(function(){
    _this.onClickRegistration();
  });
}

AuthModal.prototype = Object.create(Modal.prototype);


var RegistrationModal = function(options){// $el,onClickBack, onClickRegistration
  Modal.apply(this, arguments);
  this.onClickBack = options.onClickBack || function(){};
  this.onClickRegistration = options.onClickRegistration || function(){};
  this.name = $('.name', this.$el);
  this.email = $('.email', this.$el);
  this.password = $('.pass', this.$el);
  var _this = this;
  $('.back', this.$el).click(function(){
    _this.onClickBack();
  });
  $('.registration', this.$el).click(function(){
    _this.onClickRegistration({name: _this.name.val(), email: _this.email.val(), password: _this.password.val()});
  });
}

RegistrationModal.prototype = Object.create(Modal.prototype);

var SelectUserModal = function(options){
  Modal.apply(this, arguments);
  this.onClickUser = options.onClickUser || function(){}
}
SelectUserModal.prototype = Object.create(Modal.prototype);
SelectUserModal.prototype.createUsers = function(users){
  var _this = this;
  var userList = $('.user_list', this.$el);
  for(var i = 0; i<users.data.length;i++){
    var appendClass="";
    if(users.data[i].email == User.email){
      appendClass="hide";
    }
    userList.append('<div class="user_item '+appendClass+'">'+ users.data[i].name+'</div>');
  }
  $('.user_item').click(function(){
    _this.onClickUser(users.data[$(this).index()])
  })
}