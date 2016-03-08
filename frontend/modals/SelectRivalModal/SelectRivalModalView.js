'use strict';

import ModalView from './../Modal/ModalView';
import './SelectRivalModal.sass';
import template from './SelectRivalModal.jade';

export default class SelectRivalModalView extends ModalView {
  constructor(ModalController){
    super(ModalController);
    this.template = template;
    this.renderOptions = {
      title: 'Выбери соперника',
      modalClass: 'select_users_modal'
    };
    this.subscribe('addRival', (rivals) => this.onAddRivals(rivals));
  }
  onAddRivals(rivals) {
    let appendHtml = document.createElement('ul');
    rivals.forEach((rival) => {
      let li = document.createElement('li');
      li.innerText = rival.name;
      li.onclick = () => this.publish('selectRival', rival);
      appendHtml.appendChild(li);
    });
    let userList = document.querySelector('.user_list');
    userList.appendChild(appendHtml);
  }


}