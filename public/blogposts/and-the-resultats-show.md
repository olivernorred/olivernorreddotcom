# And the Resultats Show...

Where to begin. The results are in (have been in) for a long while now and the truth is clear: I am the winner of the 15th Annual Cookie derby. My first win was way back in '07 and I loved it as much then as I do now. I can't say how much I appreciate the peopoe in the convention that have made it possible. the times are 'a changin and I cannot say how much i love it!

When I gaze upon the moon, the one at night, not the one in the day, I say to myself, "when will those who wish be true." I'm not the first person to come to this event but because the first one was the first one and the test of the eemrgency broadcasting system is true. The first part of this is the second part, but it is only after the first prat that the second part becomes true (and it is this):



| Name | Position | Description |
| :--- | :---: | ---: |
| Jonny Ive | No. 1 | this man is the first and the last to say the things that I want to hear |
| fart McGee | No. 2 | A strange creature that we named because of its blobs and shapes. We love it! |
| Ganel the Wise | No. 2918 | Perhaps the least surprising one on here... I mean are we serious? |
| Frank | No. 6 | everyone loves frank. 'Nuff said! |
| Riley Huston | No. 25 | I came in certain to the last, but nonetheless hitherto unknown the fricin' pretentiousness of the word I cannot understate! | 
| Clobliver clorred | No. 38174e39 | Literally last in the *universe*. Notsure I can sa more | 
| Balne Wittke | No. 29 | Several days after the eruption, Blake crawled out of his room for a glass of hot molten lava. |
| Graham graham Gramgm | No. 25.2 | Graham is the G in GROB. This is true! So much energy he has |

---------------------------
I really appreciate all the things that people say! I'm sure it will become the first part of everything and the things that people say are not what the *actual* positions show. this list is so so subjective but I hope you will have learned something. The important bit of code is this one: 

```js
const path = require('path');
const fs = require('fs');
const del = require('del');
const marked = require("marked");
const templatetext = "###TEMPLATE_TEXT###";

const directoryPath = path.join(__dirname, 'public/blogposts');
var posttemplate;
fs.readFile("blogposttemplate.html", "utf8", (err, data) => {
    if(err) console.log(err);
    posttemplate = data;
});

fs.readdir(directoryPath, (err, files) => {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    //sort files by date modified (mtime)
    files = files.map(fileName => ({
        name: fileName,
        time: fs.statSync('public/blogposts/' + fileName).mtime.getTime()
    }))
    .sort((a, b) => b.time - a.time)
    .map(v => v.name);

    //write to posts url array
    fs.readFile("public/blogpostorder.txt", "utf8", (err, text) => {
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
            'public/js/posts.js',
            `const posts = \`${text}\`.split(",");`,
            (err) => {if (err) console.log(err);}
        );
    })

    //delete all files in public/blog and remake public/blog
    function refreshBlogFolder() {
        del.sync(['public/blog/']);
        fs.mkdirSync("public/blog/");
        console.log("Directory 'public/blog' deleted and restored!")
    }
    refreshBlogFolder();

    //create files from marked.
    var postsarray = [];
    for (let i = 0; i < files.length; i++) {
        // console.log(files[i]);
        //read markdown file
        fs.readFile(`public/blogposts/${files[i]}`, 'utf8', (err, markdowndata) => {
            if(err) console.log(err);

            let postobject = {};
            var mdfilearray = markdowndata.split("\n");
            postobject.title = mdfilearray[0].substr(2).trim();
            postobject.date = mdfilearray[1].substr(3).trim();
            postobject.tags = mdfilearray[2].substr(4).split(", ")
            postsarray.push(postobject);
            console.log(postsarray[i]);

            //create html file
            fs.writeFile(
                `public/blog/${trimFileExtension(files[i])}.html`,
                posttemplate.replace(templatetext, marked(markdowndata)).replace("###TEMPLATE_TITLE###", markdowndata.split("\n")[0].substr(2).trim() + " \\ Blog \\ Oliver Norred"),
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
```

I hope you like it! Notice the first thing that's important: 

```js
            let postobject = {};
            var mdfilearray = markdowndata.split("\n");
            postobject.title = mdfilearray[0].substr(2).trim();
            postobject.date = mdfilearray[1].substr(3).trim();
            postobject.tags = mdfilearray[2].substr(4).split(", ")
            postsarray.push(postobject);
            console.log(postsarray[i]);
```

Basically, it's awesome. Here are the things I need to do:

- [x] create a website
- [ ] get the blogs working
- [ ] eat it!
- [ ]
- [ ]