// Generated by CoffeeScript 1.12.7
window.ElasticWindowCreatorButtonWdgt_coffeSource = '# this is just the same as the "generic panel"\n\nclass ElasticWindowCreatorButtonWdgt extends CreatorButtonWdgt\n\n  constructor: ->\n    super\n    @appearance = new ElasticWindowIconAppearance @, WorldMorph.preferencesAndSettings.iconDarkLineColor\n    @toolTipMessage = "elastic panel"\n\n  createWidgetToBeHandled: ->\n    genericPanel = new StretchableEditableWdgt()\n    switcherooWm = new WindowWdgt nil, nil, genericPanel, true, true\n    switcherooWm.setTitleWithoutPrependedContentName "elastic panel"\n    switcherooWm.rawSetExtent new Point 200, 200\n\n    return switcherooWm\n\n\n';