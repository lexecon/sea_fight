define (require, exports, module)->
  Backbone = require 'backbone'
  require 'epoxy'

  FieldModel = Backbone.Epoxy.Model.extend

    defaults:
      state: 0

    computeds:
      shipField:
        deps: ['state']
        get: (state)->
          return (state == 1)
      damagedShipField:
        deps: ['state']
        get: (state)->
          return (state == 2)
      emptyField:
        deps: ['state']
        get: (state)->
          return (state == 3)


    #parse:(r)->
    #  r
