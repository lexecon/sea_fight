'use strict';

import EventObject from './../../lib/EventObject';
import './modal.sass';

export default class Modal extends EventObject{
  constructor(){
    super();
  }
  show() {
    this.publish('showModal', {});
  }
  hide() {
    return new Promise((resolve) => {
      if(!this.view){
        throw new Error('view modal not defined');
      }
      this.view.subscribeOne('onHideModal', () => resolve());
      this.publish('hideModal');
    });

  }
  addErrorState() {
    if(!this.view) {
      throw new Error('view modal not defined')
    }
    this.view.addErrorState();
  }
}