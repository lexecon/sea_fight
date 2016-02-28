define (require, exports, module)->
  Layout = require '../_Layout'
  AuthModal = require 'view/modal/AuthModal/AuthModal'
  RegistrationModal = require 'view/modal/RegistrationModal/RegistrationModal'
  RivalModal = require 'view/modal/RivalModal/RivalModal'

  ModalLayout = Layout.extend
    initialize: ->
      @listenTo common.user, 'showLoginModal', @onShowUserModal
      @listenTo common.user, 'showRegistrationModal', @onShowRegistrationModal
      @listenTo common.game, 'showSelectRivalModal', @onShowSelectRivalModal

    onShowUserModal: ->
      (new AuthModal).showModal()

    onShowRegistrationModal: ->
      (new RegistrationModal).showModal()

    onShowSelectRivalModal: ->
      (new RivalModal).showModal()

