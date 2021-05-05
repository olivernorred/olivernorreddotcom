---
layout: base.html
title: Whatev
active: whatev
---

<style>
@font-face {
	font-family: 'Bizzarrini';
	src: url('/fonts/Bizzarrini-V0_4-VF.ttf');
}

body {background-image: url("../images/ginghambackground-01.png");}


h1 {
	text-align: center;
	font-weight: normal;
	font-family: 'Bizzarrini';
	font-size: 12.5vw;
	font-variation-settings: "opsz" 40, "wght" 100;
	letter-spacing: -0.05em;
}

.whatevsection{
	max-width: 400px;
	margin: 1rem auto;
	padding: .8rem;
	background: white;
	font-weight: bold;
}
</style>

# Gingham Heights

<script>
	var ripplecontainer = document.querySelector('h1');
	var letters = ripplecontainer.innerHTML.split("");
	ripplecontainer.innerHTML = "";
	for (let i = 0; i < letters.length; i++) {
		letters[i] = `<span id="${i}"
		style="
		animation: rippletext 4s ${-i*.1}s infinite
		">${letters[i]}</span>`;
		ripplecontainer.innerHTML += letters[i];
	}
</script>
<style>
	@keyframes rippletext {
		0%{font-variation-settings: 'opsz' 48, 'wght' 100;}
		50%{font-variation-settings: 'opsz' 48, 'wght' 900;}
		100%{font-variation-settings: 'opsz' 48, 'wght' 100;}
	}
</style>


<div id="myinstagram" class="whatevsection">
	<a href="https://www.instagram.com/olivernorred/" style="background: linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c); -webkit-background-clip: text; color: transparent;">this is a link to my instagram profile, on there i post sometimes song covers sometimes selfies with friends, and sometimes, when im feeling a bit cheeky, food pics! (Yum)!</a>
</div>

<div id="myyoutube" class="whatevsection">
	<a href="https://www.youtube.com/c/OliverNorred" style="color:red">this is a link to my youtube channel basically on there i post little videos that are either art or music or computer stuff or funny stuff you might like it! Much love to you and yours.</a>
</div>

<div id="mygithub" class="whatevsection">
	<a href="https://github.com/olivernorred" style="color: #444;">this is a link to my github, where i post code projects n stuff its actually kinda cool if youre into computers and the web and stuff like that. basically yeah you oughta check it out, no?</a>
</div>

<div id="mytwitter" class="whatevsection">
	<a href="https://twitter.com/olivernorred" style="color: #1DA1F2;">this is a link to my twitter, where i post little quips and giggles and stuff. boy, is it fun! i really like twitter because i really like twitter because because because ummm</a>
</div>
