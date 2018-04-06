// Generated by CoffeeScript 1.12.7
window.SimpleVerticalStackScrollPanelWdgt_coffeSource = '# this comment below is needed to figure out dependencies between classes\n# REQUIRES globalFunctions\n\nclass SimpleVerticalStackScrollPanelWdgt extends ScrollPanelWdgt\n\n  constructor: (@isTextLineWrapping = true) ->\n    VS = new SimpleVerticalStackPanelWdgt()\n\n    if !@isTextLineWrapping\n      VS.constrainContentWidth = false\n\n    VS.tight = false\n    VS.isLockingToPanels = true\n    super VS\n    @disableDrops()\n\n    ostmA = new SimplePlainTextWdgt(\n      "A small string\\n\\n\\nhere another.",nil,nil,nil,nil,nil,WorldMorph.preferencesAndSettings.editableItemBackgroundColor, 1)\n    ostmA.isEditable = true\n    ostmA.enableSelecting()\n    @setContents ostmA, 5\n    @setColor new Color 249, 249, 249\n\n  colloquialName: ->\n    "stack"\n\n  addMorphSpecificMenuEntries: (morphOpeningThePopUp, menu) ->\n    super\n    menu.removeMenuItem "move all inside"\n\n    childrenNotHandlesNorCarets = @contents?.children.filter (m) ->\n      !((m instanceof HandleMorph) or (m instanceof CaretMorph))\n\n    if childrenNotHandlesNorCarets? and childrenNotHandlesNorCarets.length > 0\n      menu.addLine()\n      if !@dragsDropsAndEditingEnabled\n        menu.addMenuItem "enable editing", true, @, "enableDragsDropsAndEditing", "lets you drag content in and out"\n      else\n        menu.addMenuItem "disable editing", true, @, "disableDragsDropsAndEditing", "prevents dragging content in and out"\n\n    menu.removeConsecutiveLines()\n\n  enableDragsDropsAndEditing: (triggeringWidget) ->\n    debugger\n    if !triggeringWidget? then triggeringWidget = @\n    if @dragsDropsAndEditingEnabled\n      return\n    @parent?.makePencilYellow?()\n    if @parent? and @parent != triggeringWidget and @parent instanceof SimpleDocumentWdgt\n      @parent.enableDragsDropsAndEditing @\n    else\n      super @\n\n  disableDragsDropsAndEditing: (triggeringWidget) ->\n    debugger\n    if !triggeringWidget? then triggeringWidget = @\n    if !@dragsDropsAndEditingEnabled\n      return\n    @parent?.makePencilClear?()\n    if @parent? and @parent != triggeringWidget and @parent instanceof SimpleDocumentWdgt\n      @parent.disableDragsDropsAndEditing @\n    else\n      super @';
