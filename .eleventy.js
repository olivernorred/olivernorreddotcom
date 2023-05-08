module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy('./src/css')
	eleventyConfig.addWatchTarget('./src/css')

	eleventyConfig.addPassthroughCopy('./src/fonts')
	eleventyConfig.addWatchTarget('./src/fonts')

	eleventyConfig.addPassthroughCopy('./src/js')
	eleventyConfig.addWatchTarget('./src/js')

	eleventyConfig.addPassthroughCopy('./src/images')
	eleventyConfig.addWatchTarget('./src/images')

	eleventyConfig.addPassthroughCopy('./src/whatev')
	eleventyConfig.addWatchTarget('./src/whatev')
	
	eleventyConfig.addPassthroughCopy('./src/legitmarqueemaker')
	eleventyConfig.addWatchTarget('./src/legitmarqueemaker')
	
	eleventyConfig.addPassthroughCopy('./src/OliverNorred-Resume.pdf')
	eleventyConfig.addWatchTarget('./src/OliverNorred-Resume.pdf')
	
	eleventyConfig.addPassthroughCopy('./src/sitemap.xml')
	eleventyConfig.addWatchTarget('./src/sitemap.xml')
	



	eleventyConfig.addShortcode('excerpt', article => extractExcerpt(article))


	  
	return {
		passthroughFileCopy: true,
		dir: {
			input: "src",
			output: "public",
			includes: "_templates"
		}
	}
}

function extractExcerpt(article) {
	if (!article.hasOwnProperty('templateContent')) {
	  console.warn('Failed to extract excerpt: Document has no property "templateContent".');
	  return null;
	}
   
	let excerpt = null;
	const content = article.templateContent;
	
	lines = content.split("\n")
	lines.forEach( (line, index) => {
		if (line.startsWith("<h1")) {
			lines.splice(index, 1)
		}
	})

	excerpt = lines.join("\n").split("<a").join("<span")
	.split("</a").join("</span")
	.split(`src="`).join(`src="../`)
	.split(`<img`).join(`<img style="display: none"`)
	.split(`<p class="caption"`).join(`<p class="caption" style="display:none"`)
	.split(`</h2>`)[0] + `</h2>`
   
	return excerpt;
}