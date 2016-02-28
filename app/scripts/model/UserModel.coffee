define (require, exports, module)->
  Backbone = require 'backbone'
  require 'epoxy'
  common = require 'common'
  Backendless = require 'utils/Backendless'

  UserModel = Backbone.Epoxy.Model.extend

    defaults:
      auth: false
      email: ''
      name: ''

    initialize: (options)->
      @backendless = new Backendless

    startLogin: ->
      @trigger 'showLoginModal'

    startRegistration: ->
      @trigger 'showRegistrationModal'

    login: (email, password)->
      @backendless.login email, password
      .done (user)=>
        @setAuthUser user

    registration: (name, email, password)->
      @backendless.registration name, email, password
      .done (user)=>
        @setAuthUser user


    setAuthUser: (userData)->
      userData.auth = true
      @set userData






