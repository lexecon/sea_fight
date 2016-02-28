define (require, exports, module)->
  Backbone = require 'backbone'
  FieldModel = require 'model/FieldModel'

  FieldCollection = Backbone.Collection.extend
    model: FieldModel
    initialize: ->
      fieldItems = []
      _.each [0 .. 99], ->
        fieldItems.push {
          state: 0
        }
      @reset fieldItems

    getIndex: (location)->
      if typeof location == 'Number'
        return location
      return location[1]*10 + location[0]

    setEmptyPoints: (points)->
      _.each points, (index)=>
        if @models[index].get('state') == 0
          @models[index].set {state: 3}

