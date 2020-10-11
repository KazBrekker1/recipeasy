import {createStore} from "vuex"
import * as fb from "../Firebase"
import router from "../router/index"

export default createStore({
	state: {
		userProfile: {},
		recipes: [],
		error: "",
	},
	mutations: {
		/////////////////////////////////
		setUserProfile(state, val) {
			state.userProfile = val
		},
		setRecipes(state, val) {
			state.recipes = val
		},
		setError(state, val) {
			state.error = val
		},
	},
	actions: {
		/////////////////////////////////
		async login({dispatch, commit}, form) {
			// sign user in
			try {
				const {user} = await fb.auth.signInWithEmailAndPassword(form.email, form.password).then(() => {
					NProgress.done()
				})
				dispatch("fetchUserProfile", user)
				commit("setError", "")
			} catch (err) {
				commit("setError", err.code)
				NProgress.done()
			}
			// fetch user profile and set in state
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
		async register({dispatch, commit}, form) {
			// sign user up
			try {
				const {user} = await fb.auth.createUserWithEmailAndPassword(form.email, form.password).then(() => {
					NProgress.done()
				})
				// create user profile object in userCollections
				await fb.usersCollection.doc(user.uid).set({
					name: form.name,
				})
				// fetch user profile and set in state
				dispatch("fetchUserProfile", user)
				commit("setError", "")
			} catch (err) {
				commit("setError", err.code)
			}
		},
		async logout({commit}) {
			await fb.auth.signOut()
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
		async updateRecipe({}, recipe) {
			await fb.recipesCollection.doc(recipe.id).update({
				title: recipe.title,
				ingredients: [...recipe.ingredients],
				note: recipe.note,
			})
		},
		async removeRecipe({}, recipeID) {
			await fb.recipesCollection.doc(recipeID).delete()
		},
	},
	modules: {},
})
