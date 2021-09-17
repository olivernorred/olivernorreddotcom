var resultcontainer = document.getElementById("resultcontainer");
var richtext = document.getElementById("richtext");
var currentval;
richtext.addEventListener("input", ()=>{
	copybutton.innerText = "Copy output";
	copybutton.classList.remove("successful");
	currentval = richtext.value;
	
	//replace initial &amp;s
	currentval = currentval.replace(/&/g, "&amp;amp;");
	//replace necessary chars
	currentval = currentval.replace(/\</g, "&amp;lt;");
	currentval = currentval.replace(/\>/g, "&amp;gt;");

	//newline replacements
	currentval = currentval.replace(/\n/g, "&lt;/p&gt;<br>&lt;p&gt;");
	currentval = currentval.replace(/&lt;p&gt;&lt;\/p&gt;/g, "&lt;br&gt;");
	currentval = `&lt;p&gt;${currentval}&lt;/p&gt;`;
	currentval = currentval.replace(/&lt;p&gt;&lt;\/p&gt;/g, "");

	//fillcontainer
	resultcontainer.innerHTML = currentval;
});

var copybutton = document.getElementById("copybutton");

function updateClipboard(newClip) {
	navigator.clipboard.writeText(newClip).then(function() {
		// succeeded
	}, function() {
		// failed
	});
}

copybutton.addEventListener("click", ()=> {
	navigator.permissions.query({name: "clipboard-write"}).then(result => {
		if (result.state == "granted" || result.state == "prompt") {
			updateClipboard(resultcontainer.innerText);
			copybutton.classList.add("successful");	
			copybutton.innerText = "Copied";
		}
	});
});