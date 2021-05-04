---
title: Real kinetic type with JavaScript
date: 2020-12-24
---

# Real kinetic type with JavaScript
## Oliver Norred, 24 December 2020

I can wiggle around these SVG points with JavaScript. The [opentype.js](https://github.com/opentypejs/opentype.js) library helped convert the text from a font file to SVG.

It gets every point’s y-coordinate from a constantly translating<sup><a href="#footnote1">1</a></sup> sine function of its x-coordinate.

That means the glyphs themselves wobble, not just the words.

<svg id="svgcontainer"
		version="1.1"
		baseProfile="full"
		viewbox="0 0 860 550"
		xmlns="http://www.w3.org/2000/svg"></svg>

Cool right?

<div class="footnotes">
<ol>
<li>The function : <code>y += 10 * Math.sin(x + g)</code> , where *g* increases by 0.1, 60 times per second. Units are SVG “points” or whatever. I’ll never understand those.</li>
</ol>
</div>

<script src="https://cdn.jsdelivr.net/npm/opentype.js@latest/dist/opentype.min.js"></script>
<script src="/js/typeanimator.js"></script>

<style>
	#svgcontainer{max-width: 100%; background: linear-gradient(to top, coral, brown)};
	body.darkmode #svgcontainer {filter: invert(100%)}
</style>
