---
title: "Support for other languages"
permalink: /docs/support-for-other-languages/
excerpt: "Languages that transpile to JS could also be used..."
last_modified_at: 2018-04-12T13:00:00+00:00
---

Because Fizzygum loads/compiles its own source at start time, languages that transpile to JS could also be used.  
In fact, Fizzygum sources are in CoffeeScript v2 (a flavour of JS that transpiles almost 1-1 to JS, pretty much JS without curly braces and a few convenience shortcuts).

Out of the [many languages that transpile to JS](https://github.com/jashkenas/coffeescript/wiki/list-of-languages-that-compile-to-js) the ones easier to integrate are the ones that:
 * have more or less a direct correspondence to JS
 * have no problem using existing JS classes
 * don't bring-in an entirely different runtime

In particular, it would be possible to mix-in the following languages (often requested): pure JS (obviously), Amber Smalltalk, TypeScript.

In order to support a non-JS language, or to see how Fizzygum parses/compiles itself, see:
 * the "[Class](https://github.com/davidedc/Fizzygum/blob/master/src/meta/Class.coffee)" class source
 * the "[Mixin](https://github.com/davidedc/Fizzygum/blob/master/src/meta/Mixin.coffee)" class source

