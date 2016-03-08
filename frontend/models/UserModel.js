'use strict';

import Server from './../lib/Server'
import Model from './../lib/Model'

export default class UserModel extends Model{
  constructor() {
    super();
    this.data = '';
    this.rival = null;
    this.backendless = new Server;
    this.subscribe('loginSuccess', () => this.loadRivals());
    this.subscribe('registrationSuccess', () => this.loadRivals());
    this.loadRivalsPromise = new Promise((resolve, reject) => {
      this.resolveLoadRivals = resolve;
      this.rejectLoadRivals = reject;
    });
  }

  login(data) {
    this.backendless.login(data)
    .then((user) => {
        this.data = user;
        this.publish('loginSuccess');
      })
    .catch(() => {
        this.publish('loginError')
      })
  }
  registration(data) {
    this.backendless.registration(data)
    .then((user) => {
        this.data = user;
        this.publish('registrationSuccess');
      })
    .catch(() => this.publish('registrationError'))
  }
  loadRivals() {
    let users = this.backendless.getUsers().data;
    let rivals = [];
    users.forEach((user) => {
      if(user.email != this.data.email) {
        rivals.push(user);
      }
    });
    this.resolveLoadRivals(rivals);
  }
  setRival(rival) {
    this.rival = rival;
    this.publish('setRivalSuccess', rival);
  }
  getUser() {
    return this.data;
  }
  getRival() {
    return this.rival;
  }
}