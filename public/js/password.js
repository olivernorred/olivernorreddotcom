const passwordwall = document.createElement("div");

passwordwall.innerHTML = `
<form onsubmit="removeWall(); return false;">
<label for="passwordinput">This page is in production! If you know the password you can look at it tho:</label><br><br>
<input id="passwordinput" type="text">

<input type="submit" value="enter">
</form>
`


passwordwall.setAttribute("style", "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: white; display: grid; place-items; center; padding: 1rem;")


document.body.appendChild(passwordwall)

function removeWall() {
	if(document.querySelector("#passwordinput").value === "mynamajeff"){
		passwordwall.style.display = "none"
	}
}