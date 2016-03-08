'use strict';

import ModalView from './../Modal/ModalView';
import './ResultModal.sass';
import template from './ResultModal.jade';

export default class ResultModalView extends ModalView {
  constructor(ModalController, title){
    super(ModalController);
    this.template = template;
    this.renderOptions = {
      title: title
    };
  }
}