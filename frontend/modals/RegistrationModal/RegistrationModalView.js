'use strict';

import ModalView from './../Modal/ModalView';
import './RegistrationModal.sass';
import template from './RegistrationModal.jade';

export default class RegistrationView extends ModalView {
  constructor(ModalController){
    super(ModalController);
    this.template = template;
    this.renderOptions = {
      title: 'Регистрация'
    };
  }
  onShow(){
    super.onShow();
    this.initActions();
  }
  initActions() {
    let name = document.querySelector('#modal_layout .name'),
      email = document.querySelector('#modal_layout .email'),
      pass = document.querySelector('#modal_layout .password'),
      backButton = document.querySelector('#modal_layout .back'),
      inputs = document.querySelectorAll('input'),
      registrationButton = document.querySelector('#modal_layout .registration');
    backButton.onclick = () => this.publish('backClick');
    registrationButton.onclick = () => this.publish('registrationClick',
      {name: name.value, email: email.value, password: pass.value});
    [].forEach.call(inputs, (input) => {
      input.onfocus = () => {
        this.removeErrorState();
      }
    });
  }

}