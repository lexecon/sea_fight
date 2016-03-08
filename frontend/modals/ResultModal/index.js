'use strict';

import Modal from './../Modal'

import ResultModalView from './ResultModalView'

export default class ResultModal extends Modal{
  constructor(options) {
    super();
    this.view = new ResultModalView(this, options.title);
  }
}