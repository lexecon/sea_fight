'use strict';

import Modal from './../Modal'

import AuthModalView from './AuthModalView'

export default class AuthModal extends Modal{
  constructor() {
    super();
    this.view = new AuthModalView(this);
    this.view.subscribe('loginClick', (data) => this.onClickLogin(data));
    this.view.subscribe('registrationClick', () => this.onClickRegistration());
  }
  onClickLogin(data) {
    this.publish('loginClick', data);
  }
  onClickRegistration() {
    this.publish('registrationClick');
  }

}