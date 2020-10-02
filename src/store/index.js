import {createStore} from "vuex"

export default createStore({
	state: {
		currentUser: null,
	},
	mutations: {
		SET_USER(state, user) {
			state.currentUser = user
		},
		ADD_RECIPE(state, recipe) {
			state.currentUser.recipes.push(recipe)
		},
	},
	actions: {
		setUser({commit}, user) {
			commit("SET_USER", user)
		},
		addRecipe({commit}, user, recipe) {
			commit("ADD_RECIPE", user, recipe)
		},
	},
	modules: {},
})
