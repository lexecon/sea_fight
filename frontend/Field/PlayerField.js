'use strict';

import Field from './Field';
import gameVariant from './../data/gameVariant';

export default class PlayerField extends Field {
  constructor() {
    super({
        renderOptions:{
          className: 'player_field'
        }
      });

    this.ships = [];
    this.render();
    this.generateShips();
    this.aliveShips = this.ships.length; // Сколько кораблей еще на плаву
    this.paintShips();
    this.subscribe('checkFieldItem', (num) => this.checkFieldItem(num));
  }
  generateShips() { // Заполнение поля случайной комбинацией кораблей
    function randomInteger(min, max) {
      let rand = min + Math.random() * (max - min);
      rand = Math.round(rand);
      return rand;
    }
    let index = randomInteger(0, gameVariant.length-1);
    this.ships = gameVariant[index];
  }
  paintShips() { // Отрисовка кораблей на поле
    var _this = this;
    this.ships.forEach((ship) => {
      ship.location.forEach((location) => {
        this.setVirtualField(location, 1, ship)
      });
    });
  }
  checkFieldItem(number) { // Стрельба по полю number
    let state = 3;
    if (this.virtualField[number].state == 1) {
      state = 2;
      this.setVirtualField(number, state);
      this.virtualField[number].ship.amountAlive--;
      if(!this.virtualField[number].ship.checkAlive()) {
        this.aliveShips--;
        this.publish('shipDestroy', this.virtualField[number].ship.nearbyPoints);
        this.setEmptyPoints(this.virtualField[number].ship.nearbyPoints);
        if(!this.aliveShips) {
          this.publish('gameFail');
        }
      }
    } else {
      this.setVirtualField(number, state);
    }
    this.publish('answerCheckFieldItem', {location: number, state: state});
  }
}