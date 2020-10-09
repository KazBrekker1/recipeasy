import * as firebase from "firebase"

const firebaseConfig = {
	apiKey: "AIzaSyBZEa1H4x9ASXLqH-PxCJJHgTHLUGriee4",
	authDomain: "recipeasy-88b57.firebaseapp.com",
	databaseURL: "https://recipeasy-88b57.firebaseio.com",
	projectId: "recipeasy-88b57",
	storageBucket: "recipeasy-88b57.appspot.com",
	messagingSenderId: "40426170123",
	appId: "1:40426170123:web:a4c47ee8c1d8e6a62c640e",
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()

const usersCollection = db.collection("users")
const recipesCollection = db.collection("recipes")

export {db, auth, usersCollection, recipesCollection}
