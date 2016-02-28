define (require, exports, module)->
  _Modal = require '../_Modal'
  common = require 'common'

  AuthModal = _Modal.extend
    template: '#AuthModal'
    className: 'auth_modal'
    ui:
      email: '[data-js-email]'
      password: '[data-js-password]'
      login: '[data-js-login]'
      registration: '[data-js-registration]'
      inputs: 'input'

    events:
      'click @ui.login': 'onClickLogin'
      'click @ui.registration': 'onClickRegistration'
      'focus @ui.inputs': 'onFocusInput'

    onClickLogin: ->
      email = @ui.email.val()
      password = @ui.password.val()
      if email =='' || password == ''
        @setErrorState true
      else
        common.user.login email, password
        .done =>
          @ok()
          .done ->
            common.game.startSelectRival()
        .fail =>
          @setErrorState true

    onFocusInput: ->
      @setErrorState false

    onClickRegistration: ->
      @ok()
      .done ->
        common.user.startRegistration()