define (require, exports, module)->
  _Modal = require '../_Modal'
  RivalList = require 'view/list/RivalList/RivalList'
  Backendless = require 'utils/Backendless'

  RivalModal = _Modal.extend
    template: '#RivalModal'
    className: 'rival_modal'

    regions:
      rivalList:
        el: '[data-js-rival-list]'
        view: RivalList

    initialize: ->
      _Modal::initialize.apply this, arguments
      @backendless = new Backendless
      @r.rivalList.collection.reset @backendless.getUsers().data
      @listenTo @r.rivalList.collection, 'onClickRival', _.bind(@onClickRival, this)

    onClickRival: (model)->
      @ok()
      .done ->
        common.game.setRival model

    #showModal: ->
    #  #You code here
    #  _Modal::showModal.apply this, arguments
