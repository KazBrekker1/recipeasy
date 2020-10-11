<template>
	<div v-if="!showEdit" class="card bg-dark mb-3 pb-1 font-monospace shadow-lg recipe">
		<div class="card-header bg-warning rounded p-0">{{ recp.title }}</div>
		<div class="card-body overflow-auto">
			<h5 class="card-title text-decoration-underline text-left text-white">
				Ingredients:
			</h5>
			<ul class="list-group card-text">
				<li
					class="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center rounded m-1"
					v-for="ingredient in recp.ingredients"
					:key="ingredient.id"
				>
					{{ ingredient.name }}
					<span class="badge bg-primary rounded-pill p-2">{{ ingredient.qty }}</span>
				</li>
			</ul>
			<hr class="bg-light" />
			<h5 class="text-left text-white text-decoration-underline">Notes:</h5>
			<p class="text-white ">
				{{ recp.note }}
			</p>
		</div>
		<div class="card-footer p-1 shadow-sm">
			<button type="button" class="btn btn-primary" @click="toggleView">View</button>
			<button type="button" class="btn btn-warning" @click="toggleEdit">Edit</button>
			<button type="button" class="btn btn-danger" @click="deleteRecipe">Delete</button>
		</div>
	</div>
	<RecipeEdit v-if="showEdit" :recipe="recp" @toggleEdit="toggleEdit" />
	<viewModal v-if="showModal" :recp="recp" @closeView="toggleView" />
</template>

<script>
import * as fb from "../Firebase"
import {useStore} from "vuex"
import viewModal from "@/components/viewModal"
import RecipeEdit from "@/components/RecipeEdit"
import {ref} from "vue"

export default {
	name: "Recipe",
	components: {
		viewModal,
		RecipeEdit,
	},
	props: {
		recp: Object,
	},
	setup(props, {emit}) {
		const store = useStore()
		let showModal = ref(false)
		let showEdit = ref(false)
		const toggleView = () => {
			showModal.value = !showModal.value
		}
		const toggleEdit = () => {
			showEdit.value = !showEdit.value
		}
		const deleteRecipe = () => {
			let recipe = props.recp
			let conf = confirm(`You sure you want to delete ${recipe.title} ?`)
			conf ? store.dispatch("removeRecipe", recipe.id) : null
		}
		return {
			deleteRecipe,
			toggleView,
			showModal,
			showEdit,
			toggleEdit,
		}
	},
}
</script>

<style scoped lang="scss"></style>
