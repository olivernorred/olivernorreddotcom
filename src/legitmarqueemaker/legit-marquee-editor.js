let points = []
let currentPointIndex = 0;


function setup() {
	createCanvas(600, 400)
	noStroke()
}

function draw() {
	clear()
	for (const point of points) {
		noStroke()
		
		fill(0, 0, 255)
		ellipse(point.control.x, point.control.y, 10)

		fill(255, 0, 0)
		ellipse(point.anchor.x, point.anchor.y, 10)


		strokeWeight(2)
		stroke(250, 200, 0)
		line(point.anchor.x, point.anchor.y, point.control.x, point.control.y)
	}

	if(mouseIsPressed) {
		strokeWeight(2)
		stroke(250, 200, 0)
		line(points[currentPointIndex].anchor.x, points[currentPointIndex].anchor.y, mouseX, mouseY)
	}
	
}

function mousePressed() {
	fill(255,0,0)
	
	points.push({anchor: {x: mouseX, y: mouseY}, control:[]})
	currentPointIndex = points.length - 1
}

function mouseReleased() {
	points[currentPointIndex].control = {x: mouseX, y: mouseY};
	fill(45)
}