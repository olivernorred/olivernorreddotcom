const spaceHolder = document.querySelector('#content')
const horizontal = document.querySelector('#portfoliogrid')
spaceHolder.style.height = `${calcDynamicHeight(horizontal)}px`

function calcDynamicHeight(ref) {
	const vw = window.innerWidth
	const vh = window.innerHeight
	const objectWidth = ref.scrollWidth
	return objectWidth - vw + vh + 48
}

window.addEventListener('scroll', () => {
	const sticky = document.querySelector('#portfoliosticky')
	sticky.scrollTo(sticky.offsetTop,0)
})

window.addEventListener('resize', () => {
	spaceHolder.style.height = `${calcDynamicHeight(horizontal)}px`
})