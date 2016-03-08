'use strict';

import 'script!backendless/libs/backendless.min'; // Жуткий способ подключениея через eval так как
// библиотека передает в глобальную область видимости много переменных

const  APPLICATION_ID = '27F4B4CC-CEF6-F408-FF94-325C139E6400',
  SECRET_KEY = '1BCABB13-3115-2646-FF05-441A80AB8F00',
  VERSION = 'v1',
  CHANNEL = 'default';

let instance = null;


export default class Server {
  constructor() {
    if(instance){
      return instance;
    }
    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
    instance = this;
  }
  login({email = "", password = ""}) {
    return new Promise((resolve, reject) => {
      if(email === '' || password === ''){
        throw new Error("email or password not defined");
      }
      Backendless.UserService.login(email, password, true, new Backendless.Async(
        (user) => resolve(user),
        () => reject()
      ));
    })
  }
  registration({name = "", email = "", password = ""}) {
    return new Promise((resolve, reject) => {
      let user = new Backendless.User();
      user.name = name;
      user.email = email;
      user.password = password;
      Backendless.UserService.register(user, new Backendless.Async(
        (user) => resolve(user),
        () => reject()
      ));
    })
  }
  getUsers() {
    try{
      let users = Backendless.Persistence.of(Users).find();
      return users;
    }catch(error) {
      console.log(error);
    }
  }
  subscribeBass(subtopic, onMessage) {
    let subscriptionOptions = new SubscriptionOptions({subtopic:subtopic});
    Backendless.Messaging.subscribe( CHANNEL, onMessage, subscriptionOptions);
  }
  publishBass(publisherId, subtopic, message) {
    let publishOptions = new PublishOptions();
    publishOptions.publisherId = publisherId;
    publishOptions.subtopic = subtopic;
    Backendless.Messaging.publish( CHANNEL, JSON.stringify(message), publishOptions);
  }
}