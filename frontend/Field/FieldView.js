'use strict';

import './FieldView.sass';
import template from './FieldView.jade';
import EventObject from './../lib/EventObject';

export default class FieldView extends EventObject {
  constructor({renderOptions}) {
    super();
    this.renderOptions = renderOptions;
    this.template = template;
    this.content = null;
  }
  render() {
    let layout = document.querySelector('#content_layout');
    if(!this.template) {
      throw new Error('template not defined');
    }
    this.content = document.createElement('div');
    this.content.innerHTML = (this.template(this.renderOptions));
    layout.appendChild(this.content);

    let fieldItems = this.content.querySelectorAll('.field_item');
    [].forEach.call(fieldItems, (fieldItem, num) => {
      fieldItem.onclick = () => this.publish('clickFieldItem', num);
    })
  }
  showField() {
    this.content.className = 'show';
  }
  activateField() {
    this.content.className += ' activate';
  }
  setItemState(state, location) {
    switch(state){
      case 1:{
        this.getItem(location).className += ' ship';
        break;
      }
      case 2:{
        this.getItem(location).className += ' corrupted';
        break;
      }
      case 3:{
        this.getItem(location).className += ' empty';
        break;
      }
    }
  }
  getItem(location) {
    return this.content.querySelectorAll('.field_item')[location];
  }
  addLoading() {
    this.content.className += ' load'
  }
  removeLoading() {
    this.content.className = this.content.className.replace(' load', '');
  }
  addBlocking() {
    this.content.className += ' blocked'
  }
  removeBlocking() {
    this.content.className = this.content.className.replace(' blocked', '');
  }
}