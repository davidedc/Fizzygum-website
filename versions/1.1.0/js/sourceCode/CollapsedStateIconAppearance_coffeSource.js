// Generated by CoffeeScript 1.12.7
window.CollapsedStateIconAppearance_coffeSource = 'class CollapsedStateIconAppearance extends IconAppearance\n\n  constructor: (@morph) ->\n    super\n    @preferredSize = new Point 100, 100\n    @specificationSize = new Point 400, 400\n\n  paintFunction: (context) ->\n    #// Color Declarations\n    colorString = \'rgb(0, 0, 0)\'\n    #// Bezier Drawing\n    context.beginPath()\n    context.moveTo 44.5, 262.42\n    context.lineTo 204.07, 111.5\n    context.lineTo 360.5, 265.5\n    context.strokeStyle = colorString\n    context.lineWidth = 30\n    context.stroke()\n';
