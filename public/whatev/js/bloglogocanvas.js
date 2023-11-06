var ctx = document.getElementById("o-logo").getContext("2d");
var c;
var d;
var rot;
var color;
var listofellipses = new Array();
function getColor(){ 
	return "hsl(" + 50 * Math.random() + ',' +
	(100 + 70 * Math.random()) + '%,' + 
	(-10 + 10 * Math.random()) + '%)';
}
function draw() {
	ctx.clearRect(0, 0, 1200, 1200);
	for(let i = 0; i<listofellipses.length; i++) {
		ctx.strokeStyle = listofellipses[i].color;
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.ellipse(600, 600, listofellipses[i].w, listofellipses[i].h, listofellipses[i].rot, 0, 2*Math.PI);
		ctx.stroke();
	}
}
setInterval(function() {
	c = Math.random()*100;
	d = Math.random()*100;
	rot = Math.random()*Math.PI;
	// color = colorArray[Math.floor(Math.random()*colorArray.length)];
	color = getColor();
	for(let i = 0; i<listofellipses.length; i++) {
		if(listofellipses[i].w > 480) {
			listofellipses.splice(i, 1);
			// listofellipses.push({w: c, h: d, rot: rot, color: color});
		}
		listofellipses[i].w += 2;
		listofellipses[i].h += 2;
	}
	// listofellipses.shift();
	listofellipses.push({w: c, h: d, rot: rot, color: color});
	draw();
}, 1000/60);