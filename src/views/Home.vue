<template>
	<div class="main">
		<Recipe v-for="recipe in recipes" :key="recipe['id']" :recp="recipe" @viewMode="viewMode" />
		<RecipeForm v-if="state.showForm" @exitForm="toggleForm" :recipe="{}" />
		<div class="addNew">
			<button class="btn btn-dark p-3" v-if="!state.showForm" @click="toggleForm">Add</button>
		</div>
	</div>
</template>

<script>
import Recipe from "@/components/Recipe"
import RecipeForm from "@/components/RecipeForm"
import {reactive} from "vue"
import {useStore, mapState} from "vuex"
import * as fb from "../Firebase"

export default {
	name: "Home",
	components: {
		Recipe,
		RecipeForm,
	},
	setup() {
		const store = useStore()
		const state = reactive({
			showForm: false,
		})
		const toggleForm = () => {
			state.showForm = !state.showForm
		}

		fb.recipesCollection
			.where("userId", "==", fb.auth.currentUser.uid)
			.orderBy("createdOn", "desc")
			.onSnapshot((snapshot) => {
				let recipesArray = []
				snapshot.forEach((doc) => {
					let recipe = doc.data()
					recipe.id = doc.id
					recipesArray.unshift(recipe) // Temporary
				})

				store.commit("setRecipes", recipesArray)
			})
		return {
			toggleForm,
			state,
		}
	},
	computed: {
		...mapState(["recipes"]),
	},
}
</script>

<style scoped lang="scss">
.main {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
	.addNew {
		min-height: 20rem;
		display: grid;
		place-items: center;
	}
}
</style>
