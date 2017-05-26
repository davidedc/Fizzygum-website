// Generated by CoffeeScript 1.10.0
window.ErrorsLogViewerMorph_coffeSource = '# ErrorsLogViewerMorph ///////////////////////////////////////////////////\n\nclass ErrorsLogViewerMorph extends WindowMorph\n  # this is so we can create objects from the object class name \n  # (for the deserialization process)\n  namedClasses[@name] = @prototype\n\n  tempPromptEntryField: null\n  defaultContents: ""\n  textMorph: null\n\n  clearButton: null\n  pauseToggle: null\n  okButton: null\n\n  paused: false\n\n  constructor: (@msg, @target, @callback, @defaultContents) ->\n\n    topLeftButton = new HideIconButtonMorph @\n    super "Errors", topLeftButton\n\n  addText: (text) ->\n    if @textMorph.text.length != 0\n      newText = @textMorph.text + "\\n"\n    else\n      newText = ""\n\n    @textMorph.setText newText + text\n\n\n  popUpWithError: (err) ->\n    unless @paused\n      @addText err\n\n    if !@isVisible\n      @show()\n      @bringToForegroud()\n\n\n  buildAndConnectChildren: ->\n    debugger\n    if AutomatorRecorderAndPlayer.state != AutomatorRecorderAndPlayer.IDLE and AutomatorRecorderAndPlayer.alignmentOfMorphIDsMechanism\n      world.alignIDsOfNextMorphsInSystemTests()\n\n    super\n    \n    #@tempPromptEntryField = new TextMorph2 @defaultContents,null,null,null,null,null,new Color(255, 255, 54), 0.5\n    #@tempPromptEntryField.isEditable = true\n    #@add @tempPromptEntryField\n\n\n    @tempPromptEntryField = new ScrollFrameMorph()\n    @tempPromptEntryField.disableDrops()\n    @tempPromptEntryField.contents.disableDrops()\n    @tempPromptEntryField.isTextLineWrapping = true\n    @tempPromptEntryField.color = new Color 255, 255, 255\n\n    @textMorph = new TextMorph @defaultContents\n    @textMorph.isEditable = true\n    @textMorph.enableSelecting()\n\n    @tempPromptEntryField.setContents @textMorph, 2\n    @add @tempPromptEntryField\n\n    # buttons -------------------------------\n    @clearButton = new SimpleButtonMorph true, @, "clearTextPane", (new StringMorph2 "clear").alignCenter()\n    @add @clearButton\n\n\n    pauseButton = new SimpleButtonMorph true, @, "pauseErrors", (new StringMorph2 "pause").alignCenter()\n    unpauseButton = new SimpleButtonMorph true, @, "unpauseErrors", (new StringMorph2 "un-pause").alignCenter()\n    @pauseToggle = new ToggleButtonMorph pauseButton, unpauseButton, if @paused then 1 else 0\n    @add @pauseToggle\n\n    @okButton = new SimpleButtonMorph true, @, "hide", (new StringMorph2 "ok").alignCenter()\n    @add @okButton\n\n\n\n    @layoutSubmorphs()\n\n  pauseErrors: ->\n    @paused = true\n\n  unpauseErrors: ->\n    @paused = false\n\n  clearTextPane: ->\n    @textMorph.setText ""    \n\n  informTarget: ->\n    debugger\n    @target[@callback].call @target, null, @textMorph\n\n  informTargetAndDestroy: ->\n    @informTarget()\n    @fullDestroy()\n\n  layoutSubmorphs: (morphStartingTheChange = null) ->\n    super morphStartingTheChange\n    console.log "fixing the layout of the inspector"\n\n    # here we are disabling all the broken\n    # rectangles. The reason is that all the\n    # submorphs of the inspector are within the\n    # bounds of the parent Morph. This means that\n    # if only the parent morph breaks its rectangle\n    # then everything is OK.\n    # Also note that if you attach something else to its\n    # boundary in a way that sticks out, that\'s still\n    # going to be painted and moved OK.\n    trackChanges.push false\n\n    # label\n    labelLeft = @left() + @padding\n    labelTop = @top() + @padding\n    labelRight = @right() - @padding\n    labelWidth = labelRight - labelLeft\n    labelBottom = labelTop + @label.height() + 2\n\n    eachPaneWidth = Math.floor(@width() / 2) - @padding\n\n\n    mainCanvasWidth = eachPaneWidth\n    b = @bottom() - (2 * @padding) - WorldMorph.preferencesAndSettings.handleSize\n    mainCanvasHeight = b - labelBottom - Math.floor(@padding / 2)\n    mainCanvasBottom = labelBottom + mainCanvasHeight + Math.floor(@padding / 2)\n    mainCanvasLeft = @left() + eachPaneWidth\n\n    if @tempPromptEntryField.parent == @\n      @tempPromptEntryField.fullRawMoveTo new Point labelLeft, labelBottom + Math.floor(@padding / 2)\n      @tempPromptEntryField.rawSetExtent new Point @width() - 2 * @padding, mainCanvasHeight\n\n\n    # buttons -------------------------------\n    \n\n    eachButtonWidth = (@width() - 5* @padding - WorldMorph.preferencesAndSettings.handleSize) / 3\n\n    if @clearButton.parent == @\n      @clearButton.fullRawMoveTo new Point @left() + @padding + 0*(eachButtonWidth + @padding), mainCanvasBottom + @padding\n      @clearButton.rawSetExtent new Point eachButtonWidth, 15\n\n    if @pauseToggle.parent == @\n      @pauseToggle.fullRawMoveTo new Point @left() + @padding + 1*(eachButtonWidth + @padding), mainCanvasBottom + @padding\n      @pauseToggle.rawSetExtent new Point eachButtonWidth, 15\n\n    if @okButton.parent == @\n      @okButton.fullRawMoveTo new Point @left() + @padding + 2*(eachButtonWidth + @padding), mainCanvasBottom + @padding\n      @okButton.rawSetExtent new Point eachButtonWidth, 15\n\n    # ----------------------------------------------\n\n\n    trackChanges.pop()\n    @changed()\n    if AutomatorRecorderAndPlayer.state != AutomatorRecorderAndPlayer.IDLE and AutomatorRecorderAndPlayer.alignmentOfMorphIDsMechanism\n      world.alignIDsOfNextMorphsInSystemTests()\n\n';
