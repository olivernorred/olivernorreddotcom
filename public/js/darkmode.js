function updateDarkMode() {
	if(localStorage.getItem("dark") === "true") {
		document.body.classList.add("darkmode")
		document.querySelector("#darkmode").checked = true
	}
	else {
		document.body.classList.remove("darkmode")
		document.querySelector("#darkmode").checked = false
	}

	if(window.location.href.indexOf('/cookbook/') > -1) {
		console.log("Cookbook page means no dark mode.")
		document.body.classList.remove("darkmode")
	}
	console.log("updated dark mode");
}
updateDarkMode();

document.querySelector("#darkmode").addEventListener("click", () => {
	
	if(localStorage.getItem("dark") === "true") {localStorage.setItem("dark", "false")}
	else {localStorage.setItem("dark", "true")}
	console.log(localStorage.getItem("dark"))
	updateDarkMode()
})