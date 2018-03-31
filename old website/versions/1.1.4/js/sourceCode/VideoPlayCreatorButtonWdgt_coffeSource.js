// Generated by CoffeeScript 1.12.7
window.VideoPlayCreatorButtonWdgt_coffeSource = 'class VideoPlayCreatorButtonWdgt extends ExternalLinkCreatorButtonWdgt\n\n  constructor: (@color) ->\n    super\n    @appearance = new VideoPlayIconAppearance @\n    @toolTipMessage = "link to video"\n\n  createWidgetToBeHandled: ->\n    switcheroo = new SimpleVideoLinkWdgt()\n    switcheroo.fullRawMoveTo @position()\n    switcheroo.rawSetExtent new Point 330, 65\n    return switcheroo\n';