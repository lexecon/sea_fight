define (require, exports, module)->
  Backbone = require 'backbone'
  require 'epoxy'
  Backendless = require 'utils/Backendless'

  CHANEL = 'default'

  GameModel = Backbone.Epoxy.Model.extend

    defaults:
      rivalName: null
      rivalEmail: null

    initialize: ->
      @backendless = new Backendless

    startSelectRival: ->
      @trigger 'showSelectRivalModal'

    setRival: (model)->
      @set {rivalName: model.get('name')}
      @set {rivalEmail: model.get('email')}
      @subscribe "#{common.user.email} - #{@get('rivalEmail')}"
      @sendMessage {state: 'start_game'}


    sendMessage: (message)->
      @backendless.sendMessage message, common.user.get('name'), "#{@get('email')} - #{common.user.get('email')}"

    subscribe: (subtopic)-> # Подписка на канал сообщений
      @backendless.subscribe subtopic, _.bind(@onMessage, this)

    onMessage: (result)-> # Слушатель сообщений
      _.each result.messages, (message)=>
        @trigger 'onMessage', JSON.parse(message.data)


