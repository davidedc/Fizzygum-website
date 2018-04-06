// Generated by CoffeeScript 1.12.7
window.CodeInjectingSimpleRectangularButtonMorph_coffeSource = '# like a SimpleRectangularButtonMorph but it contains code that can be\n# injected into another morph\n\nclass CodeInjectingSimpleRectangularButtonMorph extends SimpleRectangularButtonMorph\n\n  # Why don\'t we store just a Function, why are we dealing with strings here?\n  # 1) because the user inputs a string\n  # 2) because we NEED to keep the Coffeescript source code around, if\n  #    we just hold the Function then we lose the CS source\n\n  sourceCodeToBeInjected: ""\n  morphWhereToInject: nil\n  morphToBeNotifiedForNewCode: nil\n\n  constructor: (@morphToBeNotifiedForNewCode, @morphWhereToInject, face) ->\n    super true, @, \'injectCodeIntoTarget\', face\n    @strokeColor = new Color 0, 0, 0\n    @setColor new Color 150, 150, 150\n    @toolTipMessage = face.toolTipMessage\n\n  editInjectableSource: ->\n    @textPrompt "Code", @, "modifyCodeToBeInjected", @sourceCodeToBeInjected\n\n  # this happens when pressed, the source code is injected\n  injectCodeIntoTarget: ->\n    @morphWhereToInject.injectProperties @sourceCodeToBeInjected\n\n  modifyCodeToBeInjected: (unused,textMorph) ->\n    @sourceCodeToBeInjected = textMorph.text\n    @morphToBeNotifiedForNewCode.newCodeToInjectFromButton? @\n';