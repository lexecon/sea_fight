define (require, exports, module)->
  _List = require '../_List'
  
  RivalItem = _List.extend
    template: '#RivalItem'
    className: 'rival_item'

    bindings:
      ':el': 'text: name'

    events:
      'click': 'onCLickItem'

    onCLickItem: ->
      @model.trigger 'onClickRival', @model

    initialize: ->
      if @model.get('email') == common.user.get('email')
        @$el.addClass 'hide'
