define (require, exports, module)->
  Backbone = require 'backbone'
  RivalModel = require 'model/RivalModel'

  RivalCollection = Backbone.Collection.extend
    model: RivalModel


