// Generated by CoffeeScript 1.10.0
window.UpperRightTriangle_coffeSource = '# UpperRightTriangle ////////////////////////////////////////////////////////\n\n# this comment below is needed to figure out dependencies between classes\n# REQUIRES globalFunctions\n# REQUIRES UpperRightInternalHaloMixin\n#\n\n# doesn\'t really work as a fully-fledged button, but\n# buttons do hover/pressed states, which is handy\n# to have.\n\nclass UpperRightTriangle extends EmptyButtonMorph\n  # this is so we can create objects from the object class name \n  # (for the deserialization process)\n  namedClasses[@name] = @prototype\n\n\n  @augmentWith UpperRightInternalHaloMixin\n\n  constructor: (parent = null) ->\n    super()\n    @appearance = new UpperRightTriangleAppearance @\n\n    # this morph has triangular shape and we want it\n    # to only react to pointer events happening\n    # within tha shape\n    @noticesTransparentClick = false\n\n    size = WorldMorph.preferencesAndSettings.handleSize\n    @silentRawSetExtent new Point size, size\n    if parent\n      parent.add @\n    @updateResizerPosition()\n\n\n';
