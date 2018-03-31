window.AutomatorCommandMouseButtonChange_coffeSource = '''
# 


class AutomatorCommandMouseButtonChange extends AutomatorCommand
  upOrDown: null
  button: null
  ctrlKey: null

  buttons: null
  shiftKey: null
  altKey: null
  metaKey: null

  morphIdentifierViaTextLabel: null
  pointerPositionFractionalInMorph: null
  pointerPositionPixelsInMorph: null
  pointerPositionPixelsInWorld: null
  absoluteBoundsOfMorphRelativeToWorld: null
  morphUniqueIDString: null
  morphPathRelativeToWorld: null
  isPartOfListMorph: null

  @replayFunction: (automatorRecorderAndPlayer, commandBeingPlayed) ->
    theMorph = world.getMorphViaTextLabel(commandBeingPlayed.morphIdentifierViaTextLabel)
    if !theMorph?
      console.log "tried to get morph with label: " + commandBeingPlayed.morphIdentifierViaTextLabel + " but failed "
      debugger
    newX = Math.round((theMorph.width() * commandBeingPlayed.pointerPositionFractionalInMorph[0])) + theMorph.left()
    newY = Math.round((theMorph.height() * commandBeingPlayed.pointerPositionFractionalInMorph[1])) + theMorph.top()
    world.hand.fullRawMoveTo new Point(newX, newY)

    button = switch commandBeingPlayed.button
      when "left"
        0
      when "middle"
        1
      when "right"
        2

    if commandBeingPlayed.upOrDown == "up"
      # the mouse up doesn't need the control key info
      automatorRecorderAndPlayer.handMorph.processMouseUp \\
        button,
        commandBeingPlayed.buttons,
        commandBeingPlayed.ctrlKey,
        commandBeingPlayed.shiftKey,
        commandBeingPlayed.altKey,
        commandBeingPlayed.metaKey
    else
      automatorRecorderAndPlayer.handMorph.processMouseDown \\
      button,
      commandBeingPlayed.buttons,
      commandBeingPlayed.ctrlKey,
      commandBeingPlayed.shiftKey,
      commandBeingPlayed.altKey,
      commandBeingPlayed.metaKey


  transformIntoDoNothingCommand: ->
    @automatorCommandName = "AutomatorCommandDoNothing"

  constructor: (@upOrDown, button, @buttons, @ctrlKey, @shiftKey, @altKey, @metaKey, @morphUniqueIDString, @morphPathRelativeToWorld, @morphIdentifierViaTextLabel, @absoluteBoundsOfMorphRelativeToWorld, @pointerPositionFractionalInMorph, @pointerPositionPixelsInMorph, @pointerPositionPixelsInWorld, @isPartOfListMorph, automatorRecorderAndPlayer) ->
    super(automatorRecorderAndPlayer)

    @button = switch button
      when 0
        "left"
      when 1
        "middle"
      when 2
        "right"

    # it's important that this is the same name of
    # the class cause we need to use the static method
    # replayFunction to replay the command
    @automatorCommandName = "AutomatorCommandMouseButtonChange"

'''