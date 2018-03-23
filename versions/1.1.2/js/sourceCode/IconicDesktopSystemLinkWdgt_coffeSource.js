// Generated by CoffeeScript 1.12.7
window.IconicDesktopSystemLinkWdgt_coffeSource = '# This is an icon, with a caption below, AND it has some logic\n# to be shown "in its own layer" together with the\n# other desktop system links. I.e. you never see a desktop system link\n# on top of a window (unless during a drag), so in that sense\n# the desktop system links live in their own "layer"\n\nclass IconicDesktopSystemLinkWdgt extends WidgetHolderWithCaptionWdgt\n\n  moveOnTopOfTopReference: ->\n    topMostReference = @parent.topmostChildSuchThat (c) =>\n      c != @ and (c instanceof WidgetHolderWithCaptionWdgt)\n    if topMostReference?\n      @parent.children.remove @\n      index = @parent.children.indexOf topMostReference\n      @parent.children.splice (index + 1), 0, @\n    else\n      @parent.children.remove @\n      @parent.children.unshift @\n\n';