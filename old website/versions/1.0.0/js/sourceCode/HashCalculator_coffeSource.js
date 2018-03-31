// Generated by CoffeeScript 1.10.0
window.HashCalculator_coffeSource = '# REQUIRES globalFunctions\n\n# HashCalculator ///////////////////////////////////////////////////\n# adapted from http://stackoverflow.com/a/7616484\n\n# Currently used to differentiate the filenames\n# for test reference images taken in\n# different os/browser config: a hash of the\n# configuration is added to the filename.\n\nclass HashCalculator\n  # this is so we can create objects from the object class name \n  # (for the deserialization process)\n  namedClasses[@name] = @prototype\n\n  @calculateHash: (theString) ->\n      hash = 0\n      return hash  if theString.length is 0\n\n      for i in [0...theString.length]\n        chr = theString.charCodeAt i\n        hash = ((hash << 5) - hash) + chr\n        hash |= 0 # Convert to 32bit integer\n        i++\n      return hash\n';