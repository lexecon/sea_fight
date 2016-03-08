'use strict';

import './index.sass';

import User from './models/UserModel';
import Game from './models/GameModel';
import AuthModal from './modals/AuthModal';
import RegistrationModal from './modals/RegistrationModal';
import SelectRivalModal from './modals/SelectRivalModal';
import ResultModal from './modals/ResultModal'

let user = new User,
  game = new Game,
  authModal = new AuthModal,
  registrationModal = new RegistrationModal,
  selectRivalModal = new SelectRivalModal;

window.Users = function(args) { // Шаблон пользователя для сохранения в Baas
  args = args || {};
  this.objectId = args.objectId || null;
};
window.Users.prototype.___class = 'Users';

user.subscribe('loginSuccess', () => {
  game.publish('loginSuccess', user.getUser().name);
  authModal.hide()
  .then(() => {
      showRivalModal()
    })
});
user.subscribe('loginError', () => authModal.addErrorState());
user.subscribe('registrationSuccess', () => {
  game.publish('loginSuccess', user.getUser().name);
  registrationModal.hide()
  .then(() => {
      showRivalModal()
    })
});
user.subscribe('registrationError', () => registrationModal.addErrorState());

authModal.show();
authModal.subscribe('loginClick', (data) => user.login(data));
authModal.subscribe('registrationClick', () => {
  authModal.hide()
  .then(() => {
      registrationModal.show();
    });
});

registrationModal.subscribe('clickBack', () => {
  registrationModal.hide()
  .then(() => {
      authModal.show();
    })
});
registrationModal.subscribe('clickRegistration', (data) => user.registration(data));

selectRivalModal.subscribe('selectRival', (rival) => {
  user.setRival(rival);
  selectRivalModal.hide();
  game.publish('selectRival', user.getRival().name);
});

game.subscribe('showGameName', (title) => {
  let h1 = document.querySelector("#content_layout h1");
  h1.innerText = title;
});
game.subscribe('gameSuccess', () => (new ResultModal({title: 'Ура победа!'})).show());
game.subscribe('gameFail', () => (new ResultModal({title: 'Ты проиграл ('})).show());


function showRivalModal() {
  selectRivalModal.show();
  user.loadRivalsPromise.then(
    function(users){
      selectRivalModal.publish('addRival', users);
    }
  );

}

