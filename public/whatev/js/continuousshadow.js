function generateContinuousShadow(element, xo, yo, color) {
	var string = "";
	
	for (let i = 1; i < Math.max(xo,yo); i+=4) {
		string += `${i*xo/Math.max(xo,yo)}px ${i*yo/Math.max(xo,yo)}px ${color},`;
	}
	string = string.substr(0, string.length-1);
	if(element.style.textShadow != "") {
		element.style.textShadow = `${element.style.textShadow},${string}`;
	}
	else {
		element.style.textShadow = string;
	}

	
}

for (let i = 0; i < document.querySelectorAll(".continuousshadow").length; i++) {
	const element = document.querySelectorAll(".continuousshadow")[i];
	const offsets = element.getAttribute("offset").split(" ");
	generateContinuousShadow(element, offsets[0], offsets[1], "var(--altbgcolor)");
}