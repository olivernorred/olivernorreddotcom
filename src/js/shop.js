// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
	apiKey: 'AIzaSyBfK03Zp7K5uPYYH1j-5MXrqFh-Z_LGPq8',
	authDomain: 'sting-op.firebaseapp.com',
	projectId: 'sting-op'
  });
  
const db = firebase.firestore();

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
// Add a second document with a generated ID.

function submitOrder() {
	let orderbuyer = document.querySelector("#buyer").value
	let quantity = document.querySelector("#itemquantity").value
	let size = document.querySelector("#itemsize").value

	let d = new Date()
	let docID = `${orderbuyer} - ${d.getDate()} ${MONTHS[d.getMonth()]}, ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} `

	db.collection("orders").doc(docID).set({
		buyer: orderbuyer,
		quantity: quantity,
		size: size,
		date: docID.split(" - ")[1].trim()
	})
	.then(() => {
		console.log("Document successfully written!");
	})
	.catch((error) => {
		console.error("Error writing document: ", error);
	});
}
