window.GrayPaletteMorph_coffeSource = '''
# GrayPaletteMorph ///////////////////////////////////////////////////

class GrayPaletteMorph extends ColorPaletteMorph
  # this is so we can create objects from the object class name 
  # (for the deserialization process)
  namedClasses[@name] = @prototype

  constructor: (@target = null, sizePoint) ->
    super @target, sizePoint or new Point 80, 10
  
  # no changes of position or extent should be
  # performed in here
  createRefreshOrGetBackBuffer: ->

    cacheKey =
      @extent().toString()

    cacheHit = world.cacheForImmutableBackBuffers.get cacheKey
    if cacheHit? then return cacheHit

    extent = @extent()
    backBuffer = newCanvas extent.scaleBy pixelRatio
    backBufferContext = backBuffer.getContext "2d"
    backBufferContext.scale pixelRatio, pixelRatio
    @choice = new Color()
    gradient = backBufferContext.createLinearGradient 0, 0, extent.x, extent.y
    gradient.addColorStop 0, "black"
    gradient.addColorStop 1, "white"
    backBufferContext.fillStyle = gradient
    backBufferContext.fillRect 0, 0, extent.x, extent.y

    cacheEntry = [backBuffer, backBufferContext]
    world.cacheForImmutableBackBuffers.set cacheKey, cacheEntry
    return cacheEntry

'''