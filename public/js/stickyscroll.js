const spaceHolder = document.querySelector('#content')
const horizontal = document.querySelector('#portfoliogrid')
const mobileWidth = 800

function calcDynamicHeight(ref) {
	const vw = window.innerWidth
	const vh = window.innerHeight
	const objectWidth = ref.scrollWidth
	return objectWidth - vw + vh + 48
}

function setHeightOfContent() {
	if (window.innerWidth > mobileWidth) {
		spaceHolder.style.height = `${calcDynamicHeight(horizontal)}px`
	}
	else {
		spaceHolder.style.height = `fit-content`
	}
}
setHeightOfContent()

window.addEventListener('scroll', () => {
	const sticky = document.querySelector('#portfoliosticky')
	sticky.scrollTo(sticky.offsetTop,0)
})

window.addEventListener('resize', () => {
	setHeightOfContent()
})