// Generated by CoffeeScript 1.10.0
window.AutomatorCommandTurnOnAlignmentOfMorphIDsMechanism_coffeSource = '# \n\n\nclass AutomatorCommandTurnOnAlignmentOfMorphIDsMechanism extends AutomatorCommand\n\n  @replayFunction: (automatorRecorderAndPlayer, commandBeingPlayed) ->\n    automatorRecorderAndPlayer.turnOnAlignmentOfMorphIDsMechanism()\n\n\n  constructor: (automatorRecorderAndPlayer) ->\n    super(automatorRecorderAndPlayer)\n    # it\'s important that this is the same name of\n    # the class cause we need to use the static method\n    # replayFunction to replay the command\n    @automatorCommandName = "AutomatorCommandTurnOnAlignmentOfMorphIDsMechanism"\n';
