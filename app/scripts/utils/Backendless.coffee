define (require, exports, module)->
  Server = require 'backendless'
  CHANNEL = 'default'
  instance = null

  class Backendless
    constructor: ->
      if instance
        return instance
      APPLICATION_ID = '27F4B4CC-CEF6-F408-FF94-325C139E6400'
      SECRET_KEY = '1BCABB13-3115-2646-FF05-441A80AB8F00'
      VERSION = 'v1'
      Server.initApp(APPLICATION_ID, SECRET_KEY, VERSION)
#     Инициализация BaaS сервиса https://backendless.com/documentation/data/js/data_overview.htm
      instance = this

    login: (email, password)->
      async = common.async()
      Server.UserService.login email, password, true, new Server.Async(
        (user)->
          async.resolve(user)
      , ->
        async.reject()
      )
      async.promise()

    registration: (name, email, password) ->
      async = common.async()
      user = new Backendless.User()
      user.name = name
      user.email = email
      user.password = password
      Server.UserService.register user, new Server.Async(
        (userAnswer)->
          async.resolve userAnswer
      , ->
        async.reject()
      )
      async.promise()

    getUsers: ->
      Server.Persistence.of(common.BackendlessUsers).find()

    subscribe: (subtopic, onMessage)->
      subscriptionOptions = new SubscriptionOptions({subtopic:subtopic});
      sub = Server.Messaging.subscribe( CHANNEL, onMessage, subscriptionOptions)

    sendMessage: (message, publisherId, subtopic)->
      publishOptions = new PublishOptions()
      publishOptions.publisherId = publisherId
      publishOptions.subtopic = subtopic
      Server.Messaging.publish( CHANNEL, JSON.stringify(message), publishOptions);
