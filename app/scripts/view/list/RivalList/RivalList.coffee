define (require, exports, module)->
  _List = require '../_List'
  RivalItem = require '../RivalItem/RivalItem'
  RivalCollection = require 'collection/RivalCollection'

  RivalList = _List.extend
    template: '#RivalList'
    className: 'rival_list'
    bindings:
      ':el': 'collection: $collection'
    itemView: RivalItem
    initialize: ->
      @collection ?= new RivalCollection
      #@collection.view = @itemView #if use backbone.epoxy < 1.2
