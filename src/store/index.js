import {createStore} from "vuex"
import * as fb from "../Firebase"
import router from "../router/index"

export default createStore({
	state: {
		userProfile: {},
		recipes: [],
	},
	mutations: {
		/////////////////////////////////
		setUserProfile(state, val) {
			state.userProfile = val
		},
		setRecipes(state, val) {
			state.recipes = val
		},
	},
	actions: {
		/////////////////////////////////
		async login({dispatch}, form) {
			// sign user in
			const {user} = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
			// fetch user profile and set in state
			dispatch("fetchUserProfile", user)
		},
		async fetchUserProfile({commit}, user) {
			const userProfile = await fb.usersCollection.doc(user.uid).get()
			// set user profile in state
			commit("setUserProfile", userProfile.data())
			// change route to dashboard
			let currentPath = router.currentRoute.value.path
			if (currentPath == "/login" || currentPath == "/register") {
				router.push("/")
			}
		},
		async register({dispatch}, form) {
			// sign user up
			const {user} = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
			// create user profile object in userCollections
			await fb.usersCollection.doc(user.uid).set({
				name: form.name,
			})
			// fetch user profile and set in state
			dispatch("fetchUserProfile", user)
		},
		async logout({commit}) {
			await fb.auth.signOut()
			commit("setIsLogged", false)
			// clear userProfile and redirect to /login
			commit("setUserProfile", {})
			router.push("/login")
		},
		async createRecipe({state, commit}, recipe) {
			await fb.recipesCollection.add({
				createdOn: new Date(),
				title: recipe.title,
				ingredients: [...recipe.ingredients],
				note: recipe.note,
				userId: fb.auth.currentUser.uid,
				userName: state.userProfile.name,
			})
		},
		async removeRecipe({state}, recipeID) {
			await fb.recipesCollection.doc(recipeID).delete()
		},
	},
	modules: {},
})
