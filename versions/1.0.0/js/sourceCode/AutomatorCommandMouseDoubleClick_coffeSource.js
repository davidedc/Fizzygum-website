// Generated by CoffeeScript 1.10.0
window.AutomatorCommandMouseDoubleClick_coffeSource = '# \n\n\nclass AutomatorCommandMouseDoubleClick extends AutomatorCommand\n  ctrlKey: null\n  morphIdentifierViaTextLabel: null\n  pointerPositionFractionalInMorph: null\n  pointerPositionPixelsInMorph: null\n  pointerPositionPixelsInWorld: null\n  absoluteBoundsOfMorphRelativeToWorld: null\n  morphUniqueIDString: null\n  morphPathRelativeToWorld: null\n  isPartOfListMorph: null\n\n\n  # you\'d ask why can\'t we *always* trigger the double click action\n  # just by the standard mechanism of listening to the two\n  # clicks in quick succession.\n  # In fast mode we can\'t do that because the rapid\n  # clicks would always turn into double-clicks, so we check\n  # for that.\n  @replayFunction: (automatorRecorderAndPlayer, commandBeingPlayed) ->\n    debugger\n    if !window.world.automatorRecorderAndPlayer.runningInSlowMode()\n      console.log ">>>>>>>>>>>>> executing AutomatorCommandMouseDoubleClick"\n      theMorph = world.getMorphViaTextLabel(commandBeingPlayed.morphIdentifierViaTextLabel)\n      newX = Math.round((theMorph.width() * commandBeingPlayed.pointerPositionFractionalInMorph[0])) + theMorph.left()\n      newY = Math.round((theMorph.height() * commandBeingPlayed.pointerPositionFractionalInMorph[1])) + theMorph.top()\n      world.hand.fullRawMoveTo new Point(newX, newY)\n      automatorRecorderAndPlayer.handMorph.processDoubleClick()\n    else\n      # in this case the system is going to detect (and process)\n      # the double click by detecting 2 normal clicks in quick\n      # succession.\n      console.log "************* not executing AutomatorCommandMouseDoubleClick"\n\n  transformIntoDoNothingCommand: ->\n    @automatorCommandName = "AutomatorCommandDoNothing"\n\n  constructor: (@ctrlKey, @morphUniqueIDString, @morphPathRelativeToWorld, @morphIdentifierViaTextLabel, @absoluteBoundsOfMorphRelativeToWorld, @pointerPositionFractionalInMorph, @pointerPositionPixelsInMorph, @pointerPositionPixelsInWorld, @isPartOfListMorph, automatorRecorderAndPlayer) ->\n    super(automatorRecorderAndPlayer)\n    # it\'s important that this is the same name of\n    # the class cause we need to use the static method\n    # replayFunction to replay the command\n    @automatorCommandName = "AutomatorCommandMouseDoubleClick"\n';
