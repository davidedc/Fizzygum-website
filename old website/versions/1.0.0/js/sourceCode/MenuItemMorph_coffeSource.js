// Generated by CoffeeScript 1.10.0
window.MenuItemMorph_coffeSource = '# MenuItemMorph ///////////////////////////////////////////////////////\n\n# I automatically determine my bounds\n\nclass MenuItemMorph extends TriggerMorph\n  # this is so we can create objects from the object class name \n  # (for the deserialization process)\n  namedClasses[@name] = @prototype\n\n  # labelString can also be a Morph or a Canvas or a tuple: [icon, string]\n  constructor: (closesUnpinnedMenus, target, action, labelString, fontSize, fontStyle, centered, environment, morphEnv, hint, color, bold, italic, doubleClickAction, argumentToAction1, argumentToAction2, representsAMorph) ->\n    #console.log "menuitem constructing"\n    super closesUnpinnedMenus, target, action, labelString, fontSize, fontStyle, centered, environment, morphEnv, hint, color, bold, italic, doubleClickAction, argumentToAction1, argumentToAction2, representsAMorph \n\n  getTextDescription: ->\n    if @textDescription?\n      return @textDescription + " (adhoc description of menu item)"\n    if @labelString\n      textWithoutLocationOrInstanceNo = @labelString.replace /\\[\\d*@\\d*[ ]*\\|[ ]*\\d*@\\d*\\]/, ""\n      textWithoutLocationOrInstanceNo = textWithoutLocationOrInstanceNo.replace /#\\d*/, ""\n      return textWithoutLocationOrInstanceNo + " (text in button)"\n    else\n      return super()\n  \n  # in theory this would be the right thing to do\n  # but a bunch of tests break and it\'s not worth it\n  # as we are going to remake the whole layout system anyways\n  #reLayout: ->\n  #  @label.setExtent @extent().subtract (@label.bounds.origin.subtract @.bounds.origin)\n\n  createLabel: ->\n    # console.log "menuitem createLabel"\n    if @label?\n      @label = @label.destroy()\n\n    if isString @labelString\n      @label = @createLabelString @labelString\n    else if @labelString instanceof Array      \n      # assume its pattern is: [icon, string] \n      @label = new Morph()\n      @label.alpha = 0 # transparent\n\n      icon = @createIcon @labelString[0]\n      @label.add icon\n      lbl = @createLabelString @labelString[1]\n      @label.add lbl\n\n      lbl.fullRawMoveCenterTo icon.center()\n      lbl.fullRawMoveLeftSideTo icon.right() + 4\n      @label.rawSetBounds icon.boundingBox().merge lbl.boundingBox()\n    else # assume it\'s either a Morph or a Canvas\n      @label = @createIcon @labelString\n\n    @add @label\n  \n    w = @width()\n    @silentRawSetExtent @label.extent().add new Point 8, 0\n    @silentRawSetWidth w\n    np = @position().add new Point 4, 0\n    @label.silentFullRawMoveTo np\n  \n\n  createIcon: (source) ->\n    # source can be either a Morph or an HTMLCanvasElement\n    icon = new Morph()\n    icon.backBuffer = (if source instanceof Morph then source.fullImage() else source)\n    icon.backBufferContext = icon.backBuffer.getContext "2d"\n\n    # adjust shadow dimensions\n    if source instanceof Morph and source.getShadowMorph()\n      src = icon.backBuffer\n      icon.backBuffer = newCanvas(\n        source.fullBounds().extent().subtract(\n          @shadowBlur * ((if WorldMorph.preferencesAndSettings.useBlurredShadows then 1 else 2))).scaleBy pixelRatio)\n      icon.backBufferContext = icon.backBuffer.getContext "2d"\n      icon.backBufferContext.drawImage src, 0, 0\n\n    icon.silentRawSetWidth icon.backBuffer.width\n    icon.silentRawSetHeight icon.backBuffer.height\n    icon\n\n  createLabelString: (string) ->\n    # console.log "menuitem createLabelString"\n    lbl = new TextMorph string, @fontSize, @fontStyle\n    lbl.setColor @labelColor\n    lbl  \n\n  # MenuItemMorph events:\n  mouseEnter: ->\n    #console.log "@target: " + @target + " @morphEnv: " + @morphEnv\n    \n    # this could be a way to catch menu entries that should cause\n    # an highlighting but don\'t\n    #if @labelString.indexOf("a ") == 0 and !@representsAMorph\n    #  debugger\n\n    if @representsAMorph\n      morphToBeHighlighted = null\n      if @argumentToAction1?\n        # this first case handles when you pick a morph\n        # as a target\n        morphToBeHighlighted = @argumentToAction1\n      else\n        # this second case handles when you attach to a morph\n        morphToBeHighlighted = @target\n      morphToBeHighlighted.turnOnHighlight()\n    unless @isListItem()\n      @state = @STATE_HIGHLIGHTED\n      @changed()\n    if @hint\n      @startCountdownForBubbleHelp @hint\n  \n  mouseLeave: ->\n    if @representsAMorph\n      morphToBeHighlighted = null\n      if @argumentToAction1?\n        # this first case handles when you pick a morph\n        # as a target\n        morphToBeHighlighted = @argumentToAction1\n      else\n        # this second case handles when you attach to a morph\n        morphToBeHighlighted = @target\n      morphToBeHighlighted.turnOffHighlight()\n    unless @isListItem()\n      @state = @STATE_NORMAL\n      @changed()\n    world.hand.destroyTemporaries()  if @hint\n  \n  mouseDownLeft: (pos) ->\n    if @isListItem()\n      @parent.unselectAllItems()\n      @escalateEvent "mouseDownLeft", pos\n    @state = @STATE_PRESSED\n    @changed()\n    super\n  \n  isListItem: ->\n    return @parent.isListContents  if @parent\n    false\n  \n  isSelectedListItem: ->\n    return @state is @STATE_PRESSED if @isListItem()\n    false\n';