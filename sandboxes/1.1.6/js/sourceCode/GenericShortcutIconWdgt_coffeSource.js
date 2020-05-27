// Generated by CoffeeScript 1.12.7
window.GenericShortcutIconWdgt_coffeSource = '# REQUIRES ChildrenStainerMixin\n\nclass GenericShortcutIconWdgt extends Widget\n\n  @augmentWith ChildrenStainerMixin, @name\n\n  referenceArrowIcon: nil\n\n  constructor: (@icon) ->\n    super()\n\n\n    if !@icon?\n      @icon = new SimpleDropletWdgt "icon"\n    @rawSetExtent new Point 95, 95\n    @add @icon\n\n    @referenceArrowIcon = new ShortcutArrowIconWdgt()\n    @add @referenceArrowIcon\n\n    # update layout\n    @invalidateLayout()\n\n  widthWithoutSpacing: ->\n    Math.min @width(), @height()\n\n  rawResizeToWithoutSpacing: ->\n    @rawSetExtent new Point @widthWithoutSpacing(), @widthWithoutSpacing()\n    @invalidateLayout()\n\n  initialiseDefaultWindowContentLayoutSpec: ->\n    super\n    @layoutSpecDetails.canSetHeightFreely = false\n\n  rawSetWidthSizeHeightAccordingly: (newWidth) ->\n    @rawResizeToWithoutSpacing()\n    @rawSetExtent new Point newWidth, newWidth\n    @invalidateLayout()\n\n  doLayout: (newBoundsForThisLayout) ->\n    #if !window.recalculatingLayouts\n    #  debugger\n\n    if !newBoundsForThisLayout?\n      if @desiredExtent?\n        newBoundsForThisLayout = @desiredExtent\n        @desiredExtent = nil\n      else\n        newBoundsForThisLayout = @extent()\n\n      if @desiredPosition?\n        newBoundsForThisLayout = (new Rectangle @desiredPosition).setBoundsWidthAndHeight newBoundsForThisLayout\n        @desiredPosition = nil\n      else\n        newBoundsForThisLayout = (new Rectangle @position()).setBoundsWidthAndHeight newBoundsForThisLayout\n\n    if @isCollapsed()\n      @layoutIsValid = true\n      @notifyChildrenThatParentHasReLayouted()\n      return\n\n    @rawSetBounds newBoundsForThisLayout\n\n    # here we are disabling all the broken\n    # rectangles. The reason is that all the\n    # submorphs of the inspector are within the\n    # bounds of the parent Widget. This means that\n    # if only the parent morph breaks its rectangle\n    # then everything is OK.\n    # Also note that if you attach something else to its\n    # boundary in a way that sticks out, that\'s still\n    # going to be painted and moved OK.\n    trackChanges.push false\n\n    height = @height()\n    width = @width()\n\n    squareDim = Math.min width, height\n\n     # p0 is the origin, the origin being in the bottom-left corner\n    p0 = @topLeft()\n\n    # now the origin is in the middle of the widget\n    p0 = p0.add new Point width/2, height/2\n    \n    # now the origin is in the top left corner of the\n    # square centered in the morph\n    p0 = p0.subtract new Point squareDim/2, squareDim/2\n\n    @icon.setExtent (new Point squareDim, squareDim).round()\n    @icon.fullRawMoveTo p0.round()\n\n\n    @referenceArrowIcon.setExtent (new Point squareDim*3/10, squareDim*3/10).round()\n    @referenceArrowIcon.fullRawMoveTo (p0.add new Point 0, squareDim*7/10).round()\n\n\n    trackChanges.pop()\n    @fullChanged()\n\n    @layoutIsValid = true\n    @notifyChildrenThatParentHasReLayouted()\n\n    if AutomatorRecorderAndPlayer? and AutomatorRecorderAndPlayer.state != AutomatorRecorderAndPlayer.IDLE and AutomatorRecorderAndPlayer.alignmentOfMorphIDsMechanism\n      world.alignIDsOfNextMorphsInSystemTests()';