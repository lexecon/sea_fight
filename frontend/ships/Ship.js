'use strict';

export default class Ship {
  constructor(options) {
    this.amount = options.amount; // Количесво палуб корабля
    this.amountAlive = options.amount; // Количество не потопленых палуб корабля
    this.location = options.location; // Координаты палуб корабля
    this.calculateNearbyPoints();
  }
  checkAlive() { // Проверка жизни корабля
    return this.amountAlive;
  }
  calculateNearbyPoints() { // Расчет точек вокруг корабля
    this.nearbyPoints = [];
    this.location.forEach((location) => {
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          let firstIndex = location[0] + i;
          let lastIndex = location[1] + j;
          if (firstIndex >= 0 && firstIndex <= 9 && lastIndex >= 0 && lastIndex <= 9) {
            this.nearbyPoints.push(firstIndex + lastIndex * 10);
          }
        }
      }
    })
  }
}