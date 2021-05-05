---
layout: base.html
title: Blog \
active: blog
description: I'm Oliver and this is my blog :)
---

<style>
	@font-face {
		font-family: "Taters Fried";
		src: url("/fonts/Taters0.2-Fried.otf");
	}
	#cookbooklink {
		--bg: #fff;
		--altbg: #faeada;
		--acolor: #d89d00;
		background: linear-gradient(
			to right,
			var(--bg) 33%,
			var(--altbg) 33%,
			var(--altbg) 66%,
			var(--bg) 66%,
			var(--bg) 100%
		);
		background-size: .4rem;
	}
	#cookbooklink h1 {
		margin-top: .8rem;
		font-family: 'Taters Fried';
	}
	#cookbooklink h1 a {
		text-decoration-color: black;
		background: linear-gradient(to bottom right, #d89d00, #d8003b);
		-webkit-background-clip: text;
		color: transparent;
	}
</style>

<div id="postlinkscontainer">

<div class="griditem blogpost" id="cookbooklink">


# [Cookbook Collab!](/cookbook/)

</div>

{% for post in collections.posts reversed %}
<div class="griditem blogpost" id="{{ post.url }}">
<h1><a href="{{ post.url }}">{{ post.data.title }}</a></h1>
{% excerpt post %}
</div>
{% endfor %}


</div>