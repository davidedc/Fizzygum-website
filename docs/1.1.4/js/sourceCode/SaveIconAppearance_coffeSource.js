// Generated by CoffeeScript 1.12.7
window.SaveIconAppearance_coffeSource = 'class SaveIconAppearance extends IconAppearance\n\n  constructor: (@morph) ->\n    super\n    @preferredSize = new Point 100, 100\n    @specificationSize = new Point 100, 100\n\n  paintFunction: (context) ->\n    #// Color Declarations\n    if @ownColorInsteadOfWidgetColor? then iconColorString = @ownColorInsteadOfWidgetColor.toString() else iconColorString = @morph.color.toString()\n    outlineColorString = WorldMorph.preferencesAndSettings.outlineColorString\n    #// Group\n    #// outline Drawing\n    context.beginPath()\n    context.moveTo 3.5, 2.5\n    context.lineTo 80.62, 2.5\n    context.lineTo 96.5, 18.33\n    context.lineTo 96.5, 97.5\n    context.lineTo 3.5, 97.5\n    context.lineTo 3.5, 2.5\n    context.closePath()\n    context.fillStyle = outlineColorString\n    context.fill()\n    #// floppy silhouette Drawing\n    context.beginPath()\n    context.moveTo 7.63, 6.63\n    context.lineTo 77.9, 6.63\n    context.lineTo 92.37, 21.09\n    context.lineTo 92.37, 93.37\n    context.lineTo 7.63, 93.37\n    context.lineTo 7.63, 6.63\n    context.closePath()\n    context.fillStyle = \'rgb(255, 255, 255)\'\n    context.fill()\n    context.strokeStyle = iconColorString\n    context.lineWidth = 3.5\n    context.stroke()\n    #// metal slot hole Drawing\n    context.beginPath()\n    context.rect 57.5, 14.5, 8, 13\n    context.strokeStyle = iconColorString\n    context.lineWidth = 2\n    context.stroke()\n    #// dot in line 2 Drawing\n    @oval context, 52.5, 70.5, 4, 4\n    context.fillStyle = iconColorString\n    context.fill()\n    #// line 2 Drawing\n    context.beginPath()\n    context.moveTo 29.63, 72.33\n    context.lineTo 48.15, 72.33\n    context.strokeStyle = iconColorString\n    context.lineWidth = 4\n    context.lineCap = \'round\'\n    context.stroke()\n    #// line 1 Drawing\n    context.beginPath()\n    context.moveTo 29.63, 64.91\n    context.lineTo 43.52, 64.91\n    context.strokeStyle = iconColorString\n    context.lineWidth = 4\n    context.lineCap = \'round\'\n    context.stroke()\n    #// metal disk cover Drawing\n    context.beginPath()\n    context.rect 24.5, 7.5, 47, 27\n    context.strokeStyle = iconColorString\n    context.lineWidth = 2.5\n    context.stroke()\n    #// label Drawing\n    context.beginPath()\n    context.rect 21, 54.5, 58, 39\n    context.strokeStyle = iconColorString\n    context.lineWidth = 2.5\n    context.stroke()\n';
