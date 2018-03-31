// Generated by CoffeeScript 1.10.0
window.AutomatorCommandMouseClick_coffeSource = '# \n\n\nclass AutomatorCommandMouseClick extends AutomatorCommand\n  button: null\n  ctrlKey: null\n  morphIdentifierViaTextLabel: null\n  pointerPositionFractionalInMorph: null\n  pointerPositionPixelsInMorph: null\n  pointerPositionPixelsInWorld: null\n  absoluteBoundsOfMorphRelativeToWorld: null\n  morphUniqueIDString: null\n  morphPathRelativeToWorld: null\n  isPartOfListMorph: null\n\n  @replayFunction: (automatorRecorderAndPlayer, commandBeingPlayed) ->\n\n  transformIntoDoNothingCommand: ->\n    @automatorCommandName = "AutomatorCommandDoNothing"\n\n  constructor: (button, @ctrlKey, @morphUniqueIDString, @morphPathRelativeToWorld, @morphIdentifierViaTextLabel, @absoluteBoundsOfMorphRelativeToWorld, @pointerPositionFractionalInMorph, @pointerPositionPixelsInMorph, @pointerPositionPixelsInWorld, @isPartOfListMorph, automatorRecorderAndPlayer) ->\n    super(automatorRecorderAndPlayer)\n    \n    if button == 0\n      @button = "left"\n    else if button == 1\n      @button = "middle"\n    else if button == 2\n      @button = "right"\n\n    # it\'s important that this is the same name of\n    # the class cause we need to use the static method\n    # replayFunction to replay the command\n    @automatorCommandName = "AutomatorCommandMouseClick"\n';