define (require, exports, module)->
  _List = require '../_List'
  FieldItem = require '../FieldItem/FieldItem'
  FieldCollection = require 'collection/FieldCollection'

  FieldList = _List.extend
    template: '#FieldList'
    className: 'field_list'
    bindings:
      ':el': 'collection: $collection'
    itemView: FieldItem
    initialize: ->
      @collection ?= new FieldCollection

    showField: ->
      @$el.addClass('show')

    initFieldRival: ->
      @$el.addClass('init')

    addLoading: ->
      @$el.addClass('load')

    removeLoading: ->
      @$el.removeClass('load')

    addBlocking: ->
      @$el.addClass('blocked')
    removeBlocking: ->
      @$el.removeClass('blocked')