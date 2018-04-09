---
title: "Differences between Fizzygum and Morphic.js as of April 2018"
permalink: /docs/differences-with-morphicjs/
excerpt: "List of high-level differences between Fizzygum and Morphic.js"
last_modified_at: 2018-04-07T13:00:00+00:00
---

 * separation of source code into multiple files (build process figures out correct order of classes)
 * layouts
 * events are not immediately processed on arrival, they are queued instead, and are only actually processed (in order, from the queue) in the “doOneCycle” function.
 * highlighting of widgets when hovering over a menuitem mentioning a widget (useful for spacial demultiplexing)
 * inside/outside detection (e.g. pointer picking up things) is now determined mathematically based on shape instead of bein bitmap-based
 * support for "non-native" language (coffeescript)
 * dynamic loading of environment from source code
 * new broken rects architecture: broken rects determined in separate stage after all the changes have been applied, finding the minimal changes depending on source/destination positions
 * macro recording / test framework based on visual diffing
 * no backing store for (most) widgets, backing store only used for caching when drawing is very expensive e.g. text
 * widgets’ hierarchy is now independend of their shape. Shape is just a “delegated” aspect of a widget.
 * new inspector, plus separation of Object Inspector vs Class Inspector
 * new examples: reconfigurable paint, analog clock, live coding environment
 * activity-list-based stepping mechanism
 * instances of classes are tracked
 * several base classes have been entirely rewritten (e.g. SimpleButton)
 * sliders can’t specify on orientation anymore, it’s always automatically determined from the extent
 * many new widgets including ToggleButton, RadioButtonsHolder, SwitchButton, Window, Icon...
 * canvases can now be resized without losing their content
 * new string and text widgets, allowing more layout options (e.g. fit within a given boundary) and selection from a larger variety of fonts
 * widgets always have a shadow when on the desktop
 * shadows painting mechanism completely redesigned, it's now vector based, which saves memory and allows for more culling of unnecessary painting. Also shadows remain correct while the widget is animating.
 * Shadows are not widgets anymore (which seems more suitable since they don't share any of the characteristics of widgets, for example they can't be picked up, targeted, inspected, and in general manipulated on their own), but rather just widgets' properties affecting the rendering mechanism. Only flat shadows are supported, since blurred shadows would require more expensive bitmap operations (with special blending modes) on complete renders of shadows of whole widget trees.
 * menus can have submenus, and a (rather complex) logic is applied for how to selectively and automatically close menus/submenus (e.g. when the user clicks outside of them). Menus/submenus can be independently dragged and pinned. Different shadows applied to menus depending on whether they are pinned, dragged, or in "normal" state.
 * frames can have borders, which helps in visual clarity (more tricky to implement than it sounds, due to the fact that Frames clip at their bounds)
 * a system of Windows has been added
 * a "folders" and "shortcuts" system has been implemented to reference/organise/group objects
 * an garbage collection system has been added to understand which "out of sight" widgets can be recycled and which ones still have a chance of being used.
 
 For more details, please reference the [complete list of 2000+ commits](https://github.com/davidedc/Fizzygum/commits/master).