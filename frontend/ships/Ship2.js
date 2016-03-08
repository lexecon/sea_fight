'use strict';

import Ship from './Ship'

export default class Ship2 extends Ship {
  constructor(options) {
    options.amount = 2;
    super(options);
  }
}