---
title: "Technical intro"
permalink: /docs/technical-intro/
excerpt: "A more technical system description."
sidebar:
  nav: docs
last_modified_at: 2018-04-07T13:00:00+00:00
toc: true
---

## Terminology and background

In this note we'll refer to **“live programming”** as the means to program avoiding the edit-compile-run cycle, but rather editing the program while it is running.  

Several flavors and degrees of “live programming” are possible [1], for example in respect to the fluidity of the overall experience, the type and quantity of changes that the code can undergo while live, and the debugging capabilities (not all live systems can for example give access to the stack, or can allow step-through execution or give profiling/memory/gc metrics).  

Notable examples of "live" programming environments are: the Smalltalk language + environment [2], Squeak [3], LISP language + environment [4], Self [5], NeWS + HyperLook [6], Pharo [7], Frank steps [8], cloxp [9].  

Many such environments are in routine use in the industry: Smalltalk has a significant presence in the finance sector, and several live programming plugins for Eclipse are in routine use. Also, many popular websites give affordances to program in “live” modes.

A **direct manipulation** UI framework is a framework that enables complex object manipulation via mouse/touch. Typical examples are “presentation” authoring tools, vector graphics editors, diagram creation tools and GUI builders.


## System description

### Overview
Fizzygum is a web-based environment with reflection and hot- swapping capabilities. It’s _dynamic_, in the sense that users can change its code from within the running system itself.  
Fizzygum is based on the Morphic user interface framework [10] (renamed to "WidgetPark"), which enables quick prototyping via direct manipulation of objects.

### Processes
Widgets can add themselves to an “activity list”, specifying an interval: the environment will then make sure that the subscribed widgets have their “step” method called at the right intervals. This is for example how the analog clock “ticks”, or how animations in general are implemented.

### Inspecting
Just like Smalltalk/LISP environments, Fizzygum also offers capabilities to change objects' behaviours and for creating new widgets.  
This is achieved via object/class **inspectors** (right click -> dev -> inspect). It’s worth pointing out that the Inspectors themselves are constituted of widgets and can in turn be manipulated, taken apart, inspected and composed with other widgets.

#### Object and Class inspectors
Due to Javascript's prototypal inheritance, the general way to change behaviors is to change code at the object level, since all classes are really objects, and any object can spawn instances of itself.  

In Fizzygum the explicit concept of “class” is re-introduced: classes under the hood are still objects, but they are treated specially, as they are meant to hold little or no state, and to only work as blueprints to create instances. Vice-versa, objects are meant to hold state, and not to spawn further instances of themselves.  
Fizzygum hence uses two Inspectors: one for objects, where the user can patch data or code on a single widget, and one for classes, where the user can re-define all current and future behavior of many widgets at once.  

In separating classes from objects, Fizzygum clarifies the difference between changes in an object (a widget) and changes in a _class_ of a widget: changes to objects can come from the user or from the operation of a widget, and such changes are transient (as they can come and go during the normal operation of the widget and they are limited to the lifespan of the widget) and not worth tracking, and they won't be propagated to other instances (aside from future copies). On the other hand, changes to classes are only explicitly made by users (and not by the normal operation of the system), and they are permanent (transcend the lifespan of any widget and affect all current and future instances), and as such they are worth tracking.  

Behind the scenes, Fizzygum also tracks all instances of each class (something not directly provided by the JS runtime), which is necessary for making sure that all instances are immediately notified on a class source change.  

In summary, there are three advantages in re-introducing “explicit classes”:

