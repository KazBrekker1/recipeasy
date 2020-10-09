import {createStore} from "vuex"
import * as fb from "../Firebase"
import router from "../router/index"

export default createStore({
	state: {
		currentUser: null,
		userProfile: {},
		recipes: [],
		isLogged: false,
	},
	mutations: {
		SET_USER(state, user) {
			state.currentUser = user
		},
		ADD_RECIPE(state, recipe) {
			state.currentUser.recipes.push(recipe)
		},
		/////////////////////////////////
		setUserProfile(state, val) {
			state.userProfile = val
		},
		setRecipes(state, val) {
			state.recipes = val
		},
		setIsLogged(state, val) {
			state.isLogged = val
		},
	},
	actions: {
		setUser({commit}, user) {
			commit("SET_USER", user)
		},
		addRecipe({commit}, recipe) {
			commit("ADD_RECIPE", recipe)
		},
		/////////////////////////////////
		async login({dispatch}, form) {
			// sign user in
			const {user} = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

			// fetch user profile and set in state
			dispatch("fetchUserProfile", user)
		},
		async fetchUserProfile({commit}, user) {
			// fetch user profile
			const userProfile = await fb.usersCollection.doc(user.uid).get()
			// console.log(userProfile.data());
			// set user profile in state
			commit("setUserProfile", userProfile.data())
			commit("setIsLogged", true)
			// change route to dashboard
			if (router.currentRoute.value.path == "/login") {
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
	},
	modules: {},
})
