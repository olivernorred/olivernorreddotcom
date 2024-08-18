const prompts = [
	"YIKES. IT'S YOUR COWORKER'S BIRTHDAY, AND YOU FORGOT TO GET THEM THEIR FAVORITE SLIME. SEND THEM A SLIME FAX WITH WELL WISHES.",
	"QUICK! YOUR BOSS NEEDS 15 RANDOM NUMBERS PRINTED IN PURE SLIME. YOU'RE ALREADY ON THIN ICE... BETTER LEAVE AN APOLOGY OR A 'THANKS FOR YOUR PATIENCE' TOO.",
	"JENNY FROM SLIME ACCOUNTING IS SWAMPED WITH WORK AND YOUR SLIME PAY IS LATE. SEND A POLITE BUT URGENT SLIME FAX ASKING ABOUT THAT.",
	"THE NEW TRAINEE IS NOT DOING SO WELL. SEND A SLIME FAX LETTING THEM KNOW THAT THEY NEED TO BE LET GO, BUT LET THEM DOWN EASY.",
	"MARKETING IS CROWDSOURCING SYNONYMS: WHAT ARE TEN OTHER WORDS FOR 'SLIME'?",
	"THE BREAK ROOM HAS SLIME IN THE SINK AGAIN... SEND A MESSAGE TO YOUR COWORKERS ASKING THEM TO KEEP SLIME AND FOOD SEPARATE.",
	"NICE! JAKE FROM THE THIRD FLOOR BROUGHT SLIME BALLS AGAIN, BUT YOU'RE NOT SURE IF IT'S A SHARING SITUATION OR IF IT'S JUST A THIRD FLOOR THING. SLIME FAX THEM A QUICK QUESTION AND ALSO ASK WHETHER THE SLIME BALLS ARE FOR JUST ANYONE.",
	"OKAY... LOOKS LIKE BRANDON FROM FROM COMPLEX B BROUGHT DONUTS, AND YOU ALREADY MADE THE TREK OVER HERE. JUST SEND A SLIME FAX JUST LETTING THEM KNOW YOU'RE TAKING TWO-THIRDS OF A DONUT. NORMALLY YOU'RE SUPPOSED TO LEAVE A NOTE SPECIFYING WHO EXACTLY CAN LAY CLAIM TO THESE SWEET TREATS SO YOU DON'T HAVE TO GO THROUGH THIS WHOLE RIGAMAROLE.",
	"GUESS WHO'S ON THE OTHER END! IT'S THE SLIME POPE. WE SOMEHOW GOT HIS NUMBER FROM THE INTERNET. HE WANTS TO HEAR FROM YOU ABOUT YOUR DAY. JUST CHECKIN IN. IT'S BEEN LIKE, WHAT, TWO WEEKS SINCE YOU LAST SPOKE? THAT'S CRAZY BRO, HOPE ALL IS WELL.",
	"OH, CRAP. YOUR BOSS NEEDS LAST YEAR'S EARNINGS NOW, BUT YOU SPILLED COFFEE ON THE SLIME DRIVE A YEAR AGO AND YOU'VE BEEN MEANING TO TELL EVERYONE, BUT IT'S TOO LATE NOW, YOU'RE IN TOO DEEP, AND YOU'RE JUST GONNA HAVE TO MAKE UP NUMBERS AGAIN. GO.",
	"MIDGE FROM HR, OUT OF NOWHERE, SLIME FAXES YOU: WHAT ARE THE SEVEN 'S's OF SENDING A SLIME FAX? I'LL WAIT.",
];



document.querySelector("#scenariocontainer").innerHTML = "> " + prompts[Math.floor(Math.random()*prompts.length)];


// COMMENT SECTION
const commentbox = document.querySelector("#commentbox")
const namebox = document.querySelector("#commentername")
const commentsection = document.querySelector("#commentsection")

const dbpath = 'slimefax/'

// creating local comments object
let commentsobject;
let currID = null;

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
	document.querySelector("#commentform").style = "display: none;"
	document.querySelector("#thankyoumessage").style = "display: block;"
	if (commentsobject === null) { currID = 0; }
	else { currID = commentsobject.length }
	let d = new Date()
	// let content = commentbox.value.replace(/(\r\n|\r|\n)/g, "\\n");

	firebase.database().ref(dbpath + "/" + currID).set({
		name: namebox.value,
		id: `${currID}`,
		content: commentbox.value,
		date: d.toLocaleString()
	});
	console.log(commentbox.value);

	commentbox.value = "";

}

function updateComments() {
	commentsection.innerHTML = ""
	for (let i = commentsobject.length - 1; i >= 0; i--) {
		const item = commentsobject[i]
		if (item) {
			commentsection.innerHTML +=
				`<div class="comment" id="comment${item.id}">
				<div class="commentinfo">
					<p class="commentername">${item.name}</p>
					<p class="commentdate">${item.date.split(",")[0]}</p>
				</div>
				<p class="commentcontent">${item.content.replace(/(\r\n|\r|\n)/g, "<br>") }</p>
			</div>`
		}
	}
	if (commentsobject.length === 0) {
		commentsection.innerHTML = "there are no comments here . . . YET! 😎"
	}
	document.querySelector("#comment" + currID).style.background = "#d4ffd7"
}


setInterval(() => {
	if (commentsection.innerHTML.length === 0) {
		commentsection.innerHTML = "sometimes ad blockers make comments not show up. i dont have ads but for this reason you might wanna disable your ad blocker on my site!"
	}
}, 500)