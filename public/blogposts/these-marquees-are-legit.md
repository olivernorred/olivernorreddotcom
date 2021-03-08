# These marquees are legit
## Oliver Norred, 5 March 2021


*Wow, these marquees look great.*

When’s the last time you heard that? On the web, `<marquee>` has gotten a bad rap for, like, ten years. It’s been [deprecated](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/marquee) for at least as long as I’ve been making web stuff.

But the truth is, I like them. I like how they pull me away from the sanitized corporate easing functions that [Google and Twitter pound into our skulls](https://material.io/design/motion/understanding-motion.html#principles). I like to stare at them and I like to wait for the text to come around a second time.

<marquee>DOESN’T THIS MAKE YOU YEARN FOR DAYS GONE BY?</marquee>

The loudest moans and groans lament that `<marquee>`s are “literally unreadable for a period of time” and “next to impossible to print.” I hear you. [So I made a JavaScript + SVG web component called `legit-marquee`.](https://github.com/olivernorred/legit-marquees)

These things are legit. The accessibility concerns dissolve because the text is always visible, and you’re in full control of the animation. With a bit of hacking, you can even make it animate with the scroll position.

I sort of see the web going more retro right now and for the next year or so. I’m happy with that. I hope this can be of use.



<svg class="legit-marquee" viewBox="-80 -80 1170 760" content="LEGIT." contentrepeat="15" speed="2" textsize="80" pathd="M0,308.472C0,42.37449-21.97408,2.88935,297.72748,2.88935,756.65714,2.88935,1000-47.62774,1000,273.8001c0,281.209,14.092,325.62847-315,325.62847C12.2623,599.42857,0,652.97177,0,308.472Z">
</svg>

<style>
	.legit-marquee {
		font-family: var(--displayfont);
		fill: var(--fgcolor);
	}
</style>

<script>
document.querySelectorAll("svg.legit-marquee").forEach(el => {
	const amount = (el.getAttribute("contentrepeat")) ? el.getAttribute("contentrepeat") : 1
	console.log(amount)
	const content = el.getAttribute("content").concat(" ").repeat(amount)
	const size = (el.getAttribute("textsize")) ? el.getAttribute("textsize") : 24
	
	const pathElement =
	`<path id="loop" fill="transparent" d="${el.getAttribute("pathd")}"></path>`

	const textElement =
	`<text width="100%">
	 	<textPath alignment-baseline="top" xlink:href="#loop" startOffset="0" font-size="${size}" class="movingtextpath">${content}</textPath>
	</text>`
	el.innerHTML = `${pathElement}${textElement.repeat(2)}`


	const path = el.querySelector("#loop")
	const firsttext = el.querySelectorAll(".movingtextpath")[0]
	const secondtext = el.querySelectorAll(".movingtextpath")[1]
	
	let offset = 0
	const s = parseFloat(el.getAttribute("speed"));
	const direction = s/Math.abs(s)
	function updateTextOffset() {
		offset += parseFloat(el.getAttribute("speed"))
		if(offset > path.getTotalLength() || offset < -path.getTotalLength()) {offset = 0}
		firsttext.setAttribute("startOffset", offset)
		secondtext.setAttribute("startOffset", offset-direction*path.getTotalLength()+.5*direction)
		requestAnimationFrame(updateTextOffset)
	}
	updateTextOffset()
});
</script>