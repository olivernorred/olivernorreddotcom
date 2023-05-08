

// width and height
let widthinput = document.querySelector("#widthinput");
let heightinput = document.querySelector("#heightinput");

let width = 200;
let height = 100;
let originalDimensions = [width,height];
let draggingDimensions = [false, false];
const dragDelta = 3;
let startX;
let startY;


document.querySelectorAll('.dimensioninput').forEach((el, index) => {
	el.addEventListener('mousedown', (event) => {
		startX = event.clientX;
		startY = event.clientY;
		originalDimensions[index] = parseFloat(el.value);
		draggingDimensions[index] = true;
	})
})

document.querySelectorAll('.dimensioninput').forEach((el, index) => {
	el.addEventListener('mouseup', () => {
		el.select();
	})
	el.addEventListener('change', updateMarquee)
	// el.addEventListener('mousemove', updateMarquee)
})
document.querySelectorAll('.dimensioninput').forEach((el, index) => {
	
})

window.addEventListener('mousemove', (event)=> {
	if(draggingDimensions.includes(true)) {
		event.preventDefault()
		updateMarquee();
	}
	if(draggingDimensions[0]) {
		difference = Math.floor((event.clientX - startX));
		widthinput.value = originalDimensions[0] + difference;
	}
	if(draggingDimensions[1]) {
		difference = Math.floor((event.clientY - startY));
		heightinput.value = originalDimensions[1] + difference;
	}
	// updateMarquee();
})
window.addEventListener('mouseup', (event)=> {
	draggingDimensions = [false, false];
}) 


// content input
document.querySelector("#contentinput").addEventListener('keyup', updateMarquee)
document.querySelector("#contentinput").addEventListener('change', updateMarquee)

// font input
document.querySelector("#fontinput").addEventListener('change', ()=>{
	if(document.querySelector("#fontinput").value == ""){
		document.querySelector("#fontinput").value = "Times New Roman";
	}
	updateMarquee();
})
document.querySelector("#fontinput").addEventListener('keyup', updateMarquee)

// text size input
document.querySelector("#textsizeinput").addEventListener('change', updateMarquee);
document.querySelector("#textsizeinput").addEventListener('keydown', updateMarquee);


// speed range slider
let speedInputBeingChanged = false;
document.querySelector("#speedinput").addEventListener('change', updateMarquee)
document.querySelector("#speedinput").addEventListener('mousedown', ()=>{
	speedInputBeingChanged = true;
})
window.addEventListener('mouseup', () => {
	if(speedInputBeingChanged) {
		speedInputBeingChanged = false;
	}
})
document.querySelector("#speedinput").addEventListener('mousemove', ()=>{
	if(speedInputBeingChanged) {
		updateMarquee();
	}
})


// copy button

const copyButton = document.querySelector("#copybutton");
copyButton.addEventListener('click', ()=> {
	const copyText = document.querySelector("#codesnippet");
	// Select the text field
	copyText.select();
	copyText.setSelectionRange(0, 99999); // For mobile devices

	// Copy the text inside the text field
	navigator.clipboard.writeText(copyText.value);

	// Alert the copied text
	console.log("Copied the text: " + copyText.value);
})


let legitMarqueeString = "";
let currPathD = "";
function updateMarquee() {

	// view box size
	document.querySelector("#displaycontainer").style.width = widthinput.value + "px";
	document.querySelector("#displaycontainer").style.height = heightinput.value + "px";
	document.querySelector("#canvasanddimensions").style.width = widthinput.value + "px";
	document.querySelector("#canvasanddimensions").style.height = parseFloat(heightinput.value) + 32 + "px";
	document.querySelector("#legitmarqueedisplay").setAttribute('viewBox', `0 0 ${widthinput.value} ${heightinput.value}`)

	
	

	// speed preview number
	document.querySelector("#speeddisplay").innerHTML = document.querySelector("#speedinput").value;

	// update the code snippet string
	// parse pathd from hidden svg element
	if (document.querySelector("#svgcontainer").innerHTML) {
		currPathD = document.querySelector("#svgcontainer").innerHTML.split('path d="')[1].split('"')[0];
	}
	// document.querySelector("#pathddisplay").innerHTML = currPathD;
	document.querySelector("#codesnippet").value = 
`<svg class="legit-marquee"
    viewBox="${document.querySelector("#legitmarqueedisplay").getAttribute('viewBox')}"
    content="${document.querySelector("#contentinput").value}"
    pathd="${currPathD ? currPathD : 'm-24,63c0,-66 246,78 246,-12'}"
    speed="${document.querySelector("#speedinput").value}"
    textsize="${document.querySelector("#textsizeinput").value}"
    style="font-family: '${document.querySelector("#fontinput").value}';"
></svg>
<script src="https://cdn.jsdelivr.net/gh/olivernorred/legit-marquees/legit-marquees.js"></script>`


	// update the preview marquee
	document.querySelector("#legitmarqueedisplay").setAttribute("content", document.querySelector("#contentinput").value);
	document.querySelector("#legitmarqueedisplay").setAttribute("pathd", currPathD);
	document.querySelector("#legitmarqueedisplay").setAttribute("speed", parseFloat(document.querySelector("#speedinput").value));
	document.querySelector("#legitmarqueedisplay").setAttribute("textsize", parseFloat(document.querySelector("#textsizeinput").value));
	document.querySelector("#legitmarqueedisplay").setAttribute("style", "font-family: " + document.querySelector("#fontinput").value) + ";";
	updateLegitMarquees();
}
updateMarquee();