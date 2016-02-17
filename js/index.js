var APPLICATION_ID = '27F4B4CC-CEF6-F408-FF94-325C139E6400',
  SECRET_KEY = '1BCABB13-3115-2646-FF05-441A80AB8F00',
  VERSION = 'v1'; //default application version;
Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);

function Users(args) {
  args = args || {};
  this.___class = 'Users';
  this.objectId = args.objectId || null;
}
var User = null;

var authModal = new AuthModal({
  $el: $('.auth_modal'),
  onClickRegistration: function(){
    this.close().done(function(){
      registrationModal.show();
    });
  },
  onClickLogin: function(data){
    var _this = this
    if(data.login != '' && data.password != ''){
      Backendless.UserService.login(data.login, data.password, true, new Backendless.Async(
        function(user){
          User = user;
          _this.close().done(function(){
            selectUser();
          })
        },
        function(){
          _this.addErrorState();
        }
      ));
    }
    else{
      _this.addErrorState();
    }
  }
});

var registrationModal = new RegistrationModal({
  $el: $('.registration_modal'),
  onClickRegistration: function(data){
    var user = new Backendless.User();
    user.name = data.name;
    user.email = data.email;
    user.password = data.password;
    var _this = this;
    Backendless.UserService.register(user, new Backendless.Async(
      function(user){
        User = user;
        _this.close().done(function(){
          selectUser();
        })
      },
      function(){
        _this.addErrorState();
      }
    ));
  },
  onClickBack: function(){
    this.close().done(function(){
      authModal.show();
    })
  }
})
var selectUserModal = new SelectUserModal({
  $el: $('.select_user_modal'),
  onClickUser: function(user){
    this.close().done(function(){
      game.startGame(user);
    })
  }
})


var game = new Game()


authModal.show();
var selectUser = function(){
  var users = Backendless.Persistence.of(Users).find();
  selectUserModal.createUsers(users);
  selectUserModal.show();
}


//Backendless.UserService.isValidLogin(new Backendless.Async(success, error));
//
//var user = new Backendless.User();
//user.email = "lexecon117@gmail.com";
//user.password = "1234567";
////Backendless.UserService.register(user);
//
//function Comment(args) {
//  args = args || {};
//  this.message = args.message || "";
//  this.authorEmail = args.authorEmail || "";
//}
//var dataStore = Backendless.Persistence.of(Comment);
//var commentObject = new Comment({message: "I'm in", authorEmail: user.email});
//dataStore.save( commentObject );

//function userLoggedIn( user )
//{
//  console.log( "user has logged in" );
//}
//
//function gotError( err ) // see more on error handling
//{
//  console.log( "error message - " + err.message );
//  console.log( "error code - " + err.statusCode );
//}

//Backendless.UserService.login( 'lexecon117@gmail.com', '1234567', true, new Backendless.Async( userLoggedIn, gotError ) );

//function success(data){ console.log(data);}
//function error(data){
//  console.log('Error'+data);
//  Backendless.UserService.login( 'lexecon117@gmail.com', '1234567', true, new Backendless.Async( userLoggedIn, gotError ) );
//}
//Backendless.UserService.isValidLogin(new Backendless.Async(success, error));