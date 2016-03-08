'use strict';

import Modal from './../Modal'

import SelectRivalModalView from './SelectRivalModalView'

export default class SelectRivalModal extends Modal{
  constructor() {
    super();
    this.view = new SelectRivalModalView(this);
    this.view.subscribe('selectRival', (rival) => this.onSelectRival(rival));
    this.subscribe('addRival', (rivals) => this.onAddRival(rivals));
  }
  onAddRival(rivals) {
    this.view.publish('addRival', rivals);
  }
  onSelectRival(rival) {
    this.publish('selectRival', rival);
  }

}