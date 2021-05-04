// create variable and define as array
var saves = [];
var sessionlength;
//set localStorage item if it doesn't exist
if(!(localStorage.getItem("saves"))) {
	localStorage.setItem("saves", JSON.stringify(saves));
}
//if it DOES exist, set in-script variable saves to localStorage value.
else {
	saves = JSON.parse(localStorage.getItem("saves"));
}





function addItemToSaves() {
	saves.unshift({id: saves.length, content: `Document ${saves.length}`});
	localStorage.setItem("saves", JSON.stringify(saves));
	console.log(JSON.parse(localStorage.getItem("saves")));
}

var newdocumentbuttonelement = `<div class="griditem" id="newdocumentbutton">
<svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="20" width="10" height="50" fill="black"/>
<rect y="20" width="50" height="10" fill="black"/>
</svg>
</div>`;

function updateGrid() {
	var griditemstoadd = "";
	for (let i = 0; i < saves.length; i++) {
		griditemstoadd += `<div class="griditem save" id="${saves[i].id}">${saves[i].content}</div>`
	}
	document.querySelector("#documentgrid").innerHTML = 
	`${newdocumentbuttonelement}
	${griditemstoadd}
	`
	document.querySelector("#newdocumentbutton").addEventListener("click", ()=> {
		console.log("clicked");
		addItemToSaves();
		updateGrid();
	});

	for (let i = 0; i < document.querySelectorAll(".save").length; i++) {
		const element = document.querySelectorAll(".save")[i];
		element.addEventListener("click", ()=>{
			window.location.href = `document.html?id=${element.id}`

		})
	}
	//DELETING items
	
	for (let i = 0; i < document.querySelectorAll(".save").length; i++) {
		const element = document.querySelectorAll(".save")[i];
		element.addEventListener("contextmenu", (e)=>{
			e.preventDefault();
			console.log('right click');

			let clickedsave = saves.map(item => item.id)
				.indexOf(parseInt(element.id));
			saves.splice(clickedsave, 1);
			localStorage.setItem("saves", JSON.stringify(saves));
			updateGrid();
		});


		
	}
}



updateGrid();