'use strict';

import ModalView from './../Modal/ModalView';
import './AuthModal.sass';
import template from './AuthModal.jade';

export default class AuthModalView extends ModalView {
  constructor(ModalController){
    super(ModalController);
    this.template = template;
    this.renderOptions = {
      title: 'Авторизация'
    };
  }
  onShow(){
    super.onShow();
    this.initActions();
  }
  initActions() {
    let email = document.querySelector('#modal_layout .email'),
      pass = document.querySelector('#modal_layout .password'),
      loginButton = document.querySelector('#modal_layout .login'),
      registrationButton = document.querySelector('#modal_layout .registration'),
      inputs = document.querySelectorAll('input');
    loginButton.onclick = () => this.publish('loginClick', {email: email.value, password: pass.value});
    registrationButton.onclick = () => this.publish('registrationClick');
    [].forEach.call(inputs, (input) => {
      input.onfocus = () => {
        this.removeErrorState();
      }
    });
  }

}