'use strict';

import Ship from './Ship'

export default class Ship1 extends Ship {
  constructor(options) {
    options.amount = 1;
    super(options);
  }
}