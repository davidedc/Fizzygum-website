---
title: "Hacking Fizzygum"
permalink: /docs/hacking-fizzygum/
excerpt: "Instructions and settings for working with multiple site authors."
last_modified_at: 2016-11-03T10:55:15-04:00
---

{% include video id="QfWT4ZteEwc" provider="youtube" %}

## Transcript

Fizzygum lets you directly access and change the source code of any of its parts, which is very powerful to let you customise it, let’s see two examples.

In the first example we are going to change what the drawing tools in the “Draw” app do.

Just open the draw app first:

<figure>
  <img src="{{ '/assets/images/docs-gifs/hacking-fizzygum/hacking-fizzygum-1.gif' | relative_url }}" alt="1">
</figure>

and click on the little pencil here:

<figure>
  <img src="{{ '/assets/images/docs-gifs/hacking-fizzygum/hacking-fizzygum-2.gif' | relative_url }}" alt="1">
</figure>

and try for example to change the color of the brush… It might take a while to find your way around the first time however… let’s try this:

<figure>
  <img src="{{ '/assets/images/docs-gifs/hacking-fizzygum/hacking-fizzygum-3.gif' | relative_url }}" alt="1">
</figure>

OK Done.

Now, in this first example the way to change code was offered explicitly by the drawing app, the drawing tools’ buttons were special and they provided a dedicated way to change how they work.

In general though apps and buttons don’t offer this explicit way of editing their source.

However there is an equally powerful and more general way that lets you edit any piece of source code of Fizzygum. 

Let’s do something simple, let’s say that we want to make the seconds hand of the clock more prominent (because maybe we are using the clock to count seconds or something like that).

... let’s make a copy first:

<figure>
  <img src="{{ '/assets/images/docs-gifs/hacking-fizzygum/hacking-fizzygum-4.gif' | relative_url }}" alt="1">
</figure>

Now let's open the menu for the clock widget and go in dev... and then “inspect”:

<figure>
  <img src="{{ '/assets/images/docs-gifs/hacking-fizzygum/hacking-fizzygum-5.gif' | relative_url }}" alt="1">
</figure>

In this list we get the functions (or methods) in this widget, and it looks like this one is the one we want, hopefully we can find a way to make the seconds hand thicker:

<figure>
  <img src="{{ '/assets/images/docs-gifs/hacking-fizzygum/hacking-fizzygum-6.gif' | relative_url }}" alt="1">
</figure>

now that’s great, we changed this particular clock, however it could be useful to have a way to change all the existing and future clocks rather than just one.

To do that, instead of changing a particular clock we change the blueprint for all the clocks, also known as the “class”.

Just click the "AnalogClockWdgt" in the "hierarchy" section to open a Class inspector (as opposed to the object inspector of before):

<figure>
  <img src="{{ '/assets/images/docs-gifs/hacking-fizzygum/hacking-fizzygum-7.gif' | relative_url }}" alt="1">
</figure>

And let’s change the thickness of the hours hand this time.

<figure>
  <img src="{{ '/assets/images/docs-gifs/hacking-fizzygum/hacking-fizzygum-8.gif' | relative_url }}" alt="1">
</figure>

OK it worked. Note that all the clocks have changed, and in fact any future clock will be created this way as well.

---
This is just a taste of what you can do by having access to the source code, but there are really no limits, you could change what buttons do, how graphs are drawn, customise workflows et cetera et cetera.

That was it for our hacking session, keep an eye on further videos/docs for more examples.