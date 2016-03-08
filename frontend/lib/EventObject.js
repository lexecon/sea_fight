'use strict';

export default class EventObject{
  constructor() {
    this._events = [];
    this._eventOne = [];
  }
  publish(eventName,  ...args) {
    this._checkEvent(eventName);
    this._events[eventName].forEach((item)=>{
      item(...args);
    });
    while(this._eventOne[eventName].length){
      this._eventOne[eventName].pop()(...args);
    }

  }
  subscribe(eventName, func) {
    this._checkEvent(eventName);
    this._events[eventName].push(func);
  }
  subscribeOne(eventName, func) {
    this._checkEvent(eventName);
    this._eventOne[eventName].push(func);
  }
  _checkEvent(eventName) {
    if(!this._events[eventName]){
      this._events[eventName] = [];
    }
    if(!this._eventOne[eventName]){
      this._eventOne[eventName] = [];
    }
  }
}