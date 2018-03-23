// Generated by CoffeeScript 1.12.7
window.WindowWithScrollingPanelIconAppearance_coffeSource = 'class WindowWithScrollingPanelIconAppearance extends IconAppearance\n\n  constructor: (@morph) ->\n    super\n    @preferredSize = new Point 100, 100\n    @specificationSize = new Point 100, 100\n\n  paintFunction: (context) ->\n    #// Color Declarations\n    if @ownColorInsteadOfWidgetColor? then iconColorString = @ownColorInsteadOfWidgetColor.toString() else iconColorString = @morph.color.toString()\n\n    #// Oval Drawing\n    @oval context, 11, 11, 6, 6\n    context.fillStyle = iconColorString\n    context.fill()\n    #// Oval 2 Drawing\n    @oval context, 22, 11, 6, 6\n    context.fillStyle = iconColorString\n    context.fill()\n    #// Group\n    #// Oval 4 Drawing\n    @arc context, -17, 32, 44, 44, 270, 90, true\n    context.fillStyle = iconColorString\n    context.fill()\n    #// Bezier 5 Drawing\n    context.beginPath()\n    context.moveTo 28, 82\n    context.lineTo 83, 82\n    context.strokeStyle = iconColorString\n    context.lineWidth = 4\n    context.lineCap = \'round\'\n    context.stroke()\n    #// Bezier 6 Drawing\n    context.beginPath()\n    context.moveTo 82, 33\n    context.lineTo 82, 60\n    context.strokeStyle = iconColorString\n    context.lineWidth = 4\n    context.lineCap = \'round\'\n    context.stroke()\n    #// window bar bottom Drawing\n    context.beginPath()\n    context.moveTo 5, 24\n    context.lineTo 91, 24\n    context.strokeStyle = iconColorString\n    context.lineWidth = 4\n    context.stroke()\n    #// window border Drawing\n    context.beginPath()\n    context.rect 4, 4, 88, 88\n    context.strokeStyle = iconColorString\n    context.lineWidth = 3.5\n    context.lineJoin = \'round\'\n    context.stroke()\n';