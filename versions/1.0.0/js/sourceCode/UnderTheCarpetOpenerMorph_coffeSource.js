// Generated by CoffeeScript 1.10.0
window.UnderTheCarpetOpenerMorph_coffeSource = '# UnderTheCarpetOpenerMorph //////////////////////////////////////////////////////\n\nclass UnderTheCarpetOpenerMorph extends BoxMorph\n  # this is so we can create objects from the object class name \n  # (for the deserialization process)\n  namedClasses[@name] = @prototype\n\n  # panes:\n  scrollFrame: null\n  buttonClose: null\n  resizer: null\n\n  constructor: (target) ->\n    super()\n\n    @color = new Color 160, 160, 160\n    @noticesTransparentClick = true\n\n    lmContent1 = new UnderCarpetIconMorph()\n    lmContent2 = new TextMorph2 "under the carpet"\n\n    @add lmContent1, null, LayoutSpec.ATTACHEDAS_STACK_HORIZONTAL_VERTICALALIGNMENTS_UNDEFINED\n    @add lmContent2, null, LayoutSpec.ATTACHEDAS_STACK_HORIZONTAL_VERTICALALIGNMENTS_UNDEFINED\n    \n    #lmContent1.setColor new Color 0, 255, 0\n    #lmContent2.setColor new Color 0, 0, 255\n\n    lmContent1.setMinAndMaxBoundsAndSpreadability (new Point 10,10) , (new Point 20,20)\n    lmContent2.setMinAndMaxBoundsAndSpreadability (new Point 10,10) , (new Point 20,20), 2* LayoutSpec.SPREADABILITY_MEDIUM\n\n    @fullRawMoveTo new Point 10 + 60 * 0, 30 + 50 * 1\n    if !world.underTheCarpetMorph?\n      world.underTheCarpetMorph = new UnderTheCarpetMorph()\n\n    new HandleMorph @\n\n  mouseDoubleClick: ->\n    if !world.underTheCarpetMorph?\n      world.underTheCarpetMorph = new UnderTheCarpetMorph()\n\n    if world.underTheCarpetMorph?.destroyed\n      world.underTheCarpetMorph = new UnderTheCarpetMorph()\n\n    world.underTheCarpetMorph.spawnNextTo @\n\n\n';
