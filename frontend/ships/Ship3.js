'use strict';

import Ship from './Ship'

export default class Ship3 extends Ship {
  constructor(options) {
    options.amount = 3;
    super(options);
  }
}