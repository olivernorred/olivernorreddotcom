// COMMENT SECTION
const commentbox = document.querySelector("#commentbox")
const namebox = document.querySelector("#commentername")
const commentsection = document.querySelector("#commentsection")

const dbpath = 'posts/' + location.href.split("/blog/")[1]

// creating local comments object
let commentsobject

// accessing database
firebase.database().ref(dbpath).on('value', snapshot => {
    const data = snapshot.val()
	if (data === null) {
		commentsobject = []
	}
	else {
		commentsobject = data
	}
	
	updateComments();
});


function postComment() {
	if(commentsobject === null) {currID = 0;}
	else {currID = commentsobject.length}
	let d = new Date()

	firebase.database().ref(dbpath + "/" + id).set({
		name: namebox.value,
		id: `${currID}`,
		content: commentbox.value,
		date: d.toLocaleString()
	});

	commentbox.value = ""
}

function updateComments() {
	commentsection.innerHTML = ""
	for (let i = commentsobject.length - 1; i >= 0; i--) {
		const item = commentsobject[i]
		if(item) {
			commentsection.innerHTML +=
			`<div class="comment" id="comment${item.id}">
				<div class="commentinfo">
					<p class="commentername">${item.name}</p>
					<p class="commentdate">${item.date.split(",")[0]}</p>
				</div>
				<p class="commentcontent">${item.content}</p>
			</div>`
		}
	}
	if(commentsobject.length === 0) {
		commentsection.innerHTML = "there are no comments here . . . YET! 😎"
	}
}


setInterval(() => {
	if(commentsection.innerHTML.length === 0) {
		commentsection.innerHTML = "sometimes ad blockers make comments not show up. i dont have ads but for this reason you might wanna disable your ad blocker on my site!"
	}
}, 500)