// Generated by CoffeeScript 1.12.7
window.PencilIconMorph_coffeSource = '# to try it:\n#   world.create(new PencilIconMorph(new Point(200,200),nil))\n# or\n#   world.create(new PencilIconMorph(new Point(200,200),"color = \'rgb(226, 0, 75)\'\\ncontext.beginPath()\\ncontext.moveTo 23, 103\\ncontext.lineTo 93, 178\\ncontext.strokeStyle = color\\ncontext.stroke()"))\n\nclass PencilIconMorph extends IconMorph\n\n  constructor: (@color) ->\n    super\n    @appearance = new PencilIconAppearance @\n';