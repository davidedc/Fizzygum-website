// Generated by CoffeeScript 1.12.7
window.BubblyAppearance_coffeSource = 'class BubblyAppearance extends BoxyAppearance\n\n  constructor: (morph) ->\n    super morph\n\n  outlinePath: (context, radius) ->\n    # console.log "bubble outlinePath"\n\n    padding = radius\n    w = @morph.width()\n    h = @morph.height()\n\n    spikeHeight = h/5\n    spikeDistanceFromClosestSide = h/5\n\n    # outline drawn from top left corner, clockwise\n\n    # top left:\n    context.arc padding, padding, radius, degreesToRadians(-180), degreesToRadians(-90)\n\n    # top right:\n    context.arc w - padding, padding, radius, degreesToRadians(-90), degreesToRadians(-0)\n\n    # bottom right:\n    context.arc w - padding, h - spikeHeight - radius, radius, degreesToRadians(0), degreesToRadians(90)\n\n    # line from bottom right corner to the edge of the spike going down\n    context.lineTo padding + radius + spikeDistanceFromClosestSide, h - spikeHeight\n\n    # spike line going down\n    context.lineTo padding, h\n\n    # bottom left:\n    context.arc padding, h - spikeHeight - radius, radius, degreesToRadians(90), degreesToRadians(180)\n';