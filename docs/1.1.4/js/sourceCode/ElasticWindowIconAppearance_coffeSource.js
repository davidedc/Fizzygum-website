// Generated by CoffeeScript 1.12.7
window.ElasticWindowIconAppearance_coffeSource = 'class ElasticWindowIconAppearance extends IconAppearance\n\n  constructor: (@morph) ->\n    super\n    @preferredSize = new Point 100, 100\n    @specificationSize = new Point 100, 100\n\n  paintFunction: (context) ->\n    #// Color Declarations\n    if @ownColorInsteadOfWidgetColor? then iconColorString = @ownColorInsteadOfWidgetColor.toString() else iconColorString = @morph.color.toString()\n\n    #// Oval Drawing\n    @oval context, 11, 11, 6, 6\n    context.fillStyle = iconColorString\n    context.fill()\n    #// Oval 2 Drawing\n    @oval context, 22, 11, 6, 6\n    context.fillStyle = iconColorString\n    context.fill()\n    #// window bar bottom Drawing\n    context.beginPath()\n    context.moveTo 5, 24\n    context.lineTo 91, 24\n    context.strokeStyle = iconColorString\n    context.lineWidth = 4\n    context.stroke()\n    #// window border Drawing\n    context.beginPath()\n    context.rect 4, 4, 88, 88\n    context.strokeStyle = iconColorString\n    context.lineWidth = 3.5\n    context.lineJoin = \'round\'\n    context.stroke()\n    #// Group 4\n    #// Bezier 20 Drawing\n    context.beginPath()\n    context.moveTo 82, 83\n    context.lineTo 82, 33\n    context.strokeStyle = iconColorString\n    context.lineWidth = 2.5\n    context.stroke()\n    #// Bezier 8 Drawing\n    context.beginPath()\n    context.moveTo 80.5, 57.65\n    context.bezierCurveTo 79.09, 60.86, 77.49, 64.5, 74.07, 64.5\n    context.bezierCurveTo 70.64, 64.5, 69.05, 60.86, 67.64, 57.65\n    context.bezierCurveTo 66.18, 54.32, 65.09, 52.15, 63.23, 52.15\n    context.bezierCurveTo 61.38, 52.15, 60.28, 54.32, 58.83, 57.65\n    context.bezierCurveTo 57.42, 60.86, 55.82, 64.5, 52.4, 64.5\n    context.bezierCurveTo 48.97, 64.5, 47.38, 60.86, 45.97, 57.65\n    context.bezierCurveTo 44.51, 54.32, 43.42, 52.15, 41.56, 52.15\n    context.bezierCurveTo 39.71, 52.15, 38.62, 54.32, 37.16, 57.65\n    context.bezierCurveTo 35.75, 60.86, 34.16, 64.5, 30.73, 64.5\n    context.bezierCurveTo 27.31, 64.5, 25.72, 60.86, 24.31, 57.65\n    context.bezierCurveTo 22.85, 54.32, 21.76, 52.15, 19.9, 52.15\n    context.bezierCurveTo 18.05, 52.15, 16.96, 54.32, 15.5, 57.65\n    context.strokeStyle = iconColorString\n    context.lineWidth = 3\n    context.miterLimit = 4\n    context.lineCap = \'round\'\n    context.stroke()\n    #// Bezier 7 Drawing\n    context.beginPath()\n    context.moveTo 15, 83\n    context.lineTo 15, 33\n    context.strokeStyle = iconColorString\n    context.lineWidth = 2.5\n    context.stroke()\n';
