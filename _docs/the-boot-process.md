---
title: "The boot process"
permalink: /docs/the-boot-process/
excerpt: "Info about what happens at boot time"
last_modified_at: 2018-04-12T13:00:00+00:00
---

To let users modify Fizzygum from within itself, Fizzygum has a mechanism in place to inspect/load its own source (in CoffeeScript v2) at start time. In fact Fizzygum doesn't just **load** its own source, it also **builds itself** from source at start.

I.e. the build script doesn't actually translate/package the Coffeescript sources to JS; rather, it generates JS files containing the CoffeeScript sources of all classes and mixins (as strings).

So at boot there is just a minimal "boot" JS file that loads all such "Coffeescript sources" JS files, and:
 1. it compiles the CoffeScript source to JS, one property at a time
 2. it puts the sources and other project-architecture info in appropriate data structures, so that the sources can be kept around and edited by the user.

During this compilation step, some code is transparently edited/injected:
   * in the constructor, code is injected such that each widget instance registers itself into special data structures
   * "super" needs to be replaced with the equivalent functionality, since "super" can only be compiled as part of a class definition, it cannot be compiled in a stand-alone method definition as it is the case here.

Also, during compilation the class hierarchy is explicitly tracked (user might want to change it) and is "manually" handled, in the same way that Coffeescript v1 did, i.e. running JS code that adjusts the "constructor" and "prototype" links, and copies static properties into the constructor etc. etc.

So although we use Coffeescript v2, we don't use the Coffeescript v2 way of dealing with classes and their hierarchy (which is to just use the new ES6 syntax for it).

That is to say, we use the Coffeescript v2 compiler but the classes and their hierarchy are still handled in the v1 way.

(On the other hand, because of its reliance on ES6, CS v2 introduce some limitations, see http://coffeescript.org/#breaking-changes-classes , most of those go away when we don't use CS v2 class handling)

Pre-compilation
---
Because of this load / compile process, the boot takes from 5 to 10 seconds. For a "snappier" start, another way to boot is available, and that is to boot from a JS file that _really_ contains the JS version of the classes (and all the code needed to weave together the inheritance hierarchy and the augmentation of mixins).

To _get_ this pre-compiled JS file, just add ```?generatePreCompiled``` to the URL, e.g. ```/index.html?generatePreCompiled```.

This will cause the compilations process to be "stored" in a JS file, which is automatically downloaded. It's as if the "load/compile" process was "traced" in this JS file.

Then one needs to run the ```sh inject_pre-compiled_into_build.sh``` script, which gets the downloaded pre-compiled JS and puts it in the right place.

When booting via this pre-compiled file, the desktop comes up almost instantly. The sources are still transparently loaded after the desktop has started (for user might want to edit them).

See also...
----
...the comments in the ```boot = ->``` function [starting from here](https://github.com/davidedc/Fizzygum/search?utf8=%E2%9C%93&q=there+are+two+main+ways+of+booting+the+world&type=)


