
const grid = document.querySelector("#postlinkscontainer");

if(document.querySelector("#postlinkscontainer")) {
	
	for (let i = 0; i < posts.length; i++) {
		grid.innerHTML +=
		`<div class="griditem blogpost" id="${posts[i]}"></div>`
	}

	for (let i = 0; i < document.querySelectorAll(".griditem").length; i++) {
		const container = document.querySelectorAll(".griditem")[i];
		// fetch the blogpost (.md) with the same name as the id of the "grid item" container
		fetch(`../blogposts/${container.id}`)
			.then(response => response.text())
			.then(text => {
				// convert to HTML from markdown, change links to spans for "tab" users.
				container.innerHTML += marked(text).replaceAll("<a", "<span").replaceAll("</a", "</span").replaceAll(`src="`, `src="../`);
				// split off first line (title) and linkify
				container.querySelectorAll("h1")[0].innerHTML = `<a href="${trimFileExtension(posts[i])}.html">${container.querySelectorAll("h1")[0].innerHTML}</a>`;

				addWhiteSpaceBreakBlocker();
			})
	}

}
else {
	addWhiteSpaceBreakBlocker();
}

// NAME NOWRAP e.g. "Oliver Norred, 7
				// March 2021"
function addWhiteSpaceBreakBlocker() {
	document.querySelectorAll(".blogpost h2").forEach(e => {
		e.innerHTML = e.innerHTML.replace(
			e.innerHTML.split(", ")[1],
			`<span style="white-space: nowrap">${e.innerHTML.split(", ")[1]}</span>`
		)
	})
}

function trimFileExtension(fullname) {
	return fullname.split(".")[0];
}


// POST TITLES SEARCH

const searchbox = document.querySelector(".searchbox");
const griditems = document.querySelectorAll(".griditem");

if(searchbox) {
	searchbox.addEventListener("keyup", ()=> {
		for (let i = 0; i < griditems.length; i++) {
			const element = griditems[i];
			element.style.display = "block";
		}
	
		for (let i = 0; i < posts.length; i++) {
			const element = posts[i];
			if(!(posts[i].toLowerCase().replaceAll(/-/g, "")
				.includes(searchbox.value.toLowerCase().replaceAll(/\s/g, "")))) {
				console.log(posts[i]);
				griditems[i].style.display = "none";
			}
		}
	
	
		if(searchbox.value != "" && searchbox.value != " ") {
			grid.classList.add("searched");
		}
		else {
			grid.classList.remove("searched");
		}
	})
}