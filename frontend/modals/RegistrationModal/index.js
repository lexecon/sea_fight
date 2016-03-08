'use strict';

import Modal from './../Modal'

import RegistrationModalView from './RegistrationModalView'

export default class RegistrationModal extends Modal{
  constructor() {
    super();
    this.view = new RegistrationModalView(this);
    this.view.subscribe('backClick', () => this.onClickBack());
    this.view.subscribe('registrationClick', (data) => this.onClickRegistration(data));
  }
  onClickBack() {
    this.publish('clickBack');
  }
  onClickRegistration(data) {
    this.publish('clickRegistration', data)
  }

}