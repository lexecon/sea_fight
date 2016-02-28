define (require, exports, module)->

  class Ship
    constructor: (options)->
      @location = options.location || [] # Координаты палуб корабля
      @amount = @location.length # Количесво палуб корабля
      @amountAlive = @amount # Количество не потопленых палуб корабля
      @calculateNearbyPoints()

    calculateNearbyPoints: -> # Расчет точек вокруг корабля
      @nearbyPoints = []
      _.each @location, (location)=>
        _.each [-1 .. 1], (i)=>
          _.each [-1 .. 1], (j)=>
            firstIndex = location[0]+i
            lastIndex = location[1]+j
            if firstIndex>=0 && firstIndex<=9 && lastIndex>=0 && lastIndex<=9
              @nearbyPoints.push(firstIndex+lastIndex*10)
