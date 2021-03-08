// NEXT AND PREVIOUS LINKS

const prevlink = document.querySelectorAll(".nextpostlink a")[0];
const nextlink = document.querySelectorAll(".nextpostlink a")[1];
const currentarticle = location.href.substr(location.href.lastIndexOf('/') + 1);

const currentarticleindex = posts.indexOf(`${trimFileExtension(currentarticle)}.md`);
console.log("currentarticleindex", currentarticleindex);

if(currentarticleindex == 0) {
	prevlink.style.display = "none";
}
else {
	prevlink.setAttribute("href", `${trimFileExtension(posts[currentarticleindex - 1])}.html`);
}

if(currentarticleindex == posts.length - 1) {
	nextlink.style.display = "none";
}
else {
	nextlink.setAttribute("href", `${trimFileExtension(posts[currentarticleindex + 1])}.html`);
}



// IMAGE SRCING
for (let i = 0; i < document.querySelectorAll("img").length; i++) {
	const element = document.querySelectorAll("img")[i];
	element.setAttribute("src", `../${element.getAttribute("src")}`);
}




// COMMENT SECTION
const commentbox = document.querySelector("#commentbox");
const namebox = document.querySelector("#commentername");
const commentsection = document.querySelector("#commentsection");

var config = {
	apiKey: "AIzaSyBfK03Zp7K5uPYYH1j-5MXrqFh-Z_LGPq8",
	authDomain: "sting-op.firebaseapp.com",
	databaseURL: "https://sting-op.firebaseio.com",
	storageBucket: "sting-op.appspot.com"
};
firebase.initializeApp(config);

const dbpath = 'posts/' + trimFileExtension(currentarticle)

// creating local comments object
var commentsobject;
firebase.database().ref(dbpath).on('value', (snapshot) => {
    const data = snapshot.val();
	commentsobject = data;
	
	updateComments();
});

function writeCommentData(id, name, content, date) {
	firebase.database().ref(dbpath + "/" + id).set({
		name: name,
		id: id,
		content: content,
		date: date
	});
}

function postComment() {
	if(commentsobject == null) {currID = 0;}
	else {currID = commentsobject.length;}
	let d = new Date();

	writeCommentData(`${currID}`, namebox.value, commentbox.value, d.toLocaleString());

	commentbox.value = "";
}

function updateComments() {
	commentsection.innerHTML = "";
	for (let i = commentsobject.length - 1; i >= 0; i--) {
		const item = commentsobject[i];
		if(item) {
			commentsection.innerHTML +=
			`<div class="comment" id="comment${item.id}">
				<div class="commentinfo">
					<p class="commentername"></p>
					<p class="commentdate"></p>
				</div>
				<p class="commentcontent"></p>
			</div>`
			const currcomment = document.querySelector(`#comment${item.id}`);
			currcomment.querySelectorAll(".commentername")[0].innerText = item.name;
			currcomment.querySelectorAll(".commentcontent")[0].innerText = item.content;
			currcomment.querySelectorAll(".commentdate")[0].innerText = item.date.split(",")[0];
		}
	}
}