<template>
	<div class="card bg-dark mb-3 pb-1 font-monospace shadow-lg recipe">
		<div class="card-header bg-warning rounded p-0">
			<input placeholder="Recipe Title" v-model="title" type="text" class="bg-transparent text-center border-0" />
		</div>
		<div class="card-body overflow-auto">
			<h5 class="card-title text-decoration-underline text-left text-white">
				Ingredients:
			</h5>
			<ul class="list-group card-text">
				<li
					v-for="(ingredient, index) in ingredients"
					:key="index"
					class="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center rounded m-1"
				>
					{{ ingredient.name }}
					<span class="badge bg-primary rounded-pill p-2"> {{ ingredient.qty }} </span>
				</li>
				<li
					class="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center rounded m-1"
				>
					<input placeholder="Ingredient Name" v-model="ingr.name" type="text" class="bg-transparent border-0" />
					<span class="badge bg-primary rounded-pill p-2">
						<input
							placeholder="qty"
							id="inputSpan"
							v-model="ingr.qty"
							type="text"
							class="text-white text-center font-weight-bold bg-transparent border-0"
							@keypress.enter="addIngredient"
						/>
					</span>
				</li>
			</ul>
			<hr class="bg-light" />
			<h5 class="text-left text-white text-decoration-underline">Notes:</h5>
			<p class="text-white">
				<textarea
					placeholder="Enter Note Here"
					v-model="note"
					cols="30"
					rows="6"
					class="bg-transparent text-white p-2"
				></textarea>
			</p>
		</div>
		<div class="card-footer p-1 shadow-sm">
			<button @click="submitRecipe" type="button" class="btn btn-success">Submit</button>
			<button @click="cancelForm" type="button" class="btn btn-danger">Delete</button>
		</div>
	</div>
</template>
<script>
import {useStore} from "vuex"
import {toRefs, reactive} from "vue"
export default {
	name: "RecipeForm",
	setup(props, {emit}) {
		const store = useStore()
		const user = store.state.currentUser
		const state = reactive({
			title: "",
			ingredients: [],
			note: "",
			ingr: {
				name: "",
				qty: "",
			},
		})
		const addIngredient = () => {
			state.ingredients.push({
				name: state.ingr.name,
				qty: state.ingr.qty,
			})
			state.ingr.name = ""
			state.ingr.qty = ""
		}
		const cancelForm = () => {
			emit("exitForm")
		}
		const submitRecipe = () => {
			store.dispatch("addRecipe", {
				id: user.recipes.length + 1,
				title: state.title,
				ingredients: [...state.ingredients],
				DoC: Date.now(),
				note: state.note,
			})
			state.title = ""
			state.ingredients = []
			state.note = ""
			cancelForm()
		}
		return {
			submitRecipe,
			cancelForm,
			addIngredient,
			...toRefs(state),
		}
	},
}
</script>

<style lang="scss" scoped>
#inputSpan {
	width: 3rem;
	&::placeholder {
		color: darkgray;
	}
}
</style>
