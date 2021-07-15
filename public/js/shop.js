// var shopitems;

fetch('/js/shop.json')
	.then(response => response.json())
	.then(data => {
		// shopitems = data
		console.log(data)
		renderShelf(data)
	} )


function renderShelf(shopitems) {
	let shelfstring = ``
	
	shopitems.forEach(item => {
		shelfstring += 
		`
		<article class="shopitem">
			<img src="${item.image}">
			<p class="shopitemname">${item.name}</p>
			<p class="shopitemprice">$${item.price}</p>
		</article>
		`
	});
	console.log(shelfstring);
	document.querySelector('#shopshelf').innerHTML = shelfstring
}