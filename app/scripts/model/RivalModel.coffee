define (require, exports, module)->
  Backbone = require 'backbone'
  require 'epoxy'

  RivalModel = Backbone.Epoxy.Model.extend

    defaults:
      field: 'value'

    #parse:(r)->
    #  r
