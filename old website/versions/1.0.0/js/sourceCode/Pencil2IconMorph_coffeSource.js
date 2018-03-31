// Generated by CoffeeScript 1.10.0
window.Pencil2IconMorph_coffeSource = '# Pencil2IconMorph //////////////////////////////////////////////////////\n\n# to try it:\n#   world.create(new PencilIconMorph(new Point(200,200),null))\n# or\n#   world.create(new PencilIconMorph(new Point(200,200),"color = \'rgba(226, 0, 75, 1)\'\\ncontext.beginPath()\\ncontext.moveTo 23, 103\\ncontext.lineTo 93, 178\\ncontext.strokeStyle = color\\ncontext.stroke()"))\n\nclass Pencil2IconMorph extends IconMorph\n  # this is so we can create objects from the object class name \n  # (for the deserialization process)\n  namedClasses[@name] = @prototype\n\n  defaultPaintFunctionSource: """\n    fillColor = @morph.color\n\n    context.beginPath()\n    context.moveTo 130.06, 5.85\n    context.lineTo 130.08, 5.84\n    context.bezierCurveTo 129.08, 6.22, 128.25, 6.92, 127.7, 7.83\n    context.lineTo 42.95, 154.23\n    context.lineTo 42.94, 154.24\n    context.bezierCurveTo 42.44, 155.11, 42.23, 156.11, 42.33, 157.11\n    context.lineTo 45.8, 189.26\n    context.lineTo 45.8, 189.24\n    context.bezierCurveTo 46.07, 191.86, 48.42, 193.75, 51.04, 193.48\n    context.bezierCurveTo 51.54, 193.43, 52.03, 193.3, 52.49, 193.09\n    context.lineTo 82.12, 179.94\n    context.lineTo 82.11, 179.95\n    context.bezierCurveTo 83.01, 179.57, 83.77, 178.92, 84.29, 178.09\n    context.lineTo 169.04, 31.69\n    context.lineTo 169.06, 31.67\n    context.bezierCurveTo 170.37, 29.39, 169.59, 26.48, 167.31, 25.17\n    context.bezierCurveTo 167.28, 25.15, 167.26, 25.14, 167.24, 25.13\n    context.lineTo 134.23, 6.12\n    context.lineTo 134.25, 6.13\n    context.bezierCurveTo 132.98, 5.4, 131.44, 5.29, 130.08, 5.84\n    context.lineTo 130.06, 5.85\n    context.closePath()\n    context.moveTo 133.54, 16.77\n    context.lineTo 158.31, 31.1\n    context.lineTo 152.4, 41.3\n    context.lineTo 127.58, 27.07\n    context.lineTo 133.54, 16.77\n    context.closePath()\n    context.moveTo 122.79, 35.35\n    context.lineTo 147.55, 49.67\n    context.lineTo 76.8, 171.9\n    context.lineTo 54.59, 181.76\n    context.lineTo 52.03, 157.57\n    context.lineTo 122.79, 35.35\n    context.closePath()\n    context.fillStyle = fillColor\n    context.fill()\n    """\n\n  constructor: (@color) ->\n    super @defaultPaintFunctionSource, @color\n';