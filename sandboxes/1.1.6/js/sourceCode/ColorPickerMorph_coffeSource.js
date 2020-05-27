// Generated by CoffeeScript 1.12.7
window.ColorPickerMorph_coffeSource = '# Note that the ColorPicker has no "set target..." from\n# the menu.\n\nclass ColorPickerMorph extends Widget\n\n  # pattern: all the children should be declared here\n  # the reason is that when you duplicate a morph\n  # , the duplicated morph needs to have the handles\n  # that will be duplicated. If you don\'t list them\n  # here, then they need to be initialised in the\n  # constructor. But actually they might not be\n  # initialised in the constructor if a "lazy initialisation"\n  # approach is taken. So it\'s good practice\n  # to list them here so they can be duplicated either way.\n  feedback: nil\n  choice: nil\n  colorPalette: nil\n  grayPalette: nil\n\n  constructor: (\n    @choice = (new Color 255, 255, 255)\n    ) ->    \n    super()\n    @appearance = new RectangularAppearance @\n    @color = new Color 255, 255, 255\n    @rawSetExtent new Point 80, 80\n    @buildSubmorphs()\n\n  colloquialName: ->\n    "color picker"\n\n  buildSubmorphs: ->\n    @feedback = new RectangleMorph new Point(20, 20), @choice\n    @colorPalette = new ColorPaletteMorph @feedback, new Point @width(), 50\n    @grayPalette = new GrayPaletteMorph @feedback, new Point @width(), 5\n    @add @colorPalette\n    @add @grayPalette\n    @add @feedback\n    @invalidateLayout()\n\n  iHaveBeenAddedTo: (whereTo, beingDropped) ->\n  \n  getColor: ->\n    @feedback.color\n  \n\n  rawSetExtent: (aPoint) ->\n    super\n    @invalidateLayout()\n\n  doLayout: (newBoundsForThisLayout) ->\n    #if !window.recalculatingLayouts\n    #  debugger\n\n    if !newBoundsForThisLayout?\n      if @desiredExtent?\n        newBoundsForThisLayout = @desiredExtent\n        @desiredExtent = nil\n      else\n        newBoundsForThisLayout = @extent()\n\n      if @desiredPosition?\n        newBoundsForThisLayout = (new Rectangle @desiredPosition).setBoundsWidthAndHeight newBoundsForThisLayout\n        @desiredPosition = nil\n      else\n        newBoundsForThisLayout = (new Rectangle @position()).setBoundsWidthAndHeight newBoundsForThisLayout\n\n    if @isCollapsed()\n      @layoutIsValid = true\n      @notifyChildrenThatParentHasReLayouted()\n      return\n\n    # here we are disabling all the broken\n    # rectangles. The reason is that all the\n    # submorphs of the inspector are within the\n    # bounds of the parent Widget. This means that\n    # if only the parent morph breaks its rectangle\n    # then everything is OK.\n    # Also note that if you attach something else to its\n    # boundary in a way that sticks out, that\'s still\n    # going to be painted and moved OK.\n    trackChanges.push false\n\n    @rawSetBounds newBoundsForThisLayout\n    @colorPalette.fullRawMoveTo @position()\n    @colorPalette.rawSetExtent new Point @width(), Math.round(@height() * 0.625)\n\n    @grayPalette.fullRawMoveTo @colorPalette.bottomLeft()\n    @grayPalette.rawSetExtent new Point @width(), Math.round(@height() * 0.0625)\n\n    x = @grayPalette.left() + Math.floor((@grayPalette.width() - @feedback.width()) / 2)\n    y = @grayPalette.bottom() + Math.floor((@bottom() - @grayPalette.bottom() - @feedback.height()) / 2)\n    @feedback.fullRawMoveTo new Point x, y\n    @feedback.rawSetExtent new Point Math.min(@width(), Math.round(@height() * 0.25)), Math.round(@height() * 0.25)\n\n    trackChanges.pop()\n    @fullChanged()\n\n    @layoutIsValid = true\n    @notifyChildrenThatParentHasReLayouted()\n\n    if AutomatorRecorderAndPlayer? and AutomatorRecorderAndPlayer.state != AutomatorRecorderAndPlayer.IDLE and AutomatorRecorderAndPlayer.alignmentOfMorphIDsMechanism\n      world.alignIDsOfNextMorphsInSystemTests()\n';