'use strict';

import Server from './../lib/Server';
import Model from './../lib/Model';
import PlayerField from './../Field/PlayerField';
import RivalField from './../Field/RivalField';


export default class GameModel extends Model{
  constructor() {
    super();
    this.playerField = new PlayerField;
    this.rivalField = new RivalField;
    this.userName = null;
    this.rivalName = null;
    this.backendless = new Server;
    this.subscribe('selectRival', (rivalName) => this.onSelectRival(rivalName));
    this.subscribe('loginSuccess', (userName) => this.onSelectUser(userName));

    this.rivalField.subscribe('clickFieldItem', (num) => this.onClickRivalFieldItem(num));

    this.playerField.subscribe('answerCheckFieldItem', (data) => this.onAnswerCheckFieldItem(data));
    this.playerField.subscribe('shipDestroy', (points) => this.onDestroyShip(points));
    this.playerField.subscribe('gameFail', () => this.onGameFail());
  }
  onSelectUser(userName) {
    this.userName = userName;
    this.playerField.publish('showField');
  }
  onSelectRival(rivalName) {
    this.rivalName = rivalName;
    this.rivalField.publish('showField');
    this.publish('showGameName', `${this.userName} - ${this.rivalName}`);
    this.subscribeBass(`${this.userName} - ${this.rivalName}`);
    this.publishBass({state: 'start_game'});
  }
  onClickRivalFieldItem(num) {
    this.rivalField.publish('setLoadingState', true);
    this.publishBass({state: 'check_item', data: num});
  }
  onAnswerCheckFieldItem(data) {
    if(data.state == 2){
      this.rivalField.publish('setBlockingState', true);
    }else {
      this.rivalField.publish('setBlockingState', false);
    }
    this.publishBass({state: 'answer_check_item', data: data});
  }
  onDestroyShip(points) {
    this.publishBass({state: 'set_empty_points', data:{points: points}});
  }
  onGameFail() {
    this.publish('gameFail');
    this.publishBass({state: 'you_win'});
  }
  subscribeBass(subtopic) {
    this.backendless.subscribeBass(subtopic, (data) => this.onMessage(data));
  }
  onMessage(result) {
    var _this = this;
    result.messages.forEach((message) => {
      let answer = JSON.parse(message.data);
      switch(answer.state){
        case 'start_game':{
          this.rivalField.publish('activateField');
          break;
        }
        case 'check_item':{
          this.playerField.publish('checkFieldItem', answer.data);
          break;
        }
        case 'answer_check_item':{
          this.rivalField.publish('setLoadingState', false);
          this.rivalField.publish('setVirtualField', {
            location: answer.data.location,
            state: answer.data.state
          });
          if(answer.data.state == 3) {
            this.rivalField.publish('setBlockingState', true);
          }
          break;
        }
        case 'set_empty_points':{
          this.rivalField.publish('setEmptyPoints', answer.data.points);
          break;
        }
        case 'you_win':{
          this.publish('gameSuccess');
          break;
        }
      }
    });
  }
  publishBass(message) {
    this.backendless.publishBass(this.userName, `${this.rivalName} - ${this.userName}`, message);
  }
}