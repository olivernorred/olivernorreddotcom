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

const dbpath = 'posts/' + location.href.split("/blog/")[1]

// creating local comments object
let commentsobject;
firebase.database().ref(dbpath).on('value', snapshot => {
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