// Generated by CoffeeScript 1.10.0
window.ShadowMorph_coffeSource = '# ShadowMorph /////////////////////////////////////////////////////////\n# REQUIRES BackBufferMixin\n\nclass ShadowMorph extends Morph\n  # this is so we can create objects from the object class name \n  # (for the deserialization process)\n  namedClasses[@name] = @prototype\n  @augmentWith BackBufferMixin\n\n  targetMorph: null\n  offset: null\n  alpha: 0\n  color: null\n\n  # alpha should be between zero (transparent)\n  # and one (fully opaque)\n  constructor: (@targetMorph, @offset = new Point(7, 7), @alpha = 0.2, @color = new Color(0, 0, 0)) ->\n    # console.log "creating shadow morph"\n    super()\n    @bounds.debugIfFloats()\n    @offset.debugIfFloats()\n\n  reLayout: ->\n    # console.log "shadow morph update rendering"\n    super()\n    fb = @targetMorph.fullBoundsNoShadow()\n    @silentRawSetExtent fb.extent().add @targetMorph.shadowBlur * 2\n    if WorldMorph.preferencesAndSettings.useBlurredShadows and !WorldMorph.preferencesAndSettings.isFlat\n      @silentFullRawMoveTo fb.origin.add(@offset).subtract @targetMorph.shadowBlur\n    else\n      @silentFullRawMoveTo fb.origin.add @offset\n    @bounds.debugIfFloats()\n    @offset.debugIfFloats()\n    @notifyChildrenThatParentHasReLayouted()\n\n  # No changes of position or extent should be\n  # performed in here,\n  # There is really little hope to cache this buffer\n  # cross-morph.\n  # So just keep a dedicated one\n  # for each canvas, simple.\n  createRefreshOrGetBackBuffer: ->\n\n    extent = @extent()\n\n    if @backBuffer?\n      # @backBuffer.width and @backBuffer.height are already in\n      # physical coordinates so no need to adjust for pixelratio\n      backBufferExtent = new Point @backBuffer.width, @backBuffer.height\n      if backBufferExtent.eq extent.scaleBy pixelRatio\n        return [@backBuffer, @backBufferContext]\n\n    @bounds.debugIfFloats()\n    if WorldMorph.preferencesAndSettings.useBlurredShadows and !WorldMorph.preferencesAndSettings.isFlat\n      @backBuffer = @targetMorph.shadowImage @offset, @color, true\n    else\n      @backBuffer = @targetMorph.shadowImage @offset, @color, false\n    @backBufferContext =  @backBuffer.getContext "2d"\n    @bounds.debugIfFloats()\n    @offset.debugIfFloats()\n\n    return [@backBuffer, @backBufferContext]\n';