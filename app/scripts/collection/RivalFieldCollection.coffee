define (require, exports, module)->
  Backbone = require 'backbone'
  FieldCollection = require 'collection/FieldCollection'

  RivalFieldCollection = FieldCollection.extend {}

