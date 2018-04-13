---
title: "Similar systems"
permalink: /docs/similar-systems/
excerpt: "Other live-programming apps/sites"
sidebar:
  nav: docs
last_modified_at: 2018-04-07T13:00:00+00:00
toc: true
---


Fizzygum belongs to a category of web “live programming” apps/sites which:
* allow users to have multiple concurrent coding sessions (for complex changes, or to allow composition and chaining of artefacts);
* allow users to modify the largest possible scope of code within the environment, i.e. the whole environment itself;
* are largely self-contained system (often with the exceptions of the Javascript runtime and graphics, and sometimes the DOM), so to allow the users to a) “use” the system for extended sessions and for several different use cases (systems of this type have been traditionally called “residential”) and b) change the system in deep ways.

This category is a set of closely related environments, all inspired by Smalltalk or LISP systems, several of them using the Morphic UI framework (which gives affordances to change and compose functionality of running objects visually via “direct manipulation”).

## Morphic.js by Jens Moenig
Fizzygum was started from [**Morphic.js**](https://github.com/jmoenig/morphic.js/) by [Jens Mönig](https://github.com/jmoenig) in October 2012 (followed by independent rework of existing parts and new extensions) and it carries similarities in terms of visual appearance and parts of the underlying structure. The main differences with Morphic.js are listed [here](/docs/differences-with-morphicjs/).

## Lively.next
[Lively.next](https://lively-next.org/) (was: LivelyKernel) [1] is a thriving research platform that hosts many research projects and spans many goals. Fizzygum aims at being an alternative and independent re-implementation of a narrower scope, to focus on a smaller codebase that can be more easily understandable and modifiable.

## Caffeine by Craig Latta
[Caffeine](http://caffeine.js.org) by [Craig Latta](https://github.com/ccrraaiigg) is a hybrid between SqueakJS (see below) and Morphic.js.

## Others
* [Avocado by Adam Spitz](https://liveprogramming.github.io/2013/papers/avocado.pdf): a Javascript lively environment evoking Self. [2]
* [M2E by Nathan Dinsmore](https://github.com/nathan/m2e): a morphic implementation based on the DOM. Also provides an Inspector. [3]
* [Amber Smalltalk by Nicolas Petton](https://en.wikipedia.org/wiki/Amber_Smalltalk) et al.: an implementation of Smalltalk to the web, includes a live development environment with a class browser, workspace, unit test runner, transcript, object inspector and debugger. Not based on Morphic. [4]
* [Amber Athens by Matthias Springer](https://github.com/matthias-springer/amber-athens): combines Amber Smalltalk with a JS port of the Athens vector graphics library, in order to implement Morphic. [5]
* [SqueakJS by Bert Freudenberg, Dan H.H. Ingalls at al.](http://dx.doi.org/10.1145/2661088.2661100): brings the whole Squeak experience in the browser by using a JavaScript implementation of the Smalltalk VM. [6]
* [Ampleforth by Gilad Bracha at al.](https://gbracha.github.io/illiterateProgramming/out/illiterateProgramming.html): Newspeak language brought to the browser. Uses a custom UI framework called Hopscotch. [7]

## References  

[1] Ingalls D., Palacz K., Uhler S., Taivalsaari A., Mikkonen T. (2008) The Lively Kernel A Self-supporting System on a Web Page. In: Hirschfeld R., Rose K. (eds) Self-Sustaining Systems. Lecture Notes in Computer Science, vol 5146. Springer, Berlin, Heidelberg  

[2] Spitz, A., Flowers, J. “Avocado: Programming JavaScript in a Self-ish Environment”. Available: https://liveprogramming.github.io/2013/papers/avocado.pdf. Last accessed 30th May 2017.  

[3] Nathan Dinsmore. 2014. nathan/m2e. (January 2014). Retrieved May 30, 2017 from https://github.com/nathan/m2e  

[4] Nicolas Petton and contributors. 2017. Amber Smalltalk. (April 2017). Retrieved May 30, 2017 from https://en.wikipedia.org/wiki/Amber_Smalltalk  

[5] Matthias Springer. 2015. matthias-springer/amber-athens. (June 2015). Retrieved May 30, 2017 from https://github.com/matthias-springer/amber-athens  

[6] Bert Freudenberg, Dan H.H. Ingalls, Tim Felgentreff, Tobias Pape, and Robert Hirschfeld. 2014. SqueakJS: a modern and practical smalltalk that runs in any browser. In Proceedings of the 10th ACM Symposium on Dynamic languages
(DLS '14). ACM, New York, NY, USA, 57-66. DOI=http://dx.doi.org/10.1145/2661088.2661100  

[7] Gilad Bracha. Illiterate Programming. Retrieved May 31, 2017 from
https://gbracha.github.io/illiterateProgramming/out/illiterateProgramming.html  

