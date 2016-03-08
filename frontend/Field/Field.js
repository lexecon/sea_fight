'use strict';

import EventObject from './../lib/EventObject';
import FieldView from './FieldView';

export default class Field extends EventObject {
  constructor(optionsView={}) {
    super();
    this.view = new FieldView(optionsView);
    this.virtualField = []; // 0 - пустая клетка, 1 - палуба корабля, 2 - подбитая палуба корабля, 3 - пустое поле в которое стреляли
    this.generateField();
    this.subscribe('showField', () => this.showField());
    this.subscribe('setLoadingState', (state) => this.onSetLoadingState(state));
    this.subscribe('setBlockingState', (state) => this.onSetBlockingState(state));
  }
  showField() {
    this.view.showField();
  }
  render() {
    this.view.render();
  }
  setVirtualField(location, state, ship) { // Изменение в виртуальном поле
    let index = location;
    if(typeof location == "object"){
      index = this.getIndex(location);
    }
    if(ship){
      this.virtualField[index].ship = ship;
    }
    this.virtualField[index].state= state;

    this.view.setItemState(state, index);
  }
  setEmptyPoints(points) { // Обведение точками потопленного корабля
    let _this = this
    points.forEach((point) => {
      if(_this.virtualField[point].state == 0){
        _this.setVirtualField(point, 3);
      }
    });
  }
  _addLoading() { // Перевести поле в режим ожидания сервера
    this.view.addLoading();
  }
  _removeLoading() { // Перевести поле в обычный режим, после ожидания сервера
    this.view.removeLoading();
  }
  onSetLoadingState(state) {
    if(state) {
      this._addLoading();
    }else {
      this._removeLoading();
    }
  }
  _addBlocking() { // Заблокировать поле (не твой ход)
    this.view.addBlocking();
  }
  _removeBlocking() { // Разблокировать поле
    this.view.removeBlocking();
  }
  onSetBlockingState(state) {
    if(state) {
      this._addBlocking();
    }else {
      this._removeBlocking();
    }
  }
  generateField() { // Создает пустое виртуальное поле
    for(let i = 0; i < 100; i++){
      this.virtualField[i] = {state: 0, ship: null}
    }
  }
  getIndex(location) { // Получить номер по координатам
    return location[1]*10 + location[0];
  }
}
