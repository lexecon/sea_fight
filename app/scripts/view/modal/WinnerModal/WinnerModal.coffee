define (require, exports, module)->
  _Modal = require '../_Modal'
  WinnerModal = _Modal.extend
    template: '#WinnerModal'
    className: 'winner_modal'

    #initialize: ->
    #  _Modal::initialize.apply this, arguments
    #  #You code here

    #showModal: ->
    #  #You code here
    #  _Modal::showModal.apply this, arguments
