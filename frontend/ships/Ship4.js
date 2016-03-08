'use strict';

import Ship from './Ship'

export default class Ship4 extends Ship {
  constructor(options) {
    options.amount = 4;
    super(options);
  }
}