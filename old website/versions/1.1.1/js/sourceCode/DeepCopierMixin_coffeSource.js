// Generated by CoffeeScript 1.12.7
window.DeepCopierMixin_coffeSource = '# //////////////////////////////////////////////////////////\n\n# these comments below needed to figure out dependencies between classes\n# REQUIRES globalFunctions\n\n\nDeepCopierMixin =\n  # class properties here:\n  # none\n\n  # instance properties to follow:\n  onceAddedClassProperties: (fromClass) ->\n    @addInstanceProperties fromClass,\n\n      # Note 1: we deep-copy all kinds of data structures, not just morphs\n      # Note 2: the entire copying mechanism\n      # should also take care of inserting the copied\n      # morph in whatever other data structures where the\n      # original morph was.\n      # For example, if the Widget appeared in a data\n      # structure related to the broken rectangles mechanism,\n      # we should place the copied morph there.\n      deepCopy: (doSerialize, objOriginalsClonedAlready, objectClones, allMorphsInStructure)->\n        haveIBeenCopiedAlready = objOriginalsClonedAlready.indexOf @\n        if haveIBeenCopiedAlready >= 0\n          if doSerialize\n            return "$" + haveIBeenCopiedAlready\n          else\n            return objectClones[haveIBeenCopiedAlready]\n        if (@ instanceof Widget) and (@ not in allMorphsInStructure)\n          if doSerialize\n            return "$EXTERNAL" + @uniqueIDString()\n          else\n            return @\n     \n        positionInObjClonesArray = objOriginalsClonedAlready.length\n        objOriginalsClonedAlready.push @\n        cloneOfMe = @createPristineObjOfSameTypeAsThisOne doSerialize\n        objectClones.push  cloneOfMe\n\n        for property of @\n\n          # also includes the "parent" property\n          if @hasOwnProperty property\n\n            #if property == "backBufferContext"\n            #  debugger\n            if !@[property]?\n              cloneOfMe[property] = nil\n            else if typeof @[property] == \'object\'\n              # if the value can be rebuilt after the cloning\n              # then skip it, otherwise clone it. We know when\n              # that\'s the case because the object also has a\n              # rebuildDerivedValue method to be used to\n              # rebuild it\n              if @[property].rebuildDerivedValue?\n                cloneOfMe[property] = nil\n              else\n                if !@[property].deepCopy?\n                  console.dir @\n                  console.log property\n                  debugger\n                cloneOfMe[property] = @[property].deepCopy doSerialize, objOriginalsClonedAlready, objectClones, allMorphsInStructure\n            else\n              if property != "instanceNumericID"\n                cloneOfMe[property] = @[property]\n\n        if doSerialize\n          return "$" + positionInObjClonesArray\n\n        # see comment in the method\n        cloneOfMe.rebuildDerivedValues @\n\n        # if we deep-copied a morph, check whether the original\n        # was in data structures related to the broken rects\n        # mechanism, and if so, add the copy there too.\n        # (since we deep-copy all kinds of data structures,\n        # not just morphs, check if we have the relevant alignment\n        # method to invoke).\n        if @alignCopiedMorphToBrokenInfoDataStructures?\n          @alignCopiedMorphToBrokenInfoDataStructures cloneOfMe\n\n        # if we deep-copied a morph, check whether the original\n        # was in data structures related to stepping\n        # mechanism, and if so, add the copy there too.\n        # (since we deep-copy all kinds of data structures,\n        # not just morphs, check if we have the relevant alignment\n        # method to invoke).\n        if @alignCopiedMorphToSteppingStructures?\n          @alignCopiedMorphToSteppingStructures cloneOfMe\n\n        # if we deep-copied a morph, check whether the original\n        # was in the data structure that keeps track of the\n        # widgets that reference other widgets,\n        # and if so, add the copy there too.\n        # (since we deep-copy all kinds of data structures,\n        # not just morphs, check if we have the relevant alignment\n        # method to invoke).\n        if @alignCopiedMorphToReferenceTracker?\n          @alignCopiedMorphToReferenceTracker cloneOfMe\n\n        # last chance for a morph to do other\n        # cleanup, for example a button that is\n        # highlihted might want to un-highlight\n        # itself\n        cloneOfMe.justBeenCopied?()\n\n        return cloneOfMe\n\n      # some variables such as canvas contexts\n      # are not copied, as they are derived values\n      # so we take care or fixing the temporaries here\n      rebuildDerivedValues: (theOriginal)->\n        for property of @\n          # also includes the "parent" property\n          if @hasOwnProperty property\n            # OK so we look at the original value\n            # and check whether it has a rebuildDerivedValue\n            # method. If it does, we invoke that method,\n            # which rebuilds the value and adds it\n            # *to the clone* (which is the @)\n            if theOriginal[property]?.rebuildDerivedValue?\n              theOriginal[property].rebuildDerivedValue(@, property)\n\n      # creates a new instance of target\'s type\n      # note that\n      #   1) the constructor method is not run!\n      #   2) debuggers would show these instances as "Object"\n      #      even though their prototype is actually of\n      #      the type you wanted, so all is good there\n      #   3) this new object is not a copy\n      #      of the original object. It just has the\n      #      same type.\n      createPristineObjOfSameTypeAsThisOne: (addClassNameFieldIfObjectNotArray)->\n        #alert "cloning a " + @constructor.name\n        if typeof @ is "object"\n          # note that this case ALSO handles arrays\n          # since they test positive as typeof "object"\n          theClone = Object.create(@constructor::)\n          # add to the instances tracking.\n          # note that only Widgets have that kind\n          # of tracking\n          theClone.registerThisInstance?()\n          if addClassNameFieldIfObjectNotArray\n            theClone.className = @constructor.name\n          #console.log "theClone class:" + theClone.constructor.name\n\n          # although we don\'t run the constructor,\n          # it\'s useful to at least initialise the\n          # object with a different ID\n          if theClone.assignUniqueID?\n            theClone.assignUniqueID()\n          return theClone\n        else\n          return @\n';