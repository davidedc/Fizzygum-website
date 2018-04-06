---
title: "Advanced Connections"
permalink: /docs/advanced-connections/
excerpt: "Instructions and settings for working with multiple site authors."
last_modified_at: 2016-11-03T10:55:15-04:00
---

{% include video id="XsxDH4HcOWA" provider="youtube" %}

## Transcript

In ["Basic Connections"](/docs/basic-connections) we’ve seen simple ways of patching widgets together, we’ll now build a useful example - a converter between celsius and fahrenheit temperature scales.

Open the patch programming area, and as a first thing we connect a slider to a textbox:

<figure>
  <img src="{{ '/assets/images/docs-gifs/advanced-connections/advanced-connections-1.gif' | relative_url }}" alt="1">
</figure>

then we connect the textbox to a “formula” box, with the formula from C to F:

<figure>
  <img src="{{ '/assets/images/docs-gifs/advanced-connections/advanced-connections-2.gif' | relative_url }}" alt="1">
</figure>

then the formula box to the second textbox:

<figure>
  <img src="{{ '/assets/images/docs-gifs/advanced-connections/advanced-connections-3.gif' | relative_url }}" alt="1">
</figure>

and finally the textbox to another slider:

<figure>
  <img src="{{ '/assets/images/docs-gifs/advanced-connections/advanced-connections-4.gif' | relative_url }}" alt="1">
</figure>

now this is all good, however right now it only works one way.

We really want to convert F to C as well, so let’s just connect the widgets all the way around... we’ll have to use another formula box from F to C

<figure>
  <img src="{{ '/assets/images/docs-gifs/advanced-connections/advanced-connections-5.gif' | relative_url }}" alt="1">
</figure>

and then the second formula box back to the first slider:

<figure>
  <img src="{{ '/assets/images/docs-gifs/advanced-connections/advanced-connections-6.gif' | relative_url }}" alt="1">
</figure>

We connected the widgets in a cycle, however this is not a problem, as the system knows when to stop calculating things around…

now note how all the  widgets are aligned to the correct values, whichever widget we change:

<figure>
  <img src="{{ '/assets/images/docs-gifs/advanced-connections/advanced-connections-7.gif' | relative_url }}" alt="1">
</figure>

So we’ve seen a more advanced example of connecting or “patching" widgets, a really powerful way to build complex tools.

