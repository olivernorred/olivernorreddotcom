const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");


// The Cloud Functions for Firebase SDK to setup triggers and logging.
const { onRequest } = require("firebase-functions/v2/https");
const { onValueWritten } = require("firebase-functions/v2/database");
const { logger } = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
admin.initializeApp();




// Configure your Gmail account for sending emails
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: gmailEmail,
		pass: gmailPassword,
	}
});


const onWrittenFunctionDefault = onValueWritten("/albums/{albumname}/{commentID}", (event) => {
	const original = event.data.val();
	const mailOptions = {
		from: gmailEmail,
		to: "norredoliver@gmail.com",
		subject: `New Album Talk comment from ${original.name}`,
		text: `A new comment was posted on ${event.data.ref}:\n\n${original.name}\n\n${original.content}\n\n${original.date}`,
	};

	return transporter.sendMail(mailOptions)
		.then(() => {
			console.log("Email sent successfully.");
		})
		.catch((error) => {
			console.error("Error sending email:", error);
		});
});
