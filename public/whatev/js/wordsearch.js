//Declare Everything
var letterlist = Array.from("abcdefghijklmnopqrstuvwxyz");
var randInt;
var insertion;
var n = 0;
var needsToGenerate = true;
var randString = "";
var combinedString = "";
var holder = select.id("combinedstringcontainer");
var wordsString = "wim hof";
var wordsArray = wordsString.toLowerCase().split(" ");

var list = select.id("listofwords");
function changeList() {
	list.innerHTML ="";
	for (let i = 0; i < wordsArray.length; i++) {
		let li = document.createElement("li");
		li.classList.add("wordlistitem");
		li.appendChild(document.createTextNode(`${wordsArray[i]} ×`));
		list.appendChild(li);
		select.id("regenbutton").disabled = false;
	}
	if(wordsArray.length <= 0) {
		select.id("regenbutton").disabled = true;
	}
}
changeList();
	

///Highlight Word
function generate() {
	if(needsToGenerate){
		randString = "";
		for (let i = 0; i < 10000; i++) {
			randInt = Math.floor(Math.random()*letterlist.length);
			randString += letterlist[randInt];
		}
		combinedString = `${combinedString}${randString}`;
		for (let i = 0; i < wordsArray.length; i++) {
			n = combinedString.search(wordsArray[i]);
			if(n >= 0) {
				console.log(n, wordsArray[i]);
				insertion = `<b>${wordsArray[i]}</b>...<span class="yellow">${wordsArray[i]}</span>`;
				combinedString = `${combinedString.slice(0,n)}${insertion}`;
				holder.innerHTML = combinedString;
				needsToGenerate = false;
				select.id("stringlength").innerHTML = `Generated ${(combinedString.length-insertion.length+wordsArray[i].length).toLocaleString()} characters to find word.`;

			}
		}
		generate();
	}
}
generate();


function regenerateButton(){
	needsToGenerate = true;
	combinedString = "";
	generate();
}


function createLoop(){
	var iteration = 0;
	function loop() {
		regenerateButton();
		if(combinedString.length-insertion.length+3 < 4) {
			console.log(`On iteration no. ${iteration}`);
		}
		else {
			iteration++;
			loop();
		}
	}
	loop();
}



//CUSTOM wordz

//on change
var custominput = select.id("customwordsbox");
custominput.addEventListener("change", () => {
	if((/^[a-zA-Z]+$/.test(custominput.value)) && !wordsArray.includes(custominput.value.toLowerCase())){
		wordsArray.push(custominput.value.toLowerCase());
		changeList();
		custominput.classList.remove("badinput");
		custominput.value = "";
		prepareToDeleteListItem();
	}
	else if(custominput.value === "") {
		//DO NOTHING
	}
	else{
		console.log("bad inputttt!!!");
		custominput.classList.add("badinputsubmitted");
	}
});


//while typing
custominput.addEventListener("input", () => {
	if(/^$|^[a-zA-Z]+$/.test(custominput.value) && !wordsArray.includes(custominput.value.toLowerCase())){
		custominput.classList.remove("badinput");
	}
	else{
		custominput.classList.add("badinput");
	}
});
custominput.addEventListener("animationend", () => {
	custominput.classList.remove("badinputsubmitted");
});


//delete words
var listitems;
function prepareToDeleteListItem() {
	listitems = select.class("wordlistitem");
	for (let i = 0; i < listitems.length; i++) {
		listitems[i].addEventListener("click", () => {
			console.log(`item clicked ${listitems[i].innerHTML}`);
			wordsArray.splice(i,1);
			changeList();
			prepareToDeleteListItem();
		});
	}
}
prepareToDeleteListItem();