define (require, exports, module)->
  _Page = require '../_Page'
  AuthModal = require 'view/modal/AuthModal/AuthModal'
  FieldList = require 'view/list/FieldList/FieldList'
  PlayerFieldCollection = require 'collection/PlayerFieldCollection'
  RivalFieldCollection = require 'collection/RivalFieldCollection'

  IndexPage = _Page.extend
    template: '#IndexPage'
    className: 'index_page'

    regions:
      playerField:
        el: '[data-js-player-field]'
        view: FieldList.extend
          collection: new PlayerFieldCollection
      rivalField:
        el: '[data-js-rival-field]'
        view: FieldList.extend
          collection: new RivalFieldCollection

    ui:
      header: '[data-js-game-name]'

    bindings:
      '@ui.header': 'text: format("$1 - $2", name, rivalName), classes: {show: rivalName}'


    initialize: ->
      @model = common.game
      @viewModel = common.user
      @listenTo common.user, 'change:auth', _.bind(@onChangeUserAuth, this)
      @listenTo common.game, 'change:rivalName', _.bind(@onChangeRivalName, this)
      @r.playerField.collection.generateShips()
      @listenTo @r.rivalField.collection, 'clickField', _.bind(@onClickRivalField, this)
      @listenTo common.game, 'onMessage', _.bind(@onMessage, this)
      @listenTo @r.playerField.collection, 'answerCheck', _.bind(@onAnswerCheck, this)
      @listenTo @r.playerField.collection, 'changeAliveShips', _.bind(@onChangeAliveShips, this)

    onChangeUserAuth: (user, auth)->
      if auth
        @r.playerField.showField()
    onChangeRivalName: ->
      @r.rivalField.showField()

    onChangeAliveShips: (emptyPoints)->
      common.game.sendMessage {state: 'set_empty_points', data: {points: emptyPoints}}
      @r.playerField.collection.setEmptyPoints emptyPoints

    onClickRivalField: (index)->
      @r.rivalField.addLoading()
      @model.checkRivalField index

    onAnswerCheck: (data)->
      common.game.sendMessage {state: 'answer_check_item', data:{index: data.index, state: data.state}}

    onMessage: (answer)->
      switch(answer.state)
        when 'start_game' then @r.rivalField.initFieldRival()
        when 'check_item'
          if !(@r.playerField.collection.checkField answer.data)
            @r.rivalField.removeBlocking()
          else
            @r.rivalField.addBlocking()
        when 'answer_check_item'
          @r.rivalField.removeLoading()
          @r.rivalField.collection.models[answer.data.index].set {state: answer.data.state}
          if answer.data.state == 3
            @r.rivalField.addBlocking()
        when 'set_empty_points'
          @r.rivalField.collection.setEmptyPoints(answer.data.points)
        when 'you_win' then successModal.show();


