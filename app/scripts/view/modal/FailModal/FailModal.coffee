define (require, exports, module)->
  _Modal = require '../_Modal'
  FailModal = _Modal.extend
    template: '#FailModal'
    className: 'fail_modal'

    #initialize: ->
    #  _Modal::initialize.apply this, arguments
    #  #You code here

    #showModal: ->
    #  #You code here
    #  _Modal::showModal.apply this, arguments
