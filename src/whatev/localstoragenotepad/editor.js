// create variable and define as array
var saves = [];

//set localStorage item if it doesn't exist
if(!(localStorage.getItem("saves"))) {
	localStorage.setItem("saves", JSON.stringify(saves))
}
//if it DOES exist, set in-script variable saves to localStorage value.
else {
	saves = JSON.parse(localStorage.getItem("saves"));
}

var currentsave = saves.map(item => item.id)
	.indexOf(parseInt(window.location.href.split("?id=")[1]));



const editor = document.querySelector("#editor");
editor.innerHTML = `${saves[currentsave].content}`;

editor.addEventListener("keyup", ()=> {
	saves[currentsave].content = editor.innerHTML;
	localStorage.setItem("saves", JSON.stringify(saves));
});

editor.addEventListener("keypress", ()=>{
});

function replaceQuotes(string) {
	return string
	/* opening singles */
	.replace(/(^|[-\u2014\s(\["])'/g, "$1\u2018")

	/* closing singles & apostrophes */
	.replace(/'/g, "\u2019")

	/* opening doubles */
	.replace(/(^|[-\u2014/\[(\u2018\s])"/g, "$1\u201c")

	/* closing doubles */
	.replace(/"/g, "\u201d")

	/* em-dashes */
	.replace(/--/g, "\u2014");
}

// select all the content in the element
document.execCommand('selectAll', false, null);
// collapse selection to the end to move cursor to end
document.getSelection().collapseToEnd();