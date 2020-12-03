import {createStore} from "vuex"
import * as fb from "../Firebase"
import router from "../router/index"

export default createStore({
	state: {
		userProfile: {},
		recipes: [],
		error: "",
		success: "",
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
			setTimeout(() => (state.error = ""), 5000)
		},
		setSuccess(state, val) {
			state.success = val
			setTimeout(() => (state.success = ""), 4000)
		},
	},
	actions: {
		/////////////////////////////////
		async login({dispatch, commit}, form) {
			// sign user in
			try {
				const {user} = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
				dispatch("fetchUserProfile", user)
				NProgress.done()
				commit("setError", "")
				commit("setSuccess", "Welcome Back!")
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
			try {
				const {user} = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
				// create user profile object in userCollections
				await fb.usersCollection.doc(user.uid).set({
					name: form.name,
				})
				NProgress.done()
				commit("setError", "")
				commit("setSuccess", "Welcome To Your Kitchen!")
				// fetch user profile and set in state
				dispatch("fetchUserProfile", user)
			} catch (err) {
				commit("setError", err.code)
			}
		},
		async logout({commit}) {
			await fb.auth.signOut()
			commit("setUserProfile", {})
			router.push("/login")
		},
		async reset({commit}, email) {
			try {
				await fb.auth.sendPasswordResetEmail(email)
				commit("setSuccess", "Check Your Email!")
				commit("setError", "")
				router.push("/login")
			} catch (err) {
				commit("setError", err.code)
			}
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
			commit("setSuccess", "Recipe Added")
		},
		async updateRecipe({commit}, recipe) {
			await fb.recipesCollection.doc(recipe.id).update({
				title: recipe.title,
				ingredients: [...recipe.ingredients],
				note: recipe.note,
			})
			commit("setSuccess", "Recipe Updated")
		},
		async removeRecipe({commit}, recipeID) {
			await fb.recipesCollection
				.doc(recipeID)
				.delete()
				.then(() => {
					commit("setError", "Recipe Removed")
				})
		},
	},
	modules: {},
})
