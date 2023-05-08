var clickTolerance = 12;
settings.handleSize = clickTolerance;
var thickStroke = 5;

var stateHistory = [];

function resizeView(newWidth, newHeight) {
	view.viewSize = new Size(newWidth, newHeight);
}
view.onFrame = function(event) {
	resizeView(parseFloat(widthinput.value), parseFloat(heightinput.value));
}

var originalPath = [
	"Path",
	{
		"applyMatrix": true,
		"segments": [
			[
				[
					250,
					99
				],
				[
					-28,
					34
				],
				[
					28,
					-34
				]
			],
			[
				[
					163,
					22
				],
				[
					71,
					13
				],
				[
					-71,
					-13
				]
			],
			[
				[
					37,
					70
				],
				[
					9,
					-31
				],
				[
					-9,
					31
				]
			],
			[
				[
					134,
					104
				],
				[
					-27,
					-7
				],
				[
					27,
					7
				]
			]
		],
		"closed": true,
		"fillColor": [
			"hsb",
			225.9967,
			1,
			1,
			0
		],
		"strokeColor": [
			0.52941,
			0.80784,
			0.92157
		]
	}
]
var path = originalPath;
var types = ['point', 'handleIn', 'handleOut'];

function findHandle(point) {
	for (var i = 0, l = path.segments.length; i < l; i++) {
		for (var j = 0; j < 3; j++) {
			var type = types[j];
			var segment = path.segments[i];
			var segmentPoint = (type == 'point')
				? segment.point
				: segment.point + segment[type];
			var distance = (point - segmentPoint).length;
			if (distance < clickTolerance) {
				return {
					type: type,
					segment: segment,
					index: i
				};
			}
		}
	}
	return null;
}

var currentSegment, mode, type;
function onMouseDown(event) {
	if (currentSegment)
		currentSegment.selected = false;
	mode = type = currentSegment = null;

	if (!path || path == originalPath) {
		path = new Path();
		path.fillColor = {
			hue: 360 * Math.random(),
			saturation: 1,
			brightness: 1,
			alpha: 0
		};
		path.strokeWidth = thickStroke;
		path.strokeColor = "#d4ac39";
		path.style.selectedColor = new Color("#d4ac39");
	}
	

	var result = findHandle(event.point);
	if (result) {
		currentSegment = result.segment;
		type = result.type;
		if (path.segments.length > 1 && result.type == 'point'
			&& result.segment.index == 0 && path.closed == false) {
			mode = 'close';
			path.closed = true;
			currentSegment.selected = true;
			// path.selected = false;
			// path = null;
		}

	}
	else if(path.closed) {
		
	}

	if (mode != 'close') {
		mode = currentSegment ? 'move' : 'add';
		if (!currentSegment)
			currentSegment = path.add(event.point);
		currentSegment.selected = true;
	}

	
	// updateSVG();
}

// deleting segment
tool.onKeyDown = function (event) {
	if (event.key == "delete" || event.key == "backspace") {
		if(currentSegment.selected) {
			currentSegment.remove();
			for(var i=0; i<currentSegment.index; i++) {
				path.segments.push(path.segments.shift());
			}
			path.closed = false;
			updateSVG();
		}
	}

	if(Key.isDown('control') && !Key.isDown('shift') && event.key == "z") {
		// restore previous state
	}
}
var mouseDragging = false;
function onMouseDrag(event) {
	mouseDragging = true;
	if (mode == 'move' && type == 'point') {
		currentSegment.point = event.point;
	} else if (mode != 'close') {
		var delta = event.delta.clone();
		if (type == 'handleOut' || mode == 'add')
			delta = -delta;
		currentSegment.handleIn += delta;
		currentSegment.handleOut -= delta;
	}
	updateSVG();
}



function onMouseUp() {
	mouseDragging = false;
	if(!mouseInside) {
		path.selected = false;
	}
	updateSVG();
}


var mouseInside = false;
function updateSVG() {
	document.querySelector("#svgcontainer").innerHTML = "";
	document.querySelector("#svgcontainer").appendChild(project.exportSVG());
	updateMarquee();

	if (path) {
		view.onMouseEnter = function (event) {
			path.selected = true;
			path.strokeWidth = thickStroke;
			mouseInside = true;
		}
		view.onMouseLeave = function (event) {
			mouseInside = false;
			if(!mouseDragging) {
				path.selected = false;
				path.strokeWidth = 0.1;
			}
		}
	}
}



