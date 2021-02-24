const path = require("path");
const fs = require("fs");
const del = require("del");
const marked = require("marked");
const templatetext = "###TEMPLATE_TEXT###";

const directoryPath = path.join(__dirname, "public/blogposts");
let posttemplate;
fs.readFile("blogposttemplate.html", "utf8", (err, data) => {
	if(err) console.log(err);
	posttemplate = data;
});

fs.readdir(directoryPath, (err, files) => {
	//handling error
	if (err) {return console.log("Unable to scan directory: " + err);}


	// TWO STEPS:

	// 1. read blogpostorder.txt and write to posts url array
	fs.readFile("public/blogposts/blogpostorder.txt", "utf8", (err, text) => {
		if(err) console.log(err);
		text = text.trim().split("\n")
		for (let i = 0; i < text.length; i++) {
			text[i] = formatMarkdownLinks(text[i]);
			if(!(files.includes(text[i]))) {
				console.log(`${text[i]} is not a file in public/blogposts`);
				text.splice(i,1)
			}
		}
		
		fs.writeFile(
			"public/js/posts.js",
			`const posts = \`${text}\`.split(",");`,
			(err) => {if (err) console.log(err);}
		);
	})

	// 2. create HTML files from marked(markdownfiles).
	var postsarray = [];
	for (let i = 0; i < files.length; i++) {
		console.log(files[i]);
		//read markdown file
		fs.readFile(`public/blogposts/${files[i]}`, "utf8", (err, markdowndata) => {
			if(err) console.log(err);
			//create html file
			fs.writeFile(
				`public/blog/${trimFileExtension(files[i])}.html`,

				posttemplate
					.replace(
						templatetext,
						marked(markdowndata)
					)
					.replace(
						"###TEMPLATE_TITLE###",
						markdowndata.split("\n")[0].substr(2).trim() + " \\ Blog \\ Oliver Norred"
					),
				err => {if(err) console.log(err);}
			);

		});
	}
});



function trimFileExtension(fullname) {
	return fullname.split(".")[0];
}

function formatMarkdownLinks(title) {
	return title.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim().replace(/\s+/g, "-").concat(".md");
}