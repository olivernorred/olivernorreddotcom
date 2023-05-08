// get SVG element and namespace
const
	svg = document.getElementById('marqueecanvas'),
	NS = svg.getAttribute('xmlns');


let POINTS = [];
let dString = "";

let canvasWidth = document.querySelector("#width-input");
let canvasHeight = document.querySelector("#height-input");

const path = document.createElementNS(NS, 'path');
path.setAttribute('fill', 'none');
path.setAttribute('stroke', 'black');
path.setAttribute('stroke-width', '2');
path.id = "drawnpath";
svg.appendChild(path);


// click event
svg.addEventListener('mousedown', (clickEvent) => {

	const pt = new DOMPoint();

	// pass event coordinates
	pt.x = clickEvent.clientX;
	pt.y = clickEvent.clientY;

	
	// transform to SVG coordinates
	let svgPt = pt.matrixTransform(svg.getScreenCTM().inverse());
	let svgPtContainer = {
		anchor: svgPt
	}

	let tempDString = dString;
	POINTS.push(svgPtContainer);

	// POINTS.push(svgPt);
	if (POINTS.length == 1) {
		tempDString = `M ${svgPt.x} ${svgPt.y}`
	}
	else {
		tempDString+=`L ${svgPt.x} ${svgPt.y}`
	}
	console.log(dString);



	// add new SVG element
	const circle = document.createElementNS(NS, 'circle');
	circle.setAttribute('cx', svgPt.x);
	circle.setAttribute('cy', svgPt.y);
	circle.setAttribute('r', 4);

	svg.appendChild(circle);
	
	const path = document.getElementById('drawnpath');
	path.setAttribute('d', tempDString);
	


	// Drag to create controlpoints
	svg.addEventListener('mousemove', (moveEvent) => {
		const controlPt = new DOMPoint();
		controlPt.x = moveEvent.clientX;
		controlPt.y = moveEvent.clientY;
		// transform to SVG coordinates
		let svgControlPt = controlPt.matrixTransform(svg.getScreenCTM().inverse());
	
		svgPtContainer.control = svgControlPt
		tempDString = dString;
		if(POINTS.length == 1) {
			tempDString = `M ${svgPt.x} ${svgPt.y}`
		}
		tempDString += `S ${svgPt.x} ${svgPt.y},  `

	})
	
	
	svg.addEventListener('mouseup', ()=> {
		dString = tempDString;
	})
});

