// Generated by CoffeeScript 1.10.0
window.EditableMarkMorph_coffeSource = '# EditableMarkMorph ////////////////////////////////////////////////////////\n\nclass EditableMarkMorph extends UpperRightTriangleAnnotation\n  # this is so we can create objects from the object class name \n  # (for the deserialization process)\n  namedClasses[@name] = @prototype\n\n  editObject: null\n  editMethodAsString: ""\n\n  constructor: (parent = null, @editObject, @editMethodAsString) ->\n    super parent\n\n  mouseClickLeft: ->\n    @editObject[@editMethodAsString].call @editObject\n';