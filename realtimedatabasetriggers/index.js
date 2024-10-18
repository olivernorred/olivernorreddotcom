const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

// Initialize Firebase Admin
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

// Define the Cloud Function
exports.sendEmailOnNewComment = functions.database.ref("/comments/{commentId}")
	.onCreate((snapshot, context) => {
		const commentData = snapshot.val();

		const mailOptions = {
			from: gmailEmail,
			to: "recipient-email@gmail.com",
			subject: "New Comment Posted",
			text: `A new comment was posted:\n\n${commentData.text}`,
		};

		// Send the email
		return transporter.sendMail(mailOptions)
			.then(() => {
				console.log("Email sent successfully.");
			})
			.catch((error) => {
				console.error("Error sending email:", error);
			});
	});
