window.AutomatorCommand_coffeSource = '''
# The SystemTests recorder collects a number
# of commands from the user and puts them in a
# queue. This is the superclass of all the
# possible commands.


class AutomatorCommand
  automatorCommandName: ''
  millisecondsSincePreviousCommand: 0

  constructor: (automatorRecorderAndPlayer) ->
    @millisecondsSincePreviousCommand = (new Date().getTime()) -
    	automatorRecorderAndPlayer.timeOfPreviouslyRecordedCommand

'''