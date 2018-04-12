---
title: "Is Fizzygum really an Operating System?"
permalink: /docs/is-fizzygum-really-an-operating-system/
excerpt: "Fizzygum provides abstractions that are commonly provided by OSs..."
last_modified_at: 2018-04-12T13:00:00+00:00
---

Fizzygum does not sit directly on the hardware layer managing hardware resources.  
So, by the standard definition, Fizzygum is not an Operating System.

However, Fizzygum provides many abstractions that are commonly provided by OSs:
 * processes and process management (widgets are also processes)
 * scheduling ( ↔ stepping)
 * forking ( ↔ duplication of widgets)
 * inter-process communication ( ↔ connections)
 * files/folders ( ↔ shortcuts to objects / folders)
 * rich and cohesive graphical user interface¹

For related discussions regarding how languages/environments could (should?) completely wrap the OS layer (so that the OS layer is never exposed directly to users), see:
 * "[Design Principles Behind Smalltalk](https://www.cs.virginia.edu/~evans/cs655/readings/smalltalk.html)" by Daniel H. H. Ingalls
 * "[The operating system: should there be one?](https://www.cl.cam.ac.uk/~srk31/research/papers/kell13operating.pdf)" by Stephen Kell

---
¹graphical user interfaces are not strictly part of an OS. However the two mainstream desktop/mobile OSs ship with a deeply-integrated non-swappable graphical user interface software layer.