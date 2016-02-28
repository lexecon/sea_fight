define (require, exports, module)->
  Backbone = require 'backbone'
  FieldCollection = require 'collection/FieldCollection'
  ShipField = require 'utils/ShipField'

  PlayerFieldCollection = FieldCollection.extend
    generateShips: ->
      @ships = (new ShipField).getRandomShips()
      _.each @ships, (ship)=>
        _.each ship.location, (location)=>
          @models[@getIndex(location)].set {state: 1, ship: ship}

    checkField: (index)->
      if @models[index].get('state') == 1
        @models[index].set {state: 2}
        ship = @models[index].get('ship')
        ship.amountAlive--
        if !ship.amountAlive
          @trigger 'changeAliveShips', ship.nearbyPoints
        @trigger 'answerCheck', {index: index, state: 2}
        return true
      else
        @models[index].set {state: 3}
        @trigger 'answerCheck', {index: index, state: 3}
        return false

