---
title: "Build/Install"
permalink: /docs/build-install/
excerpt: "Quick notes on ow to build/install."
sidebar:
  nav: docs
last_modified_at: 2018-05-27T21:03:00+00:00
---

The easiest way is to download a pre-made build from [here](https://github.com/davidedc/Fizzygum/releases/), then just open the ```index``` page in a browser (no web server needed).

The second easiest way is to download/clone the [Fizzygum repo](https://github.com/davidedc/Fizzygum) and the [Fizzygum-build repo](https://github.com/davidedc/Fizzygum-builds/tree/gh-pages), place them in a folder named ```Fizzygum-all``` and then run the ```build_it_please.sh``` script.

There is also an optional additional step to build a pre-compiled JS blob so Fizzygum doesn't have to load and compile itself when launched. To generate the blob, access the index page appending the ```?generatePreCompiled``` parameter, i.e. ```index.html?generatePreCompiled```. Then Fizzygum will create a blob and download it. Then run the ```inject_pre-compiled_into_build.sh``` script.

These notes are rather OSX specific, and also specific to a particular environment. If you figure out more general uses or find corrections to this note, please let us know.


