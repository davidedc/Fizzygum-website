// Generated by CoffeeScript 1.12.7
window.SliderButtonMorph_coffeSource = '# This is the handle in the middle of any slider.\n# Sliders (and hence this button)\n# are also used in the ScrollPanelWdgts.\n\n# this comment below is needed to figure out dependencies between classes\n# REQUIRES globalFunctions\n\nclass SliderButtonMorph extends CircleBoxMorph\n\n  # careful: Objects are shared with all the instances of this class.\n  # if you modify it, then all the objects will get the change\n  # but if you replace it with a new Color, then that will only affect the\n  # specific object instance. Same behaviour as with arrays.\n  # see: https://github.com/jashkenas/coffee-script/issues/2501#issuecomment-7865333\n  highlightColor: new Color 110, 110, 110\n  # see note above about Colors and shared objects\n  pressColor: new Color 100, 100, 100\n  normalColor: new Color 0, 0, 0\n\n  state: 0\n  STATE_NORMAL: 0\n  STATE_HIGHLIGHTED: 1\n  STATE_PRESSED: 2\n\n  constructor: ->\n    super\n    @isLockingToPanels = false\n    @color = @normalColor.copy()\n    @noticesTransparentClick = true\n    @alpha = 0.4\n\n  detachesWhenDragged: ->\n    if @parent instanceof SliderMorph\n      return false\n    else\n      return true\n\n  reLayout: ->\n    super()\n\n    sliderValue = @parent.value\n    # notably, if you type "-2" as an input to the slider\n    # then as you type the "-"\n    # you get "-" as the value, which becomes NaN\n    if isNaN sliderValue\n      sliderValue = 0\n\n    if @parent?\n      orientation = @parent.autoOrientation()\n      if orientation is "vertical"\n        bw = @parent.width() - 2\n        bh = Math.max bw, Math.round @parent.height() * @parent.ratio()\n        @silentRawSetExtent new Point bw, bh\n        posX = 1\n        posY = Math.max(0,Math.min(\n          Math.round((sliderValue - @parent.start) * @parent.unitSize()),\n          @parent.height() - @height()))\n        if @parent.smallestValueIsAtBottomEnd\n          posY = @parent.height() - (posY + @height())\n \n      else\n        bh = @parent.height() - 2\n        bw = Math.max bh, Math.round @parent.width() * @parent.ratio()\n        @silentRawSetExtent new Point bw, bh\n        posY = 1\n        posX = Math.max(0, Math.min(\n          Math.round((sliderValue - @parent.start) * @parent.unitSize()),\n          @parent.width() - @width()))\n\n      @silentFullRawMoveTo new Point(posX, posY).add @parent.position()\n\n      @notifyChildrenThatParentHasReLayouted()\n\n  grabsToParentWhenDragged: ->\n    if @parent instanceof SliderMorph\n      return false\n    return super\n\n  nonFloatDragging: (nonFloatDragPositionWithinMorphAtStart, pos, deltaDragFromPreviousCall) ->\n    @offset = pos.subtract nonFloatDragPositionWithinMorphAtStart\n    if world.hand.mouseButton and\n    @visibleBasedOnIsVisibleProperty() and\n    !@isCollapsed()\n      oldButtonPosition = @position()\n      if @parent.autoOrientation() is "vertical"\n        newX = @left()\n        newY = Math.max(\n          Math.min(@offset.y,\n          @parent.bottom() - @height()), @parent.top())\n\n      else\n        newY = @top()\n        newX = Math.max(\n          Math.min(@offset.x,\n          @parent.right() - @width()), @parent.left())\n\n      newPosition = new Point newX, newY\n      if !oldButtonPosition.eq newPosition\n        @fullRawMoveTo newPosition\n        @parent.updateValue()\n  \n  endOfNonFloatDrag: ->  \n    if @state != @STATE_NORMAL\n      @state = @STATE_NORMAL\n      @color = @normalColor.copy()\n      @changed()\n\n  setHiglightedColor: ->\n    if @state != @STATE_HIGHLIGHTED\n      @state = @STATE_HIGHLIGHTED\n      @color = @highlightColor.copy()\n      @changed()\n\n  setNormalColor: ->\n    if @state != @STATE_NORMAL\n      @state = @STATE_NORMAL\n      @color = @normalColor.copy()\n      @changed()\n\n  setPressedColor: ->\n    if @state != @STATE_PRESSED\n      @state = @STATE_PRESSED\n      @color = @pressColor.copy()\n      @changed()\n\n  mouseMove: ->\n    # remember that a drag can start a few pixels after the\n    # mouse button is pressed (because of de-noising), so\n    # only checking for "draggingSomething" is not going to be\n    # enough since we receive a few moves without the "draggingSomething"\n    # being set. So we also check for the "pressed" state.\n    if @state == @STATE_PRESSED or world.hand.draggingSomething()\n      return\n    @setHiglightedColor()\n  \n  #SliderButtonMorph events:\n  mouseEnter: ->\n    if world.hand.draggingSomething()\n      return\n    @setHiglightedColor()\n  \n  mouseLeave: ->\n    if world.hand.draggingSomething()\n      return\n    @setNormalColor()\n  \n  mouseDownLeft: (pos) ->\n    @bringToForeground()\n    @setPressedColor()\n\n  mouseClickLeft: ->\n    @bringToForeground()\n    @setHiglightedColor()\n  \n';