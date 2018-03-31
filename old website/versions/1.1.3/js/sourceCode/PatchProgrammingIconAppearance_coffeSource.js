// Generated by CoffeeScript 1.12.7
window.PatchProgrammingIconAppearance_coffeSource = 'class PatchProgrammingIconAppearance extends IconAppearance\n\n  constructor: (@morph) ->\n    super\n    @preferredSize = new Point 100, 100\n    @specificationSize = new Point 100, 100\n\n  paintFunction: (context) ->\n    #// Color Declarations\n    if @ownColorInsteadOfWidgetColor? then iconColorString = @ownColorInsteadOfWidgetColor.toString() else iconColorString = @morph.color.toString()\n    outlineColorString = WorldMorph.preferencesAndSettings.outlineColorString\n\n    #// Group 6\n    #// outline Drawing\n    context.beginPath()\n    context.moveTo 87.54, 18\n    context.lineTo 13.57, 18\n    context.bezierCurveTo 10.05, 18, 7.12, 20.67, 7.12, 23.87\n    context.lineTo 7, 76.13\n    context.bezierCurveTo 7, 79.33, 9.94, 82, 13.46, 82\n    context.lineTo 87.43, 82\n    context.bezierCurveTo 90.95, 82, 93.88, 79.33, 93.88, 76.13\n    context.lineTo 94, 23.87\n    context.bezierCurveTo 94, 20.67, 91.06, 18, 87.54, 18\n    context.closePath()\n    context.fillStyle = outlineColorString\n    context.fill()\n    #// slide border Drawing\n    context.beginPath()\n    context.moveTo 85.84, 20\n    context.lineTo 15.27, 20\n    context.bezierCurveTo 11.91, 20, 9.11, 22.5, 9.11, 25.5\n    context.lineTo 9, 74.5\n    context.bezierCurveTo 9, 77.5, 11.8, 80, 15.16, 80\n    context.lineTo 85.73, 80\n    context.bezierCurveTo 89.09, 80, 91.89, 77.5, 91.89, 74.5\n    context.lineTo 92, 25.5\n    context.bezierCurveTo 92, 22.5, 89.2, 20, 85.84, 20\n    context.closePath()\n    context.moveTo 88.53, 74.5\n    context.bezierCurveTo 88.53, 75.9, 87.3, 77, 85.73, 77\n    context.lineTo 15.16, 77\n    context.bezierCurveTo 13.59, 77, 12.36, 75.9, 12.36, 74.5\n    context.lineTo 12.47, 25.5\n    context.bezierCurveTo 12.47, 24.1, 13.7, 23, 15.27, 23\n    context.lineTo 85.84, 23\n    context.bezierCurveTo 87.41, 23, 88.64, 24.1, 88.64, 25.5\n    context.lineTo 88.53, 74.5\n    context.closePath()\n    context.fillStyle = iconColorString\n    context.fill()\n    #// Group 8\n    #// Bezier 10 Drawing\n    context.beginPath()\n    context.moveTo 30.43, 50\n    context.lineTo 68.41, 50\n    context.strokeStyle = iconColorString\n    context.lineWidth = 3.5\n    context.lineCap = \'round\'\n    context.stroke()\n    #// Oval 5 Drawing\n    @oval context, 20, 40, 20, 20\n    context.strokeStyle = iconColorString\n    context.lineWidth = 3.5\n    context.stroke()\n    #// Rectangle Drawing\n    context.beginPath()\n    context.rect 59, 40, 20, 20\n    context.strokeStyle = iconColorString\n    context.lineWidth = 3.5\n    context.lineJoin = \'round\'\n    context.stroke()\n\n\n';