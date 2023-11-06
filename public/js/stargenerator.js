

let STARS = []

for(let i=0; i<20; i++) {
	star_src = `/images/drawn/stars/star ${i%9 + 1}.png`
	let scontainer  = document.createElement('div')
	scontainer.classList.add('starcontainer')
	scontainer.classList.add('parallax')
	scontainer.setAttribute('parallax-depth', -i/3 - 1);
	let s = document.createElement('img')
	s.classList.add('star')
	s.setAttribute('src', star_src)
	s.style.width = 100-100*i/60 + 'px'
	s.style.animationDelay = -.1*i + "s"
	scontainer.appendChild(s)
	document.body.appendChild(scontainer)
	
	STARS[i] = scontainer;
}

// randomize order
shuffle(STARS)

const cols = 6;

function setStars() {
	
	for (let i = 0; i < STARS.length; i++) {
		const s = STARS[i]
		s.x_coord = (i % cols) * (.8*window.innerWidth)/cols - Math.random()*(window.innerWidth/cols)+(.2*window.innerWidth);
		s.y_coord = Math.floor(i/cols) * window.innerHeight/cols + Math.random() * 100 + 100;
		s.style.left = s.x_coord + "px"
		s.style.top = s.y_coord + "px"
	}
}

addEventListener('resize', setStars);
setStars();

function shuffle(array) {
	let currentIndex = array.length,  randomIndex;
  
	// While there remain elements to shuffle...
	while (currentIndex != 0) {
  
	  // Pick a remaining element...
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex--;
  
	  // And swap it with the current element.
	  [array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}
  
	return array;
}
