---
layout: base.html
active: index
---

<style>
	@font-face {
		font-family: 'Le Murmure';
		src: url('/fonts/LeMurmure-ModifiedVerticalAlignment.woff2')
	}


	#content {
		max-width: 500px;
	}

	#content p a {
		display: block;
		margin: .5rem auto;
		padding: .5rem;
		background: var(--bgcolor);
		border: 1px solid var(--fgcolor);
		font-family: var(--monofont);
		font-size: 1.4rem;
		font-variation-settings: 'opsz' 36, 'wght' 400;
		font-style: italic;
		/* text-align: center; */
	}
	#content p a::after {
		content: " \2192";
		margin-left: -4px;
		margin-right: 4px;
		/* ^this fixes the shifting */
		text-decoration: none;
		white-space: nowrap;
		opacity: 0.3;
		transition: 100ms;
	}
	#content p a:hover::after {
		text-decoration-color: transparent;
		margin-left: 0;
		margin-right: 0;
		opacity: 1;
	}


	.legit-marquee {
		font-family: 'Le Murmure';
		fill: var(--fgcolor);
		/* position: absolute; */
		/* top: 50%; left: 0; */
		/* transform: translate(0, -50%); */
		/* z-index: -100; */
	}

	#content h1 {
		margin: 2rem auto;
		font-family: 'Le Murmure';
		font-size: 4rem;
		text-align: center;
		text-shadow: 1px 1px var(--bgcolor);
	}
</style>


<svg viewBox="0 12 634 213" class="legit-marquee" content="LINKS " contentrepeat="3" id="demo1" pathd="m-21.66501,90.33333c435,194 538,-50 277,-61c-261,-11 243,261 244,155c1,-106 30,-102 147,-59" speed="-5" textsize="80"></svg>

<script src='/js/legitmarquees.js'></script>


<!-- [Pre-save Hz Donut](https://open.spotify.com) -->

[my awesome youtube](https://www.youtube.com/c/OliverNorred)

[cookbook collab](/cookbook/)

[my awesome twitter](https://twitter.com/olivernorred)