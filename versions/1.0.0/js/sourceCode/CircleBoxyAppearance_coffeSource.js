// Generated by CoffeeScript 1.10.0
window.CircleBoxyAppearance_coffeSource = '# CircleBoxyAppearance //////////////////////////////////////////////////////////////\n\nclass CircleBoxyAppearance extends Appearance\n  # this is so we can create objects from the object class name \n  # (for the deserialization process)\n  namedClasses[@name] = @prototype\n\n  constructor: (morph) ->\n    super morph\n\n  autoOrientation: ->\n    if @morph.height() > @morph.width()\n      orientation = "vertical"\n    else\n      orientation = "horizontal"\n\n\n  calculateKeyPoints: ->\n    orientation = @autoOrientation()\n    if orientation is "vertical"\n      radius = @morph.width() / 2\n      x = @morph.center().x\n      center1 = new Point(x, @morph.top() + radius).round()\n      center2 = new Point(x, @morph.bottom() - radius).round()\n      rect = @morph.topLeft().add(\n        new Point(0, radius)).corner(@morph.bottomRight().subtract(new Point(0, radius)))\n    else\n      radius = @morph.height() / 2\n      y = @morph.center().y\n      center1 = new Point(@morph.left() + radius, y).round()\n      center2 = new Point(@morph.right() - radius, y).round()\n      rect = @morph.topLeft().add(\n        new Point(radius, 0)).corner(@morph.bottomRight().subtract(new Point(radius, 0)))\n    return [radius,center1,center2,rect]\n\n  isTransparentAt: (aPoint) ->\n    # first quickly check if the point is even\n    # within the bounding box\n    if !@morph.boundsContainPoint aPoint\n      return true\n\n    [radius,center1,center2,rect] = @calculateKeyPoints()\n\n    if center1.distanceTo(aPoint) < radius or\n    center2.distanceTo(aPoint) < radius or\n    rect.containsPoint aPoint\n      return false\n\n    return true\n  \n  # This method only paints this very morph\'s "image",\n  # it doesn\'t descend the children\n  # recursively. The recursion mechanism is done by fullPaintIntoAreaOrBlitFromBackBuffer, which\n  # eventually invokes paintIntoAreaOrBlitFromBackBuffer.\n  # Note that this morph might paint something on the screen even if\n  # it\'s not a "leaf".\n  paintIntoAreaOrBlitFromBackBuffer: (aContext, clippingRectangle) ->\n\n    if @morph.preliminaryCheckNothingToDraw false, clippingRectangle, aContext\n      return\n\n    [area,sl,st,al,at,w,h] = @morph.calculateKeyValues aContext, clippingRectangle\n    if area.isNotEmpty()\n      if w < 1 or h < 1\n        return null\n\n      aContext.save()\n\n      # clip out the dirty rectangle as we are\n      # going to paint the whole of the box\n      aContext.clipToRectangle al,at,w,h\n\n      aContext.globalAlpha = @morph.alpha\n\n      aContext.scale pixelRatio, pixelRatio\n      morphPosition = @morph.position()\n      aContext.translate morphPosition.x, morphPosition.y\n\n      [radius,center1,center2,rect] = @calculateKeyPoints()\n\n      # the centers of two circles\n      points = [center1.toLocalCoordinatesOf(@morph), center2.toLocalCoordinatesOf(@morph)]\n\n      aContext.fillStyle = @morph.color.toString()\n      aContext.beginPath()\n\n      # the two circles (one at each end)\n      aContext.arc points[0].x, points[0].y, radius, 0, 2 * Math.PI, false\n      aContext.arc points[1].x, points[1].y, radius, 0, 2 * Math.PI, false\n      # the rectangle\n      rect = rect.floor()\n      rect = rect.toLocalCoordinatesOf @morph\n      aContext.moveTo rect.origin.x, rect.origin.y\n      aContext.lineTo rect.origin.x + rect.width(), rect.origin.y\n      aContext.lineTo rect.origin.x + rect.width(), rect.origin.y + rect.height()\n      aContext.lineTo rect.origin.x, rect.origin.y + rect.height()\n\n      aContext.closePath()\n      aContext.fill()\n\n      aContext.restore()\n\n      # paintHighlight is usually made to work with\n      # al, at, w, h which are actual pixels\n      # rather than logical pixels, so it\'s generally used\n      # outside the effect of the scaling because\n      # of the pixelRatio (i.e. after the restore)\n      @paintHighlight aContext, al, at, w, \n';
