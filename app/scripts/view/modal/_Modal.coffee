define (require, exports, module)->
  BootstrapModal = require 'sp-utils-bootstrapmodal'
  ViewMixin = require 'utils/ViewMixin'
  common = require 'common'
  Modal = BootstrapModal.extend
    autoremove: false
    modal_backdrop: false
    layoutManager: ->
      common.app.modal

    showAnimation: (callback)->
      BootstrapModal::showAnimation.call this, callback

    closeAnimation: (callback)->
      @$modalEl.removeClass('in')
      setTimeout (=>
        BootstrapModal::closeAnimation.call this, callback
      ), 250

    setErrorState: (value)->
      if value
        @$modalEl.addClass('error_state')
      else
        @$modalEl.removeClass('error_state')



  ViewMixin Modal
