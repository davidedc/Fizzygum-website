// Generated by CoffeeScript 1.10.0
window.ReconfigurablePaintMorph_coffeSource = '# ReconfigurablePaintMorph //////////////////////////////////////////////////////\n\nclass ReconfigurablePaintMorph extends WindowMorph\n  # this is so we can create objects from the object class name \n  # (for the deserialization process)\n  namedClasses[@name] = @prototype\n\n  mainCanvas: null\n  overlayCanvas: null\n  pencilToolButton: null\n  brushToolButton: null\n  toothpasteToolButton: null\n  eraserToolButton: null\n  radioButtonsHolderMorph: null\n\n  constructor: (@target) ->\n    super "Fizzypaint"\n    @pencilToolButton.select 1\n  \n  buildAndConnectChildren: ->\n    if AutomatorRecorderAndPlayer.state != AutomatorRecorderAndPlayer.IDLE and AutomatorRecorderAndPlayer.alignmentOfMorphIDsMechanism\n      world.alignIDsOfNextMorphsInSystemTests()\n\n    super\n\n    # mainCanvas\n    @mainCanvas = new CanvasMorph()\n    @mainCanvas.disableDrops()\n    @add @mainCanvas\n\n    # overlayCanvas\n    @overlayCanvas = new OverlayCanvasMorph()\n    @overlayCanvas.underlyingCanvasMorph = @mainCanvas\n    @overlayCanvas.disableDrops()\n    @mainCanvas.add @overlayCanvas\n\n    # if you clear the overlay to perfectly\n    # transparent, then we need to set this flag\n    # otherwise the pointer won\'t be reported\n    # as moving inside the canvas.\n    # If you give the overlay canvas even the smallest\n    # tint then you don\'t need this flag.\n    @overlayCanvas.noticesTransparentClick = true\n\n\n    @overlayCanvas.injectProperty "mouseLeave", """\n        # don\'t leave any trace behind then the pointer\n        # moves out.\n        (pos) ->\n            context = @backBufferContext\n            context.setTransform 1, 0, 0, 1, 0, 0\n            context.clearRect 0, 0, @width() * pixelRatio, @height() * pixelRatio\n            @changed()\n    """\n\n\n    # tools -------------------------------\n\n    # small hack on the tool - if we edit code when a tool\n    # is pressed, then we push the code without needing\n    # the user to press it manually again.\n    isToolPressed = ->\n        if @parent.buttonShown?\n          if @parent.buttons[@parent.buttonShown] != @\n            return true\n          else\n            return false\n        return false\n\n\n    modifyCodeToBeInjected = (unused,textMorph) ->\n        debugger\n        @codeToBeInjected = textMorph.text\n        if @isToolPressed()\n            @injectCodeIntoTarget()\n\n    @radioButtonsHolderMorph = new RadioButtonsHolderMorph()\n    @add @radioButtonsHolderMorph\n\n    pencilButtonOff = new CodeInjectingSimpleRectangularButtonMorph @overlayCanvas, new Pencil2IconMorph()\n    pencilButtonOff.alpha = 0.1\n    pencilButtonOff.isToolPressed = isToolPressed\n    pencilButtonOff.modifyCodeToBeInjected = modifyCodeToBeInjected\n    pencilButtonOff.codeToBeInjected = """\n        mouseMove = (pos, mouseButton) ->\n            if world.hand.floatDraggingSomething() then return\n            context = @backBufferContext\n            context.setTransform 1, 0, 0, 1, 0, 0\n            context.clearRect 0, 0, @width() * pixelRatio, @height() * pixelRatio\n            context.scale pixelRatio, pixelRatio\n\n            # give it a little bit of a tint so\n            # you can see the canvas when you take it\n            # apart from the paint tool.\n            #context.fillStyle = new Color 0,255,0,0.5\n            #context.fillRect 0, 0, @width(), @height()\n\n            context.translate -@bounds.origin.x, -@bounds.origin.y\n            context.translate pos.x, pos.y\n\n            context.beginPath()\n            context.lineWidth="2"\n\n            if mouseButton == \'left\'\n                contextMain = @underlyingCanvasMorph.backBufferContext\n                contextMain.setTransform 1, 0, 0, 1, 0, 0\n                contextMain.scale pixelRatio, pixelRatio\n                contextMain.translate -@bounds.origin.x, -@bounds.origin.y\n                contextMain.translate pos.x, pos.y\n\n                contextMain.beginPath()\n                contextMain.lineWidth="2"\n                contextMain.fillStyle = "black"\n                contextMain.rect(-2,-2,4,4)\n                contextMain.fill()\n                @underlyingCanvasMorph.changed()\n\n            else\n                context.strokeStyle="red"\n                context.rect(-2,-2,4,4)\n                context.stroke()\n            @changed()\n        """\n\n    pencilButtonOn = new CodeInjectingSimpleRectangularButtonMorph @overlayCanvas, new Pencil2IconMorph new Color 255,255,255\n    pencilButtonOn.alpha = 0.1\n    pencilButtonOn.codeToBeInjected = "mouseMove = -> return"\n\n    @pencilToolButton = new ToggleButtonMorph pencilButtonOff, pencilButtonOn\n\n\n\n\n    brushToolButtonOff = new CodeInjectingSimpleRectangularButtonMorph @overlayCanvas, new BrushIconMorph()\n    brushToolButtonOff.alpha = 0.1\n    brushToolButtonOff.isToolPressed = isToolPressed\n    brushToolButtonOff.modifyCodeToBeInjected = modifyCodeToBeInjected\n\n    brushToolButtonOff.codeToBeInjected = """\n        mouseMove = (pos, mouseButton) ->\n            if world.hand.floatDraggingSomething() then return\n            context = @backBufferContext\n            context.setTransform 1, 0, 0, 1, 0, 0\n            context.clearRect 0, 0, @width() * pixelRatio, @height() * pixelRatio\n            context.scale pixelRatio, pixelRatio\n\n            context.translate -@bounds.origin.x, -@bounds.origin.y\n            context.translate pos.x, pos.y\n\n            context.beginPath()\n            context.lineWidth="2"\n\n            if mouseButton == \'left\'\n                context.fillStyle = "red"\n\n                contextMain = @underlyingCanvasMorph.backBufferContext\n                contextMain.setTransform 1, 0, 0, 1, 0, 0\n                contextMain.scale pixelRatio, pixelRatio\n                contextMain.translate -@bounds.origin.x, -@bounds.origin.y\n                contextMain.translate pos.x, pos.y\n                contextMain.fillStyle = "black"\n\n                # the brush is 16 x 16, so center it\n                contextMain.translate -8, -8\n\n                # for convenience, the brush has been\n                # drawn first using 6x6 squares, so now\n                # scale those back\n                contextMain.scale 1/6, 1/6\n\n                contextMain.beginPath()\n                contextMain.rect 48, 0, 6, 6\n                contextMain.rect 36, 6, 6, 6\n                contextMain.rect 54, 6, 6, 6\n                contextMain.rect 66, 6, 6, 6\n                contextMain.rect 30, 12, 12, 6\n                contextMain.rect 48, 12, 6, 6\n                contextMain.rect 72, 12, 6, 6\n                contextMain.rect 12, 18, 36, 6\n                contextMain.rect 60, 18, 6, 6\n                contextMain.rect 78, 18, 6, 6\n                contextMain.rect 24, 24, 42, 6\n                contextMain.rect 72, 24, 6, 6\n                contextMain.rect 90, 24, 6, 6\n                contextMain.rect 18, 30, 42, 6\n                contextMain.rect 66, 30, 6, 6\n                contextMain.rect 18, 36, 36, 6\n                contextMain.rect 6, 36, 6, 6\n                contextMain.rect 60, 36, 12, 6\n                contextMain.rect 78, 36, 6, 6\n                contextMain.rect 90, 36, 6, 6\n                contextMain.rect 24, 42, 36, 6\n                contextMain.rect 66, 42, 12, 6\n                contextMain.rect 6, 48, 6, 6\n                contextMain.rect 18, 48, 6, 6\n                contextMain.rect 30, 48, 12, 6\n                contextMain.rect 54, 48, 6, 6\n                contextMain.rect 78, 48, 6, 6\n                contextMain.rect 36, 54, 6, 12\n                contextMain.rect 48, 54, 6, 6\n                contextMain.rect 60, 54, 12, 6\n                contextMain.rect 90, 54, 6, 6\n                contextMain.rect 6, 60, 6, 6\n                contextMain.rect 18, 60, 12, 6\n                contextMain.rect 54, 60, 6, 12\n                contextMain.rect 78, 60, 6, 6\n                contextMain.rect 0, 66, 6, 6\n                contextMain.rect 42, 66, 6, 12\n                contextMain.rect 66, 66, 6, 6\n                contextMain.rect 18, 72, 6, 6\n                contextMain.rect 30, 72, 6, 6\n                contextMain.rect 60, 78, 6, 6\n                contextMain.rect 78, 78, 6, 6\n                contextMain.rect 12, 84, 6, 6\n                contextMain.rect 36, 84, 6, 6\n                contextMain.rect 54, 84, 6, 6\n                contextMain.rect 42, 90, 6, 6\n                contextMain.rect 18, 6, 6, 6\n                contextMain.rect 6, 24, 6, 6\n                contextMain.rect 0, 42, 6, 6\n                contextMain.fill()\n\n\n                @underlyingCanvasMorph.changed()\n\n            else\n                context.strokeStyle="green"\n            context.rect(-5,-5,10,10)\n            context.stroke()\n            @changed()\n        """\n\n    brushToolButtonOn = new CodeInjectingSimpleRectangularButtonMorph @overlayCanvas, new BrushIconMorph new Color 255,255,255\n    brushToolButtonOn.alpha = 0.1\n    brushToolButtonOn.codeToBeInjected = "mouseMove = -> return"\n    @brushToolButton = new ToggleButtonMorph brushToolButtonOff, brushToolButtonOn\n\n\n    toothpasteToolButtonOff = new CodeInjectingSimpleRectangularButtonMorph @overlayCanvas, new ToothpasteIconMorph()\n    toothpasteToolButtonOff.alpha = 0.1\n    toothpasteToolButtonOff.isToolPressed = isToolPressed\n    toothpasteToolButtonOff.modifyCodeToBeInjected = modifyCodeToBeInjected\n\n    toothpasteToolButtonOff.codeToBeInjected = """\n        # Toothpaste graphics\n        # original implementation by Ward Cunningham, from Tektronix Smalltalk\n        # implementation of Smalltalk 80\n        # on the Magnolia (1980-1983) and the Tek 4404 (1984)\n        # "Draw spheres ala Ken Knowlton, Computer Graphics, v15 n4 p352."\n\n        paintBrush = (contextMain) ->\n            contextMain.save()\n            # the brush is 16 x 16, so center it\n            contextMain.translate -8, -8\n\n            # for convenience, the brush has been\n            # drawn first using 6x6 squares, so now\n            # scale those back\n            contextMain.scale 1/6, 1/6\n\n            contextMain.beginPath()\n            contextMain.rect 48, 0, 6, 6\n            contextMain.rect 36, 6, 6, 6\n            contextMain.rect 54, 6, 6, 6\n            contextMain.rect 66, 6, 6, 6\n            contextMain.rect 30, 12, 12, 6\n            contextMain.rect 48, 12, 6, 6\n            contextMain.rect 72, 12, 6, 6\n            contextMain.rect 12, 18, 36, 6\n            contextMain.rect 60, 18, 6, 6\n            contextMain.rect 78, 18, 6, 6\n            contextMain.rect 24, 24, 42, 6\n            contextMain.rect 72, 24, 6, 6\n            contextMain.rect 90, 24, 6, 6\n            contextMain.rect 18, 30, 42, 6\n            contextMain.rect 66, 30, 6, 6\n            contextMain.rect 18, 36, 36, 6\n            contextMain.rect 6, 36, 6, 6\n            contextMain.rect 60, 36, 12, 6\n            contextMain.rect 78, 36, 6, 6\n            contextMain.rect 90, 36, 6, 6\n            contextMain.rect 24, 42, 36, 6\n            contextMain.rect 66, 42, 12, 6\n            contextMain.rect 6, 48, 6, 6\n            contextMain.rect 18, 48, 6, 6\n            contextMain.rect 30, 48, 12, 6\n            contextMain.rect 54, 48, 6, 6\n            contextMain.rect 78, 48, 6, 6\n            contextMain.rect 36, 54, 6, 12\n            contextMain.rect 48, 54, 6, 6\n            contextMain.rect 60, 54, 12, 6\n            contextMain.rect 90, 54, 6, 6\n            contextMain.rect 6, 60, 6, 6\n            contextMain.rect 18, 60, 12, 6\n            contextMain.rect 54, 60, 6, 12\n            contextMain.rect 78, 60, 6, 6\n            contextMain.rect 0, 66, 6, 6\n            contextMain.rect 42, 66, 6, 12\n            contextMain.rect 66, 66, 6, 6\n            contextMain.rect 18, 72, 6, 6\n            contextMain.rect 30, 72, 6, 6\n            contextMain.rect 60, 78, 6, 6\n            contextMain.rect 78, 78, 6, 6\n            contextMain.rect 12, 84, 6, 6\n            contextMain.rect 36, 84, 6, 6\n            contextMain.rect 54, 84, 6, 6\n            contextMain.rect 42, 90, 6, 6\n            contextMain.rect 18, 6, 6, 6\n            contextMain.rect 6, 24, 6, 6\n            contextMain.rect 0, 42, 6, 6\n            contextMain.fill()\n\n            contextMain.restore()\n\n        mouseDownLeft = (pos) ->\n            if world.hand.floatDraggingSomething() then return\n            @queue = [0..24].map -> null\n            console.log "resetting the queue"\n\n        mouseUpLeft = ->\n            if world.hand.floatDraggingSomething() then return\n            if @queue?\n                console.log "draining the queue"\n                contextMain = @underlyingCanvasMorph.backBufferContext\n                contextMain.setTransform 1, 0, 0, 1, 0, 0\n                contextMain.scale pixelRatio, pixelRatio\n                contextMain.translate -@bounds.origin.x, -@bounds.origin.y\n                \n                until @queue.length == 0\n                    console.log @queue.length + " more point left to drain"\n                    previousPos = @queue[0]\n                    @queue.shift()\n                    if previousPos?\n                        debugger\n                        contextMain.save()\n                        contextMain.translate previousPos.x, previousPos.y\n                        contextMain.fillStyle = "white"\n                        @paintBrush contextMain\n                        contextMain.restore()\n                delete @queue\n\n        mouseMove = (pos, mouseButton) ->\n            if world.hand.floatDraggingSomething() then return\n            context = @backBufferContext\n            context.setTransform 1, 0, 0, 1, 0, 0\n            context.clearRect 0, 0, @width() * pixelRatio, @height() * pixelRatio\n            context.scale pixelRatio, pixelRatio\n\n            context.translate -@bounds.origin.x, -@bounds.origin.y\n            context.translate pos.x, pos.y\n\n            context.beginPath()\n            context.lineWidth="2"\n\n            if mouseButton == \'left\'\n                @queue.push pos\n                context.fillStyle = "red"\n\n                contextMain = @underlyingCanvasMorph.backBufferContext\n                contextMain.setTransform 1, 0, 0, 1, 0, 0\n                contextMain.scale pixelRatio, pixelRatio\n                contextMain.translate -@bounds.origin.x, -@bounds.origin.y\n\n                \n                contextMain.save()\n                contextMain.translate pos.x, pos.y\n                contextMain.fillStyle = "black"\n                #@paintBrush contextMain\n                contextMain.beginPath()\n                contextMain.arc 0,0,9,0,2*Math.PI\n                contextMain.fill()\n                contextMain.restore()\n\n\n                previousPos = @queue[0]\n                @queue.shift()\n                if previousPos?\n                    debugger\n                    contextMain.save()\n                    contextMain.translate previousPos.x, previousPos.y\n                    contextMain.fillStyle = "white"\n                    @paintBrush contextMain\n                    contextMain.restore()\n\n\n                @underlyingCanvasMorph.changed()\n\n            else\n                context.strokeStyle="green"\n            context.rect(-5,-5,10,10)\n            context.stroke()\n            @changed()\n        """\n\n    toothpasteToolButtonOn = new CodeInjectingSimpleRectangularButtonMorph @overlayCanvas, new ToothpasteIconMorph new Color 255,255,255\n    toothpasteToolButtonOn.alpha = 0.1\n    toothpasteToolButtonOn.codeToBeInjected = "mouseMove = -> return"\n    @toothpasteToolButton = new ToggleButtonMorph toothpasteToolButtonOff, toothpasteToolButtonOn\n\n\n    eraserToolButtonOff = new CodeInjectingSimpleRectangularButtonMorph @overlayCanvas, new EraserIconMorph()\n    eraserToolButtonOff.alpha = 0.1\n    eraserToolButtonOff.isToolPressed = isToolPressed\n    eraserToolButtonOff.modifyCodeToBeInjected = modifyCodeToBeInjected\n\n    eraserToolButtonOff.codeToBeInjected = """\n        mouseMove = (pos, mouseButton) ->\n            if world.hand.floatDraggingSomething() then return\n            context = @backBufferContext\n            context.setTransform 1, 0, 0, 1, 0, 0\n            context.clearRect 0, 0, @width() * pixelRatio, @height() * pixelRatio\n            context.scale pixelRatio, pixelRatio\n\n            context.translate -@bounds.origin.x, -@bounds.origin.y\n            context.translate pos.x, pos.y\n\n            context.beginPath()\n            context.lineWidth="2"\n\n            if mouseButton == \'left\'\n                context.fillStyle = "red"\n\n                contextMain = @underlyingCanvasMorph.backBufferContext\n                contextMain.setTransform 1, 0, 0, 1, 0, 0\n                contextMain.scale pixelRatio, pixelRatio\n                contextMain.translate -@bounds.origin.x, -@bounds.origin.y\n                contextMain.translate pos.x, pos.y\n\n                contextMain.beginPath()\n                contextMain.lineWidth="2"\n                contextMain.fillStyle = new Color 255, 250, 245\n                contextMain.rect(-5,-5,10,10)\n                contextMain.fill()\n                @underlyingCanvasMorph.changed()\n\n            else\n                context.strokeStyle="green"\n            context.rect(-5,-5,10,10)\n            context.stroke()\n            @changed()\n        """\n\n    eraserToolButtonOn = new CodeInjectingSimpleRectangularButtonMorph @overlayCanvas, new EraserIconMorph new Color 255,255,255\n    eraserToolButtonOn.alpha = 0.1\n    eraserToolButtonOn.codeToBeInjected = "mouseMove = -> return"\n    @eraserToolButton = new ToggleButtonMorph eraserToolButtonOff, eraserToolButtonOn\n\n\n    pencilAnnotation = new EditableMarkMorph @pencilToolButton, pencilButtonOff, "editInjectableSource"\n    brushAnnotation = new EditableMarkMorph @brushToolButton, brushToolButtonOff, "editInjectableSource"\n    toothpasteAnnotation = new EditableMarkMorph @toothpasteToolButton, toothpasteToolButtonOff, "editInjectableSource"\n    eraserAnnotation = new EditableMarkMorph @eraserToolButton, eraserToolButtonOff, "editInjectableSource"\n\n    @radioButtonsHolderMorph.add @pencilToolButton\n    @radioButtonsHolderMorph.add @brushToolButton\n    @radioButtonsHolderMorph.add @toothpasteToolButton\n    @radioButtonsHolderMorph.add @eraserToolButton\n    # ----------------------------------------------\n\n    # update layout\n    @layoutSubmorphs()\n\n  \n  layoutSubmorphs: (morphStartingTheChange = null) ->\n    super morphStartingTheChange\n    console.log "fixing the layout of the inspector"\n\n    # here we are disabling all the broken\n    # rectangles. The reason is that all the\n    # submorphs of the inspector are within the\n    # bounds of the parent Morph. This means that\n    # if only the parent morph breaks its rectangle\n    # then everything is OK.\n    # Also note that if you attach something else to its\n    # boundary in a way that sticks out, that\'s still\n    # going to be painted and moved OK.\n    trackChanges.push false\n\n    # label\n    labelLeft = @left() + @padding\n    labelTop = @top() + @padding\n    labelRight = @right() - @padding\n    labelWidth = labelRight - labelLeft\n    labelBottom = labelTop + @label.height() + 2\n\n    # tools -------------------------------\n\n    toolButtonSize = new Point 93, 55\n    eachPaneWidth = Math.floor(@width() - 3 * @padding - toolButtonSize.width())\n    b = @bottom() - (2 * @padding) - WorldMorph.preferencesAndSettings.handleSize\n\n\n    if @radioButtonsHolderMorph.parent == @\n      @radioButtonsHolderMorph.fullRawMoveTo new Point @left() + @padding, labelBottom + @padding\n      @radioButtonsHolderMorph.rawSetExtent new Point 2 * @padding + toolButtonSize.width(), b - (@label.bottom() + @padding)\n\n    if @pencilToolButton.parent == @radioButtonsHolderMorph\n      @pencilToolButton.fullRawMoveTo new Point @radioButtonsHolderMorph.left() + @padding, labelBottom + 10\n      @pencilToolButton.rawSetExtent toolButtonSize\n\n    if @brushToolButton.parent == @radioButtonsHolderMorph\n      @brushToolButton.fullRawMoveTo new Point @radioButtonsHolderMorph.left() + @padding, @pencilToolButton.bottom() + @padding\n      @brushToolButton.rawSetExtent toolButtonSize\n\n    if @toothpasteToolButton.parent == @radioButtonsHolderMorph\n      @toothpasteToolButton.fullRawMoveTo new Point @radioButtonsHolderMorph.left() + @padding, @brushToolButton.bottom() + @padding\n      @toothpasteToolButton.rawSetExtent toolButtonSize\n\n    if @eraserToolButton.parent == @radioButtonsHolderMorph\n      @eraserToolButton.fullRawMoveTo new Point @radioButtonsHolderMorph.left() + @padding, @toothpasteToolButton.bottom() + @padding\n      @eraserToolButton.rawSetExtent toolButtonSize\n\n    # mainCanvas --------------------------\n    mainCanvasWidth = @width() - @radioButtonsHolderMorph.width() - 3*@padding\n    b = @bottom() - (2 * @padding) - WorldMorph.preferencesAndSettings.handleSize\n    mainCanvasHeight =  b - (@label.bottom() + @padding)\n    mainCanvasBottom = labelBottom + mainCanvasHeight\n    mainCanvasLeft = @radioButtonsHolderMorph.right() + @padding\n\n    if @mainCanvas.parent == @\n      @mainCanvas.fullRawMoveTo new Point mainCanvasLeft, labelBottom + @padding\n      @mainCanvas.rawSetExtent new Point mainCanvasWidth, mainCanvasHeight\n\n    # overlayCanvas ----------------------\n    overlayCanvasWidth = eachPaneWidth\n    overlayCanvasHeight = b - labelBottom\n    overlayCanvasBottom = labelBottom + overlayCanvasHeight\n    overlayCanvasLeft = mainCanvasLeft\n\n    if @overlayCanvas.parent == @mainCanvas\n      @overlayCanvas.fullRawMoveTo new Point overlayCanvasLeft, labelBottom\n      @overlayCanvas.rawSetExtent new Point eachPaneWidth, overlayCanvasHeight\n\n    # ----------------------------------------------\n\n\n    trackChanges.pop()\n    @changed()\n    if AutomatorRecorderAndPlayer.state != AutomatorRecorderAndPlayer.IDLE and AutomatorRecorderAndPlayer.alignmentOfMorphIDsMechanism\n      world.alignIDsOfNextMorphsInSystemTests()\n\n';
