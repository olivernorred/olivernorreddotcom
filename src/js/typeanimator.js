const svgcontainer = document.querySelector("#svgcontainer");

var Path, w = 1;
opentype.load("/fonts/Taters0.2-Baked.otf", function(err, font) {
	if(err) {
		console.error("font not loaded");
	}


	var text = {
		Font: font,
		content: "Make waves!",
		x: 40,
		y: 269,
		size: 135,
		fill: "white",
		stroke: "none"
	};
	onFontLoaded(text); //defines text.Path

});


function onFontLoaded(text) {
	text.Path = text.Font.getPath(text.content, text.x, text.y, text.size);
	console.log(text.Path);
	renderText(text);
	update(text);
}

function renderText(text) {
	text.Path.fill = text.fill;
	text.Path.stroke = text.stroke;
	text.Path.strokeWidth = 1;
	svgcontainer.innerHTML = text.Path.toSVG(5);
}

function update(text) {
	//declare vars
	let g = 0;
	var init_x = [];
	var init_x1 = [];
	var init_x2 = [];
	var init_y = [];
	var init_y1 = [];
	var init_y2 = [];
	for (let i = 0; i < text.Path.commands.length; i++) {
		const element = text.Path.commands[i];
		init_x.push(element.x);
		init_x1.push(element.x1);
		init_x2.push(element.x2);
		init_y.push(element.y);
		init_y1.push(element.y1);
		init_y2.push(element.y2);
	}
	setInterval(function() {

		//all math (complicated functions for cool looking things)
		g+=.1;
		var e;
		for (let i = 0; i < text.Path.commands.length; i++) {
			const item = text.Path.commands[i];
			// item.x += .2*Math.sin(item.y+g);
			item.y = init_y[i] + (150-Math.abs(.5*init_x[i]+100))*(200-init_y[i])*.01
			item.y1 = init_y1[i] + (150-Math.abs(.5*init_x[i]+100))*(200-init_y1[i])*.01
			item.y2 = init_y2[i] + (150-Math.abs(.5*init_x[i]+100))*(200-init_y2[i])*.01

			item.y += 10*Math.sin(item.x + g);
		}

		//final step
		renderText(text);
	}, 1000/60);
}


function doMathX(whichinit_x, whichinit_y, i, g) {
	return whichinit_x[i]*Math.cos(g) - whichinit_y[i]*Math.sin(g);
}
function doMathY(whichinit_x, whichinit_y, i, g) {
	return whichinit_x[i]*Math.sin(g) + whichinit_y[i]*Math.cos(g);
}


// ROTATION AROUND A POINT
// xout = cos * xin - sin * yin + x - cos*x + sin*y
// yout = sin * xin + cos* yin + y - sin*x - cos*y