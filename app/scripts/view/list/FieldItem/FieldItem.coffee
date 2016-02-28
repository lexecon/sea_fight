define (require, exports, module)->
  _List = require '../_List'
  
  FieldItem = _List.extend
    template: '#FieldItem'
    
    className: 'field_item'

    bindings:
      ':el': 'classes: {"ship": shipField, "empty": emptyField, "corrupted": damagedShipField}'

    events:
      'click': 'onClickItem'

    onClickItem: ->
      @model.trigger 'clickField', @$el.index()
