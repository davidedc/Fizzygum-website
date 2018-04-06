// Generated by CoffeeScript 1.12.7
window.WindowWdgt_coffeSource = '# REQUIRES WindowContentsPlaceholderText\n\n# TODO: when floating, windows should really be able to\n# accommodate any extent always, because really windows should\n# be stackable and dockable in any place...\n# ...and that\'s now how we do it now, for example a window\n# with a clock right now keeps ratio...\n# Only when being part of other layouts e.g. stacks the\n# windows should keep a ratio etc...\n# So I\'m inclined to think that a window should do what the\n# StretchableWidgetContainerWdgt does...\n\n# TODO: this is such a special version of SimpleVerticalStackPanelWdgt\n# that really it seems like this extension is misleading...\n\nclass WindowWdgt extends SimpleVerticalStackPanelWdgt\n\n  # TODO we already have the concept of "droplet" widget\n  # so probably we should re-use that. The current drop\n  # area management seems a little byzantine...\n\n  label: nil\n  closeButton: nil\n  editButton: nil\n  collapseUncollapseSwitchButton: nil\n  labelContent: nil\n  resizer: nil\n  padding: nil\n  contents: nil\n  titlebarBackground: nil\n  contentNeverSetInPlaceYet: true\n  # used to avoid recursively re-entering the\n  # adjustContentsBounds function\n  _adjustingContentsBounds: false\n  internal: false\n  defaultContents: nil\n  reInflating: false\n\n  internalExternalSwitchButton: nil\n  alwaysShowInternalExternalButton: nil\n\n  # TODO passing the @labelContent doesn\'t quite work, when\n  # you add a widget to the window it overwrites the\n  # title which means that this one parameter passed in\n  # the constructor has no effect\n  constructor: (@labelContent = "my window", @closeButton, @contents, @internal = false, @alwaysShowInternalExternalButton = false) ->\n    super nil, nil, 40, true\n\n    if @internal\n      @appearance = new RectangularAppearance @\n    else\n      @appearance = new BoxyAppearance @\n\n    @strokeColor = new Color 125,125,125\n    @tight = true\n\n    @defaultContents = new WindowContentsPlaceholderText()\n    if !@contents?\n      @contents = @defaultContents\n\n    @padding = 5\n    @color = new Color 248, 248, 248\n    @buildAndConnectChildren()\n\n    if @contents == @defaultContents\n      @setEmptyWindowLabel()\n    else\n      @disableDrops()\n      # TODO there is a duplicate of this down below\n      titleToBeSet = @contents.colloquialName()\n      if titleToBeSet == "window"\n        titleToBeSet = "window with another " + titleToBeSet\n      if titleToBeSet == "internal window"\n        titleToBeSet = "window with an " + titleToBeSet\n      @label.setText titleToBeSet\n\n    @rawSetExtent new Point 300, 300\n\n\n  # in general, windows just create a reference of themselves and\n  # that is it. However, windows containing a ScriptWdgt create\n  # a special type of reference that has a slightly different icon\n  # and when double-clicked actually runs the script rather than\n  # bringing up the script \n  createReference: (referenceName, placeToDropItIn) ->\n    # this function can also be called as a callback\n    # of a trigger, in which case the first parameter\n    # here is a menuItem. We take that parameter away\n    # in that case.\n    if referenceName? and typeof(referenceName) != "string"\n      referenceName = nil\n      placeToDropItIn = world\n\n    if @contents? and (@contents instanceof ScriptWdgt)\n      morphToAdd = new IconicDesktopSystemScriptShortcutWdgt @, referenceName\n      # this "add" is going to try to position the reference\n      # in some smart way (i.e. according to a grid)\n      placeToDropItIn.add morphToAdd\n      morphToAdd.setExtent new Point 75, 75\n      morphToAdd.fullChanged()\n      @bringToForeground()\n    else\n      super\n\n\n  makeInternal: ->\n    if !@internal\n      @internal = true\n      @setAppearanceAndColorOfTitleBackground()\n\n  makeExternal: ->\n    if @internal\n      @internal = false\n      # in case the internal window was part of an uneditable\n      # document, then it was set to lock to the panel so it\n      # couldn\'t be dragged. But we have to change that now since\n      # we ought to be free on the desktop\n      @unlockFromPanels()\n      @setAppearanceAndColorOfTitleBackground()\n\n      previousParent = @parent\n      world.add @\n\n      @contents?.holderWindowMadeIntoExternal?()\n\n      # make it jump out a little, but still, fit it\n      # in the world\n      if previousParent != world\n        @fullRawMoveTo @position().add new Point 10, 10\n        @fullRawMoveWithin world\n        @rememberFractionalSituationInHoldingPanel()\n\n  setTitle: (newTitle) ->\n    @label.setText @contents.colloquialName() + ": " + newTitle\n\n  setTitleWithoutPrependedContentName: (newTitle) ->\n    @label.setText newTitle\n\n  representativeIcon: ->\n    if @contents == @defaultContents\n      return super\n    else\n      return @contents.representativeIcon()\n\n  closeFromWindowBar: ->\n    @contents?.closeFromContainerWindow @\n\n  contentsRecursivelyCanSetHeightFreely: ->\n    if !(@contents instanceof WindowWdgt)\n      return (@contents.layoutSpecDetails.canSetHeightFreely and !@contents.isCollapsed()) and !@reInflating\n    return @contents.contentsRecursivelyCanSetHeightFreely()\n\n  recursivelyAttachedAsFreeFloating: ->\n    if @layoutSpec == LayoutSpec.ATTACHEDAS_FREEFLOATING\n      return true\n\n    if @parent?\n      if @parent instanceof WindowWdgt\n        return @parent.recursivelyAttachedAsFreeFloating()\n\n    return false\n\n\n  rejectsBeingDropped: ->\n    return !@internal\n\n  setEmptyWindowLabel: ->\n    if @internal\n      @label.setText "empty internal window"\n    else\n      @label.setText "empty window"\n\n  colloquialName: ->\n    if @internal\n      return "internal window"\n    else\n      return "window"\n\n  add: (aMorph, position = nil, layoutSpec, beingDropped, notContent) ->\n    unless notContent or (aMorph instanceof CaretMorph) or (aMorph instanceof HandleMorph)\n      @contentNeverSetInPlaceYet = true\n      titleToBeSet = aMorph.colloquialName()\n      if titleToBeSet == "window"\n        titleToBeSet = "window with another " + titleToBeSet\n      if titleToBeSet == "internal window"\n        titleToBeSet = "window with an " + titleToBeSet\n      @label.setText titleToBeSet\n      @removeChild @contents\n      @contents = aMorph\n      @adjustContentsBounds()\n      super aMorph, position, LayoutSpec.ATTACHEDAS_WINDOW_CONTENT, beingDropped\n    else\n      super aMorph, position, LayoutSpec.ATTACHEDAS_FREEFLOATING, beingDropped\n    @resizer?.moveInFrontOfSiblings()\n\n  childBeingDestroyed: (child) ->\n    if child == @contents\n      @resetToDefaultContents()\n\n  childBeingPickedUp: (child) ->\n    if child == @contents\n      @resetToDefaultContents()\n\n  childBeingClosed: (child) ->\n    if child == @contents\n      @resetToDefaultContents()\n\n  childBeingCollapsed: (child) ->\n    if child == @contents\n      @widthWhenUnCollapsed = @width()\n      @contentsExtentWhenCollapsed = @contents.extent()\n      @extentWhenCollapsed = @extent()\n\n      @editButton?.destroy()\n      @editButton = nil\n\n      @internalExternalSwitchButton?.destroy()\n      @internalExternalSwitchButton = nil\n\n  childBeingUnCollapsed: (child) ->\n    if child == @contents\n      @widthWhenCollapsed = @width()\n\n    @createAndAddEditButton()\n    @createAndAddInternalExternalSwitchButton()\n\n  childCollapsed: (child) ->\n    if child == @contents\n      if @widthWhenCollapsed?\n        @rawSetWidth @widthWhenCollapsed\n      @adjustContentsBounds()\n      @refreshScrollPanelWdgtOrVerticalStackIfIamInIt()\n\n  childUnCollapsed: (child) ->\n    if child == @contents\n      @reInflating = true\n      @rawSetExtent @extentWhenCollapsed\n      @contents.rawSetExtent @contentsExtentWhenCollapsed\n      if @widthWhenUnCollapsed?\n        @rawSetWidth @widthWhenUnCollapsed\n      @adjustContentsBounds()\n      @reInflating = false\n      @rememberFractionalSituationInHoldingPanel()\n      @refreshScrollPanelWdgtOrVerticalStackIfIamInIt()\n\n  resetToDefaultContents: ->\n    @enableDrops()\n    @contents = @defaultContents\n    @buildAndConnectChildren()\n    @setEmptyWindowLabel()\n    if @recursivelyAttachedAsFreeFloating()\n      @rawSetExtent new Point 300, 300\n\n  aboutToDrop: ->\n    @removeChild @contents\n\n  justDropped: (whereIn) ->\n    debugger\n    super\n    @contents?.holderWindowJustDropped? whereIn\n\n  justBeenGrabbed: (whereFrom) ->\n    @contents?.holderWindowJustBeenGrabbed? whereFrom\n\n  reactToDropOf: (theWidget) ->\n    @contents = theWidget\n    super\n    @disableDrops()\n    @buildAndConnectChildren()\n\n  setAppearanceAndColorOfTitleBackground: ->\n    if @internal\n      @titlebarBackground.appearance = new RectangularAppearance @titlebarBackground\n    else\n      @titlebarBackground.appearance = new BoxyAppearance @titlebarBackground\n\n    if @internal\n      @titlebarBackground.setColor WorldMorph.preferencesAndSettings.internalWindowBarBackgroundColor\n      @titlebarBackground.strokeColor = WorldMorph.preferencesAndSettings.internalWindowBarStrokeColor\n    else\n      @titlebarBackground.setColor WorldMorph.preferencesAndSettings.externalWindowBarBackgroundColor\n      @titlebarBackground.strokeColor = WorldMorph.preferencesAndSettings.externalWindowBarStrokeColor\n\n\n  buildTitlebarBackground: ->\n    if @titlebarBackground?\n      @titlebarBackground.fullDestroy()\n\n    # TODO we should really just instantiate a Widget,\n    # and give it the shape, there is no reason to create\n    # the dedicated shape morph and then change the appearance\n    # as the window changes from internal to external and vice versa\n    # HOWEVER a bunch of tests would fail if I do the proper\n    # thing so we are doing this for the time being.\n    if @internal\n      @titlebarBackground = new RectangleMorph()\n    else\n      @titlebarBackground = new BoxMorph()\n\n    @setAppearanceAndColorOfTitleBackground()\n    @add @titlebarBackground, nil, nil, nil, true\n  \n  buildAndConnectChildren: ->\n\n    if !@titlebarBackground?\n      @buildTitlebarBackground()\n\n    # label\n    @label?.fullDestroy()\n    @label = new StringMorph2 @labelContent, WorldMorph.preferencesAndSettings.titleBarTextFontSize\n\n    # as of March 2018, Safari 10.1.1 on OSX 10.12.5 :\n    # safari\'s rendering of bright text on dark background is atrocious\n    # so we have to force bold style in the window bars\n    if /^((?!chrome|android).)*safari/i.test navigator.userAgent\n      @label.isBold = true\n    else\n      @label.isBold = WorldMorph.preferencesAndSettings.titleBarBoldText\n\n    @label.color = new Color 255, 255, 255\n    @add @label, nil, nil, nil, true\n\n    # upper-left button, often a close button\n    # but it can be anything\n    if !@closeButton?\n      @closeButton = new CloseIconButtonMorph()\n    @add @closeButton, nil, nil, nil, true\n\n\n    if !@collapseUncollapseSwitchButton?\n      collapseButton = new CollapseIconButtonMorph()\n      uncollapseButton = new UncollapseIconButtonMorph()\n      @collapseUncollapseSwitchButton = new SwitchButtonMorph [collapseButton, uncollapseButton]\n    @add @collapseUncollapseSwitchButton, nil, nil, nil, true\n\n\n    @createAndAddInternalExternalSwitchButton()\n    @createAndAddEditButton()\n\n    @add @contents\n\n    if !@resizer?\n      @resizer = new HandleMorph @\n\n  createAndAddInternalExternalSwitchButton: ->\n    if (@contents?.providesAmenitiesForEditing or @alwaysShowInternalExternalButton) and !@internalExternalSwitchButton?\n      externalButton = new ExternalIconButtonWdgt()\n      internalButton = new InternalIconButtonWdgt()\n      if @internal\n        listOfButtons = [internalButton, externalButton]\n      else\n        listOfButtons = [externalButton, internalButton]\n      @internalExternalSwitchButton = new SwitchButtonMorph listOfButtons\n      @add @internalExternalSwitchButton, nil, nil, nil, true\n\n  makePencilYellow: ->\n      # TODO assigning to color_normal is not enough\n      # there should be a way to do these two lines with one line\n      @editButton?.color_normal = new Color 248, 188, 58\n      @editButton?.setColor new Color 248, 188, 58\n      @editButton?.changed()\n\n  makePencilClear: ->\n      # TODO assigning to color_normal is not enough\n      # there should be a way to do these two lines with one line\n      @editButton?.color_normal = new Color 245, 244, 245\n      @editButton?.setColor new Color 245, 244, 245\n      @editButton?.changed()\n\n  createAndAddEditButton: ->\n    if @contents?.providesAmenitiesForEditing and !@editButton?\n      @editButton = new EditIconButtonWdgt @\n      @add @editButton, nil, nil, nil, true\n\n      if @contents.dragsDropsAndEditingEnabled\n        @makePencilYellow()\n      else\n        @makePencilClear()\n\n  initialiseDefaultWindowContentLayoutSpec: ->\n    super\n    @layoutSpecDetails.canSetHeightFreely = false\n\n  adjustContentsBounds: ->\n    # avoid recursively re-entering this function\n    if @_adjustingContentsBounds then return else @_adjustingContentsBounds = true\n\n    totalPadding = 2 * @padding\n    closeIconSize = 16\n\n\n\n\n    # close button\n    if @closeButton? and @closeButton.parent == @\n      buttonBounds = new Rectangle new Point @left() + @padding, @top() + @padding\n      buttonBounds = buttonBounds.setBoundsWidthAndHeight closeIconSize, closeIconSize\n      @closeButton.doLayout buttonBounds\n\n    # collapse/uncollapse button\n    if @collapseUncollapseSwitchButton? and @collapseUncollapseSwitchButton.parent == @\n      buttonBounds = new Rectangle new Point @left() + closeIconSize + 2 * @padding, @top() + @padding\n      buttonBounds = buttonBounds.setBoundsWidthAndHeight closeIconSize, closeIconSize\n      @collapseUncollapseSwitchButton.doLayout buttonBounds\n\n\n\n    stackHeight = 0\n\n    if @contents? and !@contents.collapsed\n      if @contents.layoutSpec != LayoutSpec.ATTACHEDAS_WINDOW_CONTENT\n        @contents.initialiseDefaultWindowContentLayoutSpec()\n        @contents.setLayoutSpec LayoutSpec.ATTACHEDAS_WINDOW_CONTENT\n\n      if @contentNeverSetInPlaceYet\n        # in this case the contents has just been added\n\n        if @contents.layoutSpecDetails.preferredStartingWidth == PreferredSize.THIS_ONE_I_HAVE_NOW\n          recommendedElementWidth = @contents.width()\n          if @recursivelyAttachedAsFreeFloating()\n            windowWidth = recommendedElementWidth + @padding * 2\n          else\n            windowWidth = Math.min @width(), recommendedElementWidth + @padding * 2\n          @rawSetWidth windowWidth\n        else if @contents.layoutSpecDetails.preferredStartingWidth == PreferredSize.DONT_MIND\n          recommendedElementWidth = @width()  - 2 * @padding\n        else\n          recommendedElementWidth = @contents.layoutSpecDetails.preferredStartingWidth\n          if @recursivelyAttachedAsFreeFloating()\n            windowWidth = recommendedElementWidth + @padding * 2\n          else\n            windowWidth = Math.min @width(), recommendedElementWidth + @padding * 2\n          @rawSetWidth windowWidth\n\n        @contents.layoutSpecDetails.rememberInitialDimensions @contents, @\n\n\n      else\n        # the content was already there\n        recommendedElementWidth = @contents.layoutSpecDetails.getWidthInStack()\n\n      if @contents.layoutSpecDetails.resizerCanOverlapContents\n        partOfHeightUsedUp = Math.round (closeIconSize + @padding + @padding) + 2 * @padding\n      else\n        partOfHeightUsedUp = Math.round (closeIconSize + @padding + @padding) + 3 * @padding + WorldMorph.preferencesAndSettings.handleSize\n\n      # this re-layouts each widget to fit the width.\n      if @contentNeverSetInPlaceYet\n        # in this case the contents has just been added\n        if @contents.layoutSpecDetails.preferredStartingHeight == PreferredSize.THIS_ONE_I_HAVE_NOW\n          desiredHeight = @contents.height()\n          if !@recursivelyAttachedAsFreeFloating()\n            desiredHeight = Math.min desiredHeight, @height() - partOfHeightUsedUp\n          @contents.rawSetWidth recommendedElementWidth\n          @rawSetWidth windowWidth\n          @contents.rawSetHeight desiredHeight\n        else if @contents.layoutSpecDetails.preferredStartingHeight == PreferredSize.DONT_MIND\n          @contents.rawSetWidth recommendedElementWidth\n          desiredHeight = Math.round @height() - partOfHeightUsedUp\n          @contents.rawSetHeight desiredHeight\n        else\n          @contents.rawSetWidthSizeHeightAccordingly recommendedElementWidth\n          desiredHeight = @contents.height()\n\n        @contentNeverSetInPlaceYet = false\n      else\n        # the content was already there\n        @contents.rawSetWidthSizeHeightAccordingly recommendedElementWidth\n        desiredHeight = @contents.height()\n\n        if @contentsRecursivelyCanSetHeightFreely()\n          desiredHeight = Math.round @height() - partOfHeightUsedUp\n          @contents.rawSetHeight desiredHeight\n\n      # the SimplePlainTextWdgt just needs this to be different from null\n      # while the TextMorph actually uses this number\n      if (@contents instanceof TextMorph) or (@contents instanceof SimplePlainTextWdgt)\n        @contents.maxTextWidth = recommendedElementWidth\n\n      leftPosition = @left() + Math.floor (@width() - recommendedElementWidth) / 2\n\n      @contents.fullRawMoveTo new Point leftPosition, @top() + (closeIconSize + @padding + @padding) + @padding\n      stackHeight += desiredHeight\n\n    if @contents? and @contents.collapsed\n      partOfHeightUsedUp = Math.round closeIconSize + @padding + @padding\n\n\n    newHeight = stackHeight + partOfHeightUsedUp\n\n    @rawSetHeight newHeight\n\n    @titlebarBackground.rawSetExtent (new Point @width(), closeIconSize + 2 * @padding).subtract new Point 2,2\n    @titlebarBackground.fullRawMoveTo @position().add new Point 1,1\n\n    if @width() < 4 * (closeIconSize + @padding) + @padding\n      @editButton?.collapse()\n    else\n      @editButton?.unCollapse()\n\n    if @width() < 3 * (closeIconSize + @padding) + @padding\n      @internalExternalSwitchButton?.collapse()\n    else\n      @internalExternalSwitchButton?.unCollapse()\n\n    # label\n    if @label? and @label.parent == @\n      labelLeft = @left() + @padding + 2 * (closeIconSize + @padding)\n      labelTop = @top() + @padding\n      labelRight = @right() - @padding\n      if @editButton? and !@editButton.isCollapsed()\n        labelRight -= 1 * (closeIconSize + @padding)\n      if @internalExternalSwitchButton? and !@internalExternalSwitchButton.isCollapsed()\n        labelRight -= 1 * (closeIconSize + @padding)\n      labelWidth = labelRight - labelLeft\n\n      labelBounds = new Rectangle new Point labelLeft, labelTop\n      labelBounds = labelBounds.setBoundsWidthAndHeight labelWidth, WorldMorph.preferencesAndSettings.titleBarTextHeight\n      @label.rawSetBounds labelBounds\n\n    # edit button\n    if @editButton? and !@editButton.isCollapsed() and @editButton.parent == @\n      buttonBounds = new Rectangle new Point @right() - 2 * (closeIconSize + @padding), @top() + @padding\n      buttonBounds = buttonBounds.setBoundsWidthAndHeight closeIconSize, closeIconSize\n      @editButton.doLayout buttonBounds\n\n    # internal/external button\n    if @internalExternalSwitchButton? and !@internalExternalSwitchButton.isCollapsed() and @internalExternalSwitchButton.parent == @\n      buttonBounds = new Rectangle new Point @right() - 1 * (closeIconSize + @padding), @top() + @padding\n      buttonBounds = buttonBounds.setBoundsWidthAndHeight closeIconSize, closeIconSize\n      @internalExternalSwitchButton.doLayout buttonBounds\n\n\n\n    @resizer?.silentUpdateResizerHandlePosition()\n\n    @_adjustingContentsBounds = false\n';
