define (require, exports, module)->
  _Modal = require '../_Modal'
  RegistrationModal = _Modal.extend
    template: '#RegistrationModal'
    className: 'registration_modal'

    ui:
      name: '[data-js-name]'
      email: '[data-js-email]'
      password: '[data-js-password]'
      back: '[data-js-back]'
      registration: '[data-js-registration]'
      inputs: 'input'

    events:
      'click @ui.back': 'onClickBack'
      'click @ui.registration': 'onClickRegistration'
      'focus @ui.inputs': 'onFocusInput'

    onClickBack: ->
      @ok()
      .done ->
        common.user.startLogin()

    onClickRegistration: ->
      name = @ui.name.val()
      email = @ui.email.val()
      password = @ui.password.val()
      if email =='' || password == '' || name == ''
        @setErrorState true
      else
        common.user.registration name, email, password
        .done =>
          @ok()
          .done ->
            common.game.startSelectRival()
        .fail =>
          @setErrorState true

    onFocusInput: ->
      @setErrorState false

    #initialize: ->
    #  _Modal::initialize.apply this, arguments
    #  #You code here

    #showModal: ->
    #  #You code here
    #  _Modal::showModal.apply this, arguments
