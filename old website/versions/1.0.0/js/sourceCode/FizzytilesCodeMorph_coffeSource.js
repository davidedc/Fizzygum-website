// Generated by CoffeeScript 1.10.0
window.FizzytilesCodeMorph_coffeSource = '# FizzytilesCodeMorph ///////////////////////////////////////////////////////////\n\n\nclass FizzytilesCodeMorph extends TextMorph2\n  # this is so we can create objects from the object class name \n  # (for the deserialization process)\n  namedClasses[@name] = @prototype\n\n  fridgeMagnetsCanvas: null\n\n\n  showCompiledCode: (theTextContent) ->\n    @setText theTextContent, null, true\n\n  setText: (theTextContent, stringFieldMorph, skipCompilation) ->\n    super\n    if !skipCompilation?\n      @fridgeMagnetsCanvas?.newGraphicsCode @text\n\n';