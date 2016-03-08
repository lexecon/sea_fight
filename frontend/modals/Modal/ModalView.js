'use strict';

import EventObject from './../../lib/EventObject'

export default class ModalView extends EventObject {
  constructor(ModalController) {
    super();
    this.layout = document.querySelector('#modal_layout');
    ModalController.subscribe('showModal', ()=> this.onShow());
    ModalController.subscribe('hideModal', ()=> this.onHide());
  }
  render(options = {}) {
    if(!this.template){
      throw new Error('template not defined');
    }
    this.layout.innerHTML = this.template(options);
  }
  _show() {
    this.layout.offsetHeight; // repaint
    this.layout.className = 'show';
    setTimeout(() => this.publish('onShowModal'), 400);
  }
  _hide() {
    this.layout.className = '';
    setTimeout(() => this.publish('onHideModal'), 400);
  }
  onShow() {
    this.render(this.renderOptions);
    this._show();
  }
  onHide() {
    this._hide();
  }
  addErrorState() {
    if(this.layout.className.includes('show')){
      this.layout.className = 'show error_state';
    }
  }
  removeErrorState() {
    if(this.layout.className.includes('show')){
      this.layout.className = 'show';
    }
  }
}