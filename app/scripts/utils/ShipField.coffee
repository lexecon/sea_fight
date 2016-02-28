define (require, exports, module)->
  Ship = require 'utils/Ship'

  class ShipField
    constructor: ->
      @generatedGames = [
        [(new Ship({location: [[0, 0]]})), (new Ship({location:[[3, 0]]})), (new Ship({location: [[5,0]]})), (new Ship({location: [[7, 0]]})),
         (new Ship({location: [[0, 2], [1, 2]]})), (new Ship({location: [[4, 2], [5, 2]]})), (new Ship({location: [[7, 2], [8, 2]]})),
         (new Ship({location: [[0, 4], [0,5], [0, 6]]})), (new Ship({location: [[2, 4], [2,5], [2, 6]]})),
         (new Ship({location: [[5, 4], [5,5], [5, 6], [5, 7]]}))
        ],
        [(new Ship({location: [[0, 0]]})), (new Ship({location:[[0, 7]]})), (new Ship({location: [[5,0]]})), (new Ship({location: [[7, 7]]})),
         (new Ship({location: [[0, 3], [1, 3]]})), (new Ship({location: [[4, 3], [5, 3]]})), (new Ship({location: [[7, 3], [8, 3]]})),
         (new Ship({location: [[4, 9], [3,9], [2, 9]]})), (new Ship({location: [[9, 7], [9,6], [9, 5]]})),
         (new Ship({location: [[9, 9], [8,9], [7, 9], [6, 9]]}))
        ],
        [(new Ship({location: [[0, 0]]})), (new Ship({location:[[9, 0]]})), (new Ship({location: [[5,0]]})), (new Ship({location: [[7, 7]]})),
         (new Ship({location: [[0, 3], [1, 3]]})), (new Ship({location: [[4, 3], [5, 3]]})), (new Ship({location: [[7, 3], [8, 3]]})),
         (new Ship({location: [[0, 9], [1,9], [2, 9]]})), (new Ship({location: [[0, 7], [0,6], [0, 5]]})),
         (new Ship({location: [[9, 9], [9,8], [9, 7], [9, 6]]}))
        ]
      ]
    getRandomShips: ->
      randomInteger = (min, max)->
        rand = min + Math.random() * (max - min)
        rand = Math.round(rand)
      index = randomInteger(0, @generatedGames.length-1)
      @generatedGames[index]

