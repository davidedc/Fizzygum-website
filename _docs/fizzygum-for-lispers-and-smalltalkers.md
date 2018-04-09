---
title: "Fizzygum for Lispers/Smalltalkers"
permalink: /docs/fizzygum-for-lispers-and-smalltalkers/
excerpt: "Fizzygum and Fizzygum.org benefit from an enormous amount of influence/input from LISP/Smalltalk environments/users."
sidebar:
  nav: docs
last_modified_at: 2018-04-07T13:00:00+00:00
---

Fizzygum and Fizzygum.org benefit from an enormous amount of influence/input from LISP/Smalltalk environments/users.

In particular, we share common viewpoints with the makers/users of LISP/Smalltalk _residential systems_:
 * the whole system can be inspected/customised from within itself for quick-turnaround changes.
 * a single web page can contain multiple spaces where _many_ use cases of _potentially very different_ nature can happen concurrently, and these spaces _benefit_ from living in (and being connected within) the same page

Indeed, Fizzygum lets users inspect/customise any part of the system, in particular:
* inspect any object and/or its class
* control processes
* connect objects into workflows
* even control compilation details, since Fizzygum compiles itself at launch (unless a pre-compiled blob is given for faster boot)

Also we share the Smalltalk's view that there is no distinction between files and applications. Instead, "files" are objects that carry with them the necessary functionality/UI to edit them.

However it's also important to note some key distinctions:
* Fizzygum doesn't (yet) give advanced control on the runtime e.g. inspect the stack or a frame of the stack, and things like pause/resume on error
* Fizzygum is not based on an image system

We are planning ways to get more input and participation from LISPers/Smalltalkers going forward. If you are one of them and want to share views/knowledge/experience, please [get in touch](/contact/).