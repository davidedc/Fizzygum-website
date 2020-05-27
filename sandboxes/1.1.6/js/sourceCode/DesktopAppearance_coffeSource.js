// Generated by CoffeeScript 1.12.7
window.DesktopAppearance_coffeSource = 'class DesktopAppearance extends RectangularAppearance\n\n\n  currentPattern: nil\n\n  # This method only paints this very morph\n  # i.e. it doesn\'t descend the children\n  # recursively. The recursion mechanism is done by fullPaintIntoAreaOrBlitFromBackBuffer,\n  # which eventually invokes paintIntoAreaOrBlitFromBackBuffer.\n  # Note that this morph might paint something on the screen even if\n  # it\'s not a "leaf".\n  paintIntoAreaOrBlitFromBackBuffer: (aContext, clippingRectangle, appliedShadow) ->\n\n    if @morph.preliminaryCheckNothingToDraw clippingRectangle, aContext\n      return nil\n\n\n    # set up a pattern\n    if @morph.patternName? && @morph.patternName == @morph.pattern1\n      @currentPattern = @morph.patternName\n      @pattern = nil\n\n    if @morph.patternName? && @morph.patternName != @currentPattern\n      @currentPattern = @morph.patternName\n      @pattern = document.createElement(\'canvas\')\n      @pattern.width = 5 * pixelRatio\n      @pattern.height = 5 * pixelRatio\n      pctx = @pattern.getContext(\'2d\')\n      pctx.scale pixelRatio, pixelRatio\n\n      switch @morph.patternName\n        when @morph.pattern2\n          pctx.fillStyle = \'rgb(244, 243, 244)\'\n          pctx.fillRect 0,0,5,5\n          pctx.lineWidth = 0.25\n          pctx.beginPath()\n          pctx.arc 2,2,2,0,2*Math.PI\n          pctx.fillStyle = \'rgb(220, 219, 220)\'\n          pctx.fill()\n        when @morph.pattern3\n          pctx.fillStyle = \'rgb(244, 243, 244)\'\n          pctx.fillRect 0,0,5,5\n          pctx.moveTo 1,0\n          pctx.lineTo 1,5\n          pctx.strokeStyle = \'rgb(225, 224, 225)\'\n          pctx.stroke()\n        when @morph.pattern4\n          pctx.fillStyle = \'rgb(244, 243, 244)\'\n          pctx.fillRect 0,0,5,5\n          pctx.moveTo 0,5\n          pctx.lineTo 5,0\n          pctx.strokeStyle = \'rgb(225, 224, 225)\'\n          pctx.stroke()\n        when @morph.pattern5\n          pctx.fillStyle = \'rgb(244, 243, 244)\'\n          pctx.fillRect 0,0,5,5\n          pctx.moveTo 2,2\n          pctx.lineTo 4,4\n          pctx.strokeStyle = \'rgb(225, 224, 225)\'\n          pctx.stroke()\n        when @morph.pattern6\n          pctx.fillStyle = \'rgb(244, 243, 244)\'\n          pctx.fillRect 0,0,5,5\n          pctx.moveTo 0,0\n          pctx.lineTo 3,3\n          pctx.lineTo 5,0\n          pctx.strokeStyle = \'rgb(225, 224, 225)\'\n          pctx.stroke()\n        when @morph.pattern7\n          pctx.fillStyle = \'rgb(244, 243, 244)\'\n          pctx.fillRect 0,0,5,5\n          pctx.moveTo 0,5\n          pctx.lineTo 5,0\n          pctx.moveTo 2.5,2.5\n          pctx.lineTo 0,0\n          pctx.strokeStyle = \'rgb(225, 224, 225)\'\n          pctx.stroke()\n\n\n      @pattern = aContext.createPattern(@pattern, \'repeat\')\n\n\n\n    [area,sl,st,al,at,w,h] = @morph.calculateKeyValues aContext, clippingRectangle\n    if area.isNotEmpty()\n      if w < 1 or h < 1\n        return nil\n\n      @morph.justBeforeBeingPainted?()\n\n      aContext.save()\n      aContext.globalAlpha = (if appliedShadow? then appliedShadow.alpha else 1) * @morph.alpha\n      aContext.fillStyle = @morph.color.toString()\n\n      if !@morph.color?\n        debugger\n\n\n      # paintRectangle is usually made to work with\n      # al, at, w, h which are actual pixels\n      # rather than logical pixels, so it\'s generally used\n      # outside the effect of the scaling because\n      # of the pixelRatio\n\n      # paint the background\n      toBePainted = new Rectangle al, at, al + w, at + h\n\n      if @morph.backgroundColor?\n        color = @morph.backgroundColor\n        if appliedShadow?\n          color = "black"\n        @morph.paintRectangle aContext, toBePainted.left(), toBePainted.top(), toBePainted.width(), toBePainted.height(), color\n\n\n      # now paint the actual morph, which is a rectangle\n      # (potentially inset because of the padding)\n      toBePainted = toBePainted.intersect @morph.boundingBoxTight().scaleBy pixelRatio\n\n      color = @morph.color\n      if appliedShadow?\n        color = "black"\n\n      @morph.paintRectangle aContext, toBePainted.left(), toBePainted.top(), toBePainted.width(), toBePainted.height(), color\n\n      @drawAdditionalPartsOnBaseShape? false, false, appliedShadow, aContext, al, at, w, h\n\n      if !appliedShadow?\n        @paintStroke aContext, clippingRectangle\n\n      if @pattern?\n        aContext.fillStyle = @pattern\n        aContext.fillRect toBePainted.left(), toBePainted.top(), toBePainted.width(), toBePainted.height()\n\n      aContext.restore()\n\n      # paintHighlight is usually made to work with\n      # al, at, w, h which are actual pixels\n      # rather than logical pixels, so it\'s generally used\n      # outside the effect of the scaling because\n      # of the pixelRatio\n      @paintHighlight aContext, al, at, w, h\n\n';