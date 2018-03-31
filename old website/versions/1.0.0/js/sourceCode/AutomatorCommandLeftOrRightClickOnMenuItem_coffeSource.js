// Generated by CoffeeScript 1.10.0
window.AutomatorCommandLeftOrRightClickOnMenuItem_coffeSource = '# \n\n\nclass AutomatorCommandLeftOrRightClickOnMenuItem extends AutomatorCommand\n  whichMouseButtonPressed = ""\n  textLabelOfClickedItem: 0\n  # there might be multiple instances of\n  # the same text label so we count\n  # which one it is\n  textLabelOccurrenceNumber: 0\n\n  @replayFunction: (automatorRecorderAndPlayer, commandBeingPlayed) ->\n    #automatorRecorderAndPlayer.handMorph.leftOrRightClickOnMenuItemWithText(commandBeingPlayed.whichMouseButtonPressed, commandBeingPlayed.textLabelOfClickedItem, commandBeingPlayed.textLabelOccurrenceNumber)\n\n  constructor: (@whichMouseButtonPressed, @textLabelOfClickedItem, @textLabelOccurrenceNumber, automatorRecorderAndPlayer) ->\n    super(automatorRecorderAndPlayer)\n    # it\'s important that this is the same name of\n    # the class cause we need to use the static method\n    # replayFunction to replay the command\n    @automatorCommandName = "AutomatorCommandLeftOrRightClickOnMenuItem"\n';