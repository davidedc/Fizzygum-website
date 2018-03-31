// Generated by CoffeeScript 1.10.0
window.CircleBoxMorph_coffeSource = '# CircleBoxMorph //////////////////////////////////////////////////////\n\n# I can be used for sliders\n\nclass CircleBoxMorph extends Morph\n  # this is so we can create objects from the object class name \n  # (for the deserialization process)\n  namedClasses[@name] = @prototype\n\n\n  constructor: ->\n    super()\n    @appearance = new CircleBoxyAppearance(@)\n    @silentRawSetExtent new Point 20, 100\n\n  \n  autoOrientation: ->\n    if @height() > @width()\n      orientation = "vertical"\n    else\n      orientation = "horizontal"\n';