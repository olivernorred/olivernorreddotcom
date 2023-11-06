var parallaxes = document.querySelectorAll(".parallax");
console.log(parallaxes)

window.addEventListener("scroll", ()=>{
	for (let i = 0; i < parallaxes.length; i++) {
		const element = parallaxes[i];
		element.style.display = "block"
		element.style.transform = `translate(0, ${(.1*element.getAttribute("parallax-depth"))*(window.scrollY)}px)`;
	}
});