* changing a class allows for a “declarative” type of change: as a class is changed, all instance widgets are immediately updated to reflect the change: the class change becomes more like a contractual change that applies to all existing and future widgets, or like a statement of a property that becomes true for all present and future class instances;
* it becomes easier to understand whether an edit is going to affect multiple widgets or just one (in an “all objects” word, that’s tricky to foretell, as some objects have instances and some others don't);
* the user can always track the hierarchy and source changes of just a handful of classes (i.e. the non-transient changes) rather than a mixed bag of changes to (potentially) each single object in the system.

#### Support for languages other than JS
Fizzygum can provide support for languages that can be transpiled to Javascript. In fact, Fizzygum is implemented in Coffeescript, and Fizzygum takes care of tracking the Coffeescript sources for the whole system. Other languages that transpile to JavaScript could be supported (the more 1-1 the transpilation, the better).

### Live changes, hot swapping, system state

As Fizzygum can modify parts of itself “live", the question arises of whether self-modification is safe in terms of system consistency and runtime errors (static errors are caught, reported and opportunity is given to correct them). In general, there are no hard guarantees, but there are some failsafes and practical mitigations.  

There is no guarantee that there will not be “hard” runtime errors (for example an array boundary exceeded). Furthermore, there are no guarantees that new code will be consistent with existing state, or that new code will keep the state consistent.  

And finally, to cover the whole range of failures, there is no guarantee that the new code will obey any contract, either checked at runtime within the system (e.g. via assertions) or established in the mind of the developer, a pattern of use, or an adherence to an external specification document.  

That said, failsafes/mitigations exist. For once, errors at runtime are caught and reported, and can prevent the offending activity from being rescheduled. Moreover, while the state of the desktop (and all the objects in it) is mutable and shared (Fizzygum assumes cooperation between widgets), effectively each object and each composition of objects usually “carries" its own state. This somewhat limits the chances of state being catastrophically damaged, as sharing is limited. So for example if the paint application is duplicated, then the two paint applications carry their own separate state, and users can make pretty aggressive changes to one without fearing compromising the other.
Also, in principle, quick tests could be put in place to validate changes.

### Limitations

#### Debugging capabilities
Fizzygum’s debugging capabilities are more limited than the ones provided by the runtime (i.e. the browser’s own debugging tool). While it is possible to set breakpoints (by throwing exceptions), there is no “pausing” at the breakpoint, and the stack content is lost. Similarly, it’s not possible to step through the execution. There are some ways to potentially circumvent some of these limitations, e.g.
* turning the code into “stackless” (potentially using generators and “yield”)
* via compilation/interpretation to/from bytecode.
* just using the runtime's debugging tools (e.g. Google Chrome's debugger, this is the approach that Craig Latta's Caffeine system takes)

#### Areas unavailable to inspection/change
All the JS runtime native parts (including several “stock” objects methods implementations, the garbage collector, and the Canvas graphics system) are “below” source code access.

## References  

[1] Tanimoto. (2013). A Perspective on the Evolution of Live Programming.Workshop on Live Programming (LIVE).  

[2] Ingalls, D. H. (1981). Design principles behind Smalltalk. BYTE magazine, 6(8), 286-298.  

[3] Ingalls, D., Kaehler, T., Maloney, J., Wallace, S., & Kay, A. (1997, October). Back to the future: the story of Squeak, a practical Smalltalk written in itself. In ACM SIGPLAN Notices (Vol. 32, No. 10, pp. 318-326). ACM.  

[4] Sandewall, E. (1978). Programming in an Interactive Environment: the “Lisp” Experience. ACM Computing Surveys (CSUR), 10(1), 35-71.  

[5] Ungar, D., & Smith, R. B. (1987). Self: The power of simplicity (Vol. 22, No. 12, pp. 227-242). ACM.  

[6] Gosling, J., Rosenthal, D. S., & Arden, M. J. (2012). The NeWS book: an introduction to the network/extensible window system. Springer Science & Business Media.  

[7] Black, A. P., Nierstrasz, O., Ducasse, S., & Pollet, D. (2010). Pharo by example.  

[8] Amelang, D., Freudenberg, B., Kaehler, T., Kay, A., Murrell, S., Ohshima, Y., Piumarta, I., Rose, K., Wallace, S., Warth, A., Yamamiya, T. (2011), "STEPS Toward Espressive Programming Systems", 2011 Progress Report  

[9] Robert Krahn. cloxp. Retrieved May 30, 2017 from http://cloxp.github.io/  

[10] Maloney, J. H., & Smith, R. B. (1995, December). Directness and liveness in the morphic user interface construction environment. In Proceedings of the 8th annual ACM symposium on User interface and software technology (pp. 21- 28). ACM.
