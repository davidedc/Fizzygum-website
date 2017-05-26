// Generated by CoffeeScript 1.10.0
window.MenuMorph_coffeSource = '# MenuMorph ///////////////////////////////////////////////////////////\n\nclass MenuMorph extends BoxMorph\n  # this is so we can create objects from the object class name \n  # (for the deserialization process)\n  namedClasses[@name] = @prototype\n\n  target: null\n  title: null\n  environment: null\n  fontSize: null\n  items: null\n  label: null\n  isListContents: false\n  killThisMenuIfClickOnDescendantsTriggers: true\n  killThisMenuIfClickOutsideDescendants: true\n  tempPromptEntryField: null\n\n  constructor: (@isListContents = false, @target, @killThisMenuIfClickOutsideDescendants = true, @killThisMenuIfClickOnDescendantsTriggers = true, @title = null, @environment = null, @fontSize = null) ->\n    # console.log "menu constructor"\n    @items = []\n    # console.log "menu super"\n    if AutomatorRecorderAndPlayer.state != AutomatorRecorderAndPlayer.IDLE and AutomatorRecorderAndPlayer.alignmentOfMorphIDsMechanism\n      world.alignIDsOfNextMorphsInSystemTests()\n    if !@isListContents\n      if @killThisMenuIfClickOutsideDescendants\n        @onClickOutsideMeOrAnyOfMyChildren "destroy"\n    super()\n\n    if !@isListContents\n      world.freshlyCreatedMenus.push @\n      world.openMenus.push @\n    # important not to traverse all the children for stepping through, because\n    # there could be a lot of entries for example in the inspector the number\n    # of properties of an object - there could be a 100 of those and we don\'t\n    # want to traverse them all. Setting step to null (as opposed to nop)\n    # achieves that.      \n\n  propagateKillMenus: ->\n    if @killThisMenuIfClickOnDescendantsTriggers\n      if @parent?\n        @parent.propagateKillMenus()\n      @markForDestruction()\n\n  isPinned: ->\n    return !(@killThisMenuIfClickOnDescendantsTriggers or @killThisMenuIfClickOutsideDescendants)\n\n  pin: ->\n    @killThisMenuIfClickOnDescendantsTriggers = false\n    @killThisMenuIfClickOutsideDescendants = false\n    @onClickOutsideMeOrAnyOfMyChildren null\n    world.add @\n\n  # StringMorph menus:\n  developersMenu: ->\n    menu = super()\n    menu.addLine()\n    menu.addItem "pin", false, @, "pin"\n    menu\n  \n  addItem: (\n      labelString,\n      closesUnpinnedMenus = true,\n      target,\n      action,\n      hint,\n      color,\n      bold = false,\n      italic = false,\n      doubleClickAction, # optional, when used as list contents\n      argumentToAction1,\n      argumentToAction2,\n      representsAMorph = false\n      ) ->\n    # labelString is normally a single-line string. But it can also be one\n    # of the following:\n    #     * a multi-line string (containing line breaks)\n    #     * an icon (either a Morph or a Canvas)\n    #     * a tuple of format: [icon, string]\n    @items.push [\n      localize(labelString or "close"),\n      closesUnpinnedMenus,\n      target,\n      action,\n      hint,\n      color,\n      bold,\n      italic,\n      doubleClickAction,\n      argumentToAction1,\n      argumentToAction2,\n      representsAMorph\n    ]\n\n  prependItem: (\n      labelString,\n      closesUnpinnedMenus,\n      target,\n      action,\n      hint,\n      color,\n      bold = false,\n      italic = false,\n      doubleClickAction, # optional, when used as list contents\n      argumentToAction1,\n      argumentToAction2,\n      representsAMorph\n      ) ->\n    # labelString is normally a single-line string. But it can also be one\n    # of the following:\n    #     * a multi-line string (containing line breaks)\n    #     * an icon (either a Morph or a Canvas)\n    #     * a tuple of format: [icon, string]\n    @items.unshift [\n      localize(labelString or "close"),\n      closesUnpinnedMenus,\n      target,\n      action,\n      hint,\n      color,\n      bold,\n      italic,\n      doubleClickAction,\n      argumentToAction1,\n      argumentToAction2,\n      representsAMorph\n    ]\n  \n\n  addLine: (width) ->\n    @items.push [0, width or 1]\n\n  prependLine: (width) ->\n    @items.unshift [0, width or 1]\n  \n  createLabel: ->\n    # console.log "menu create label"\n    if @label?\n      @label = @label.destroy()\n    text = new TextMorph(localize(@title),\n      @fontSize or WorldMorph.preferencesAndSettings.menuFontSize,\n      WorldMorph.preferencesAndSettings.menuFontName, true, false, "center")\n    text.alignment = "center"\n    text.color = new Color 255, 255, 255\n    text.backgroundColor = new Color 60,60,60\n\n    @label = new BoxMorph 3\n    @label.add text\n    if WorldMorph.preferencesAndSettings.isFlat\n      @label.cornerRadius = 0\n    @label.color = new Color 60,60,60\n    @label.rawSetExtent text.extent().add 2\n    @label.text = text\n\n  reLayout: ->\n    # console.log "menu update rendering"\n    super()\n\n    # no point in breaking a rectangle for each menu entry,\n    # let\'s hold on the broken rects and then issue\n    # a fullChanged() at the end.\n    trackChanges.push false\n\n    isLine = false\n    @fullDestroyChildren()\n\n    unless @isListContents\n      @cornerRadius = if WorldMorph.preferencesAndSettings.isFlat then 0 else 5\n    @color = new Color 255, 255, 255\n    @silentRawSetExtent new Point 0, 0\n    y = @top()\n    x = @left() + 2\n    @notifyChildrenThatParentHasReLayouted()\n\n\n    unless @isListContents\n      if @title\n        @createLabel()\n        @label.fullRawMoveTo @position().add 2\n        @add @label\n        y = @label.bottom()\n      else\n        y = @top()\n    y += 1\n\n    # note that menus can contain:\n    # strings, colorpickers,\n    # sliders, menuItems (which are buttons)\n    # and divider lines.\n    # console.log "menu @items.length " + @items.length\n    @items.forEach (tuple) =>\n      isLine = false\n      # string, color picker and slider\n      if tuple instanceof StringFieldMorph or\n        tuple instanceof ColorPickerMorph or\n        tuple instanceof SliderMorph\n          item = tuple\n      # line. A thin Morph is used\n      # to draw the line.\n      else if tuple[0] is 0\n        isLine = true\n        item = new RectangleMorph()\n        item.setMinimumExtent new Point 5,1\n        item.color = new Color 60,60,60\n        item.rawSetHeight tuple[1]\n      # menuItem\n      else\n        # console.log "menu creating MenuItemMorph "\n        item = new MenuItemMorph(\n          tuple[1], # closes unpinned menus\n          tuple[2], # target\n          tuple[3], # action\n          tuple[0], # label\n          @fontSize or WorldMorph.preferencesAndSettings.menuFontSize,\n          WorldMorph.preferencesAndSettings.menuFontName,\n          false,\n          @target, # environment\n          @environment, # environment2\n          tuple[4], # bubble help hint\n          tuple[5], # color\n          tuple[6], # bold\n          tuple[7], # italic\n          tuple[8],  # doubleclick action\n          tuple[9],  # argument to action 1\n          tuple[10],  # argument to action 2\n          tuple[11]  # does it represent a Morph?\n          )\n        if !@environment?\n          item.dataSourceMorphForTarget = item\n          item.morphEnv = @target\n        #if tuple[1] == null\n        #  debugger\n        #  item.environment = item\n      y += 1  if isLine\n      item.fullRawMoveTo new Point x, y\n      # we do a silentAdd here because we are going\n      # to update all the morphs again later in\n      # adjustWidthsOfMenuEntries\n      # (cause we need to know the maximum width first)\n      @silentAdd item\n      #console.log "item added: " + item.bounds\n      y = y + item.height()\n      y += 1  if isLine\n  \n    @adjustWidthsOfMenuEntries()\n    fb = @fullBounds()\n    #console.log "fb: " + fb\n    # add some padding to the right and bottom of the menu\n    @silentRawSetExtent fb.extent().add 2\n    trackChanges.pop()\n    @fullChanged()\n  \n  maxWidthOfMenuEntries: ->\n    w = 0\n    #if @parent instanceof FrameMorph\n    #  if @parent.scrollFrame instanceof ScrollFrameMorph\n    #    w = @parent.scrollFrame.width()    \n    @children.forEach (item) ->\n      if item instanceof MenuItemMorph\n        w = Math.max(w, item.children[0].width() + 8)\n      else if (item instanceof StringFieldMorph) or\n        (item instanceof ColorPickerMorph) or\n        (item instanceof SliderMorph)\n          w = Math.max w, item.width()\n      #console.log "maxWidthOfMenuEntries: width of item " + item + " : " + w\n\n    if @label\n      w = Math.max w, @label.width()\n      #console.log "maxWidthOfMenuEntries: label width : " + w\n    w\n  \n  # makes all the elements of this menu the\n  # right width.\n  adjustWidthsOfMenuEntries: ->\n    w = @maxWidthOfMenuEntries()\n    #console.log "maxWidthOfMenuEntries " + w\n    @children.forEach (item) =>\n      trackChanges.push false\n      item.rawSetWidth w\n      if item is @label\n        item.text.fullRawMoveTo item.center().subtract item.text.extent().floorDivideBy 2\n      #console.log "new width of " + item + " : " + item.width()\n      trackChanges.pop()\n\n  \n  unselectAllItems: ->\n    @children.forEach (item) ->\n      if item instanceof MenuItemMorph\n        item.state = item.STATE_NORMAL\n\n    @changed()\n\n  destroy: ->\n    WorldMorph.numberOfAddsAndRemoves++\n    super()\n    if !@isListContents\n      world.openMenus.remove @\n\n\n  itemSelected: ->\n    unless @isListContents\n      @destroy()\n\n  justDropped: ->\n    if @isPinned()\n      @removeShadowMorph()\n    else\n      @addFullShadow()\n\n\n  popup: (morphToAttachTo, pos) ->\n    # console.log "menu popup"\n    @silentFullRawMoveTo pos\n    morphToAttachTo.add @\n    # the @fullRawMoveWithin method\n    # needs to know the extent of the morph\n    # so it must be called after the morphToAttachTo.add\n    # method. If you call before, there is\n    # nopainting happening and the morph doesn\'t\n    # know its extent.\n    @fullRawMoveWithin world\n    if AutomatorRecorderAndPlayer.state != AutomatorRecorderAndPlayer.IDLE and AutomatorRecorderAndPlayer.alignmentOfMorphIDsMechanism\n      world.alignIDsOfNextMorphsInSystemTests()\n    # shadow must be added after the morph\n    # has been placed somewhere because\n    # otherwise there is no visible image\n    # to base the shadow on\n    # P.S. this is the thing that causes the MenuMorph buffer\n    # to be painted after the creation.\n    @addFullShadow()\n    @fullChanged()\n\n  # shadow is added to a morph by\n  # the HandMorph while floatDragging\n  addFullShadow: (offset = new Point(2, 2), alpha = 0.8, color) ->\n    super offset, alpha, color\n  \n  popUpAtHand: (morphToAttachTo)->\n    if !morphToAttachTo?\n      morphToAttachTo = world\n    @popup morphToAttachTo, world.hand.position()\n  \n  popUpCenteredAtHand: (world) ->\n    @popup world, world.hand.position().subtract @extent().floorDivideBy 2\n  \n  popUpCenteredInWorld: (world) ->\n    @popup world, world.center().subtract @extent().floorDivideBy 2\n\n';
