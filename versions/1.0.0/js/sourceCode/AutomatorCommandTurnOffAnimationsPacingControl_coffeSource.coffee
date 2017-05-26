window.AutomatorCommandTurnOffAnimationsPacingControl_coffeSource = '''
# 


class AutomatorCommandTurnOffAnimationsPacingControl extends AutomatorCommand

  @replayFunction: (automatorRecorderAndPlayer, commandBeingPlayed) ->
    automatorRecorderAndPlayer.turnOffAnimationsPacingControl()


  constructor: (automatorRecorderAndPlayer) ->
    super(automatorRecorderAndPlayer)
    # it's important that this is the same name of
    # the class cause we need to use the static method
    # replayFunction to replay the command
    @automatorCommandName = "AutomatorCommandTurnOffAnimationsPacingControl"

'''