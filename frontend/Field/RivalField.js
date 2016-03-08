'use strict';

import Field from './Field';

export default class RivalField extends Field {
  constructor() {
    super({
      renderOptions:{
        className: 'rival_field'
      }
    });
    this.render();
    this.subscribe('activateField', () => this.activateField());
    this.subscribe('setVirtualField', (data) => this.onSetVirtualField(data));
    this.subscribe('setEmptyPoints', (points) => {this.onSetEmptyPoints(points)});

    this.view.subscribe('clickFieldItem', (num) => this.onClickFieldItem(num));
  }
  onClickFieldItem(num) {
    if(this.virtualField[num].state == 0){
      this.publish('clickFieldItem', num);
    }

  }
  activateField() {
    this.view.activateField();
  }
  onSetVirtualField(data) {
    this.setVirtualField(data.location, data.state);
  }
  onSetEmptyPoints(points) {
    this.setEmptyPoints(points);
  }
}