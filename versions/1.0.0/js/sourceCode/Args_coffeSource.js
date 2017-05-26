// Generated by CoffeeScript 1.10.0
window.Args_coffeSource = '# Args are the input based on which a val is calculated\n# There are several pieces of "aggregate" information that\n# we keep about args considered together e.g. whether\n# any of them has changed since the last calculation of the\n# Val, or which ones directly or indirectly depend on a Parent\n# Val.\n\n# REQUIRES ProfilerData\n\nclass Args\n  # some accessors need to get to the\n  # actual arguments. You can get to all\n  # of them by Id of the Value\n  # or, in the case of an argument connected\n  # to a parent morph, by the value name\n  # (since there is only one Arg connected\n  # to the parent for each value name, which is\n  # not the case for children Args as\n  # obviously you may have many children and hence\n  # many arguments)\n  argById: null\n  parentArgByName: null\n  childrenArgByName: null\n  # we want to group together all children\n  # values under the same name\n  # so we keep this count separate\n  # rather than counting navigating the keys\n  childrenArgByNameCount: null\n  localArgByName: null\n  calculatedDirectlyOfIndirectlyFromParentById: null\n  calculatedDirectlyOfIndirectlyFromParentByIdCount: 0\n\n  countOfDamaged: 0\n  morphContainingTheseArgs: null\n\n  # just some flags to keep track of which\n  # args might have changed. Again, we might\n  # not know for sure because we don\'t necessarily\n  # recalculate them\n  argsMaybeChangedSinceLastCalculationById: null\n\n  constructor: (@valContainingTheseArgs) ->\n    @argById = {}\n    @parentArgByName = {}\n    @childrenArgByName = {}\n    @childrenArgByNameCount = {}\n    @localArgByName = {}\n    @calculatedDirectlyOfIndirectlyFromParentById = {}\n    @argsMaybeChangedSinceLastCalculationById = {}\n\n    @morphContainingTheseArgs = @valContainingTheseArgs.ownerMorph\n\n\n  ################################################\n  #  breaking / healing\n  ################################################\n\n  healAll: () ->\n    for eachArg of @argsMaybeChangedSinceLastCalculationById\n      eachArg.heal()\n\n\n  ################################################\n  #  accessors\n  ################################################\n\n  getByVal: (theVal) ->\n    return @getById theVal.id\n\n  ################################################\n  #  setup methods - these are called in the\n  #  constructors of each value to prepare\n  #  for the arguments.\n  ################################################\n\n  # for local arguments, you can\n  # actually create the arguments as they are static\n  setup_AddAllLocalArgVals: (localInputVals) ->\n    for each in localInputVals\n      # connecting arguments that come from local values is\n      # easier because those links are static, they are done\n      # at construction time once and for all\n      each.localValsAffectedByChangeOfThisVal.push @valContainingTheseArgs\n      newArg = new Arg localInputVals, @valContainingTheseArgs\n      newArg.fromLocal = true\n      @localArgByName[localInputVals.valueName] = newArg\n\n  # you can\'t create the actual arguments yet as these\n  # arguments will be connected dynamically. we just prepare\n  # some a structure in the morph so we\'ll be able\n  # to connect the actual values in the morph\'s\n  # childAdded and childRemoved methods\n  setup_AddAllParentArgNames: (parentArgsNames) ->\n    # ORIGINAL CODE:\n    #for each var in parentArgsNames\n    #  if !@ownerMorph.morphValsDirectlyDependingOnParentVals[each]?\n    #    @ownerMorph.morphValsDirectlyDependingOnParentVals[each] = {}\n    #  @ownerMorph.morphValsDirectlyDependingOnParentVals[each][@valName] = @\n\n    for eachVar in parentArgsNames\n      @morphContainingTheseArgs.morphValsDirectlyDependingOnParentVals[eachVar]?= {}\n      @morphContainingTheseArgs.morphValsDirectlyDependingOnParentVals[eachVar][@valContainingTheseArgs.valName] = @valContainingTheseArgs\n\n  # you can\'t create the actual arguments yet as these\n  # arguments will be connected dynamically. we just prepare\n  # some a structure in the morph so we\'ll be able\n  # to connect the actual values in the morph\'s\n  # childAdded and childRemoved methods\n  setup_AddAllChildrenArgNames: (childrenArgsNames) ->\n    #debugger\n    for eachVar in childrenArgsNames\n      @morphContainingTheseArgs.morphValsDependingOnChildrenVals[eachVar] ?= {}\n      @morphContainingTheseArgs.morphValsDependingOnChildrenVals[eachVar][@valContainingTheseArgs.valName] = @valContainingTheseArgs\n\n  ################################################\n  #  argument connection methods\n  #  these are called when Morphs are moved\n  #  around so we need to connect/disconnect\n  #  the arguments of each value to/from the\n  #  (new) parent/children\n  ################################################\n\n  # check whether you are reconnecting\n  # an arg that was temporarily\n  # disconnected\n  tryToReconnectDisconnectedArgFirst: (parentOrChildVal) ->\n    existingArg = @argById[parentOrChildVal.id]\n    if existingArg?\n      existingArg.markedForRemoval = false\n      existingArg.valContainingThisArg.argMightHaveChanged parentOrChildVal\n      return existingArg\n    return null\n\n\n  # connects a val depending on a children val to a child val.\n  # This is called by childAdded on the new parent of the childMorph\n  # that has just been added\n  connectToChildVal: (valDependingOnChildrenVal, childVal) ->\n\n    if WorldMorph.preferencesAndSettings.printoutsReactiveValuesCode\n      console.log "connecting " + valDependingOnChildrenVal.valName + " in morph "+ valDependingOnChildrenVal.ownerMorph.uniqueIDString() + " to receive input from " + childVal.valName + " in morph "+ childVal.ownerMorph.uniqueIDString()\n\n    # check whether you are reconnecting\n    # an arg that was temporarily\n    # disconnected\n    #if @morphContainingTheseArgs.constructor.name == "RectangleMorph"\n    #  debugger\n    argumentToBeConnected = @tryToReconnectDisconnectedArgFirst childVal\n    argumentToBeConnected ?= new Arg childVal, valDependingOnChildrenVal\n    argumentToBeConnected.fromChild = true\n    @childrenArgByName[childVal.valName] ?= {}\n    @childrenArgByName[childVal.valName][childVal.id] = argumentToBeConnected\n    @childrenArgByNameCount[childVal.valName]?= 0\n    @childrenArgByNameCount[childVal.valName]++\n    if childVal.directlyOrIndirectlyDependsOnAParentVal\n      @valContainingTheseArgs.stainValCalculatedFromParent childVal\n    argumentToBeConnected.args.argFromChildMightHaveChanged childVal\n\n  # connects a val depending on a parent val to a parent val.\n  # This is called by childAdded on the childMorph that has just\n  # been added\n  connectToParentVal: (valDependingOnParentVal, parentVal) ->\n    # check whether you are reconnecting\n    # an arg that was temporarily\n    # disconnected\n    argumentToBeConnected = @tryToReconnectDisconnectedArgFirst parentVal\n    argumentToBeConnected ?= new Arg parentVal, valDependingOnParentVal\n    argumentToBeConnected.directlyCalculatedFromParent = true\n    argumentToBeConnected.turnIntoArgDirectlyOrIndirectlyDependingOnParent()\n\n  ################################################\n  #  handling update of argument coming from\n  #  other values\n  ################################################\n\n  argFromChildMightHaveChanged: (childValThatMightHaveChanged) ->\n\n    if WorldMorph.preferencesAndSettings.printoutsReactiveValuesCode\n      console.log "marking child value " + childValThatMightHaveChanged.valName + " in morph "+ childValThatMightHaveChanged.ownerMorph.uniqueIDString() + " as \\"might have changed\\" "\n\n\n    arg = @argById[childValThatMightHaveChanged.id]\n    if  !arg?  or  @holdOffFromPropagatingChanges then return\n    if arg.markedForRemoval then return\n    # the unique identifier of a val is given by\n    # its name as a string and the id of the Morph it belongs to\n    if arg.maybeChangedSinceLastCalculation and childValThatMightHaveChanged.ownerMorph.parent == @morphContainingTheseArgs\n      arg.checkBasedOnSignature()\n    else if arg.maybeChangedSinceLastCalculation and childValThatMightHaveChanged.ownerMorph.parent != @morphContainingTheseArgs\n      # argsMaybeChangedSinceLastCalculation contains kid and kid not child anymore\n      arg.break()\n    else if !arg.maybeChangedSinceLastCalculation and childValThatMightHaveChanged.ownerMorph.parent == @morphContainingTheseArgs\n      # argsMaybeChangedSinceLastCalculation not contains kid and kid is now child\n      # ???\n      # add the data structures and mark it as dirty and signature undefined\n      nop\n    else if !arg.maybeChangedSinceLastCalculation and childValThatMightHaveChanged.ownerMorph.parent != @morphContainingTheseArgs\n      # argsMaybeChangedSinceLastCalculation not contains kid and not child\n      # ???\n      # this should never happen\n      nop\n    if !@valContainingTheseArgs.directlyOrIndirectlyDependsOnAParentVal\n      @valContainingTheseArgs.checkAndPropagateChangeBasedOnArgChange()\n\n  ################################################\n  #  fetching correct arguments values\n  ################################################\n\n  # all @calculatedDirectlyOfIndirectlyFromParentById\n  # always need\n  # to be fetched (maybe recalculated)\n  # regardless of their dirty val\n  # we then update the signature and heal them.\n  # Note that some children args can be in this set\n  # as children args can maybe depend directly\n  # or indirectly from parent vals.\n  fetchAllArgsDirectlyOrIndirectlyCalculatedFromParent: ->\n    oneOrMoreArgsHaveActuallyChanged = false\n    for idNotUsed, argCalculatedFromParent of @calculatedDirectlyOfIndirectlyFromParentById\n      # check that the child/parent arg we are going to fetch\n      # is still a in a child/parent relationship with\n      # this morph. If not, this check will remove the\n      # arg and just move on\n      if argCalculatedFromParent.removeArgIfMarkedForRemoval()\n        continue\n      # note here that since in @argValsById we keep the\n      # reference to the Val object, which is the one\n      # we pass to the "functionToRecalculate", we\n      # don\'t need to put the fetched val anywhere.\n      argCalculatedFromParent.fetchVal()\n      # updateSignatureAndHeal returns true if\n      # the argument has actually changed since last\n      # recalculation\n      oneOrMoreArgsHaveActuallyChanged = oneOrMoreArgsHaveActuallyChanged or argCalculatedFromParent.updateSignatureAndHeal()\n    return oneOrMoreArgsHaveActuallyChanged\n\n  fetchAllRemainingArgsNeedingRecalculation: ->\n    @holdOffFromPropagatingChanges = true\n\n    oneOrMoreArgsHaveActuallyChanged = false\n    for maybeModifiedArgId of @argsMaybeChangedSinceLastCalculationById\n      maybeModifiedArg = @argById[maybeModifiedArgId]\n      # check that the child arg we are going to fetch\n      # is still a in a child relationship with\n      # this morph. If not, this check will remove the\n      # arg and just move on.\n      if maybeModifiedArg.removeArgIfMarkedForRemoval()\n        continue\n      # note here that since in @argValsById we keep the\n      # reference to the Val object, which is the one\n      # we pass to the "functionToRecalculate", we\n      # don\'t need to put the fetched val anywhere.\n\n      if WorldMorph.preferencesAndSettings.printoutsReactiveValuesCode\n        console.log "fetching potentially changed input: " + maybeModifiedArg.id\n\n      debugger\n      maybeModifiedArg.fetchVal()\n      # the argument has actually changed since last\n      # recalculation\n      oneOrMoreArgsHaveActuallyChanged = oneOrMoreArgsHaveActuallyChanged or maybeModifiedArg.updateSignature()\n    return oneOrMoreArgsHaveActuallyChanged\n\n    # since we calculated all the damaged args,\n    # heal them all\n    @args.healAll()\n    @holdOffFromPropagatingChanges = false';
