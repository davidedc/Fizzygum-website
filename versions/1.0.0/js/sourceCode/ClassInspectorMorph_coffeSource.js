// Generated by CoffeeScript 1.10.0
window.ClassInspectorMorph_coffeSource = '# ClassInspectorMorph //////////////////////////////////////////////////////\n\nclass ClassInspectorMorph extends InspectorMorph2\n  # this is so we can create objects from the object class name \n  # (for the deserialization process)\n  namedClasses[@name] = @prototype\n\n  notifyInstancesOfSourceChange: (propertiesArray)->\n    @target.constructor.klass.notifyInstancesOfSourceChange propertiesArray\n\n  buildAndConnectChildren: ->\n    super\n    @lastLabelInHierarchy.setText "this class"\n    @label.setText "class " + @target.constructor.name   \n\n  layoutOwnPropsOnlyToggle: (height) ->\n\n    @showMethodsToggle.fullRawMoveTo new Point @left()+@padding , height\n    @showMethodsToggle.rawSetExtent new Point (@width() - 4*@padding)/4,15\n\n    @showFieldsToggle.fullRawMoveTo new Point @showMethodsToggle.right() + @padding, height\n    @showFieldsToggle.rawSetExtent new Point (@width() - 4*@padding)/4,15\n\n    @showInheritedToggle.fullRawMoveTo new Point @showFieldsToggle.right() + @padding, height\n    @showInheritedToggle.rawSetExtent new Point 2*(@width() - 4*@padding)/4,15\n\n\n\n  buildAndConnectObjOwnPropsButton: ->\n\n  # TODO: when inspecting objects, we added the functionality to\n  # inject code in the objects themselves.\n  # We\'d have to do the same here, add a way to inject code in\n  # object classes.\n  save: ->\n    txt = @detail.contents.children[0].text.toString()\n    propertyName = @list.selected.labelString\n\n    try\n      # this.target[propertyName] = evaluate txt\n      @target.evaluateString "@" + propertyName + " = " + txt\n      # if we are saving a function, we\'d like to\n      # keep the source code so we can edit Coffeescript\n      # again.\n      if isFunction @target[propertyName]\n        @target[propertyName + "_source"] = txt\n      @notifyInstancesOfSourceChange([propertyName])\n    catch err\n      @inform err\n';
