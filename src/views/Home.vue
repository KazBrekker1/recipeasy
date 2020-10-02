<template>
	<div class="main">
		<Recipe v-for="recipe in recipes" :key="recipe['id']" :recp="recipe" />
		<RecipeForm v-if="state.showForm" @exitForm="toggleForm" />
		<div class="addNew">
			<button class="btn btn-dark p-3" v-if="!state.showForm" @click="toggleForm">Add</button>
		</div>
	</div>
</template>

<script>
import Recipe from "@/components/Recipe"
import RecipeForm from "@/components/RecipeForm"
import {computed, reactive} from "vue"
import {useStore} from "vuex"

export default {
	name: "Home",
	components: {
		Recipe,
		RecipeForm,
	},
	setup() {
		const store = useStore()
		const user = store.state.currentUser
		const state = reactive({
			showForm: false,
		})
		const recipes = computed(() => user.recipes)
		const toggleForm = () => {
			state.showForm = !state.showForm
		}
		return {
			toggleForm,
			user,
			recipes,
			state,
		}
	},
}
</script>

<style scoped lang="scss">
.main {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	.addNew {
		min-height: 20rem;
		display: grid;
		place-items: center;
	}
}
</style>
