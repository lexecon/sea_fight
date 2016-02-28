define (require, exports, module)->
  Backbone = require 'backbone'
  BackboneMixin = require 'backbone-mixin'
  require 'epoxy'
  ViewMixin = require 'utils/ViewMixin'

  Layout = BackboneMixin(Backbone.Epoxy.View).extend {}
  ViewMixin Layout

#  SuperClass = BackboneMixin(Backbone.Epoxy.View)
#  Layout = SuperClass.extend {}
