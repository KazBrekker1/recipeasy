<template>
	<form class="card bg-dark mb-3 pb-1 font-monospace shadow-lg recipe" @submit.prevent="submitRecipe">
		<div class="card-header bg-warning rounded p-0">
			<input
				placeholder="Recipe Title"
				v-model="title"
				type="text"
				class="bg-transparent text-center border-0 w-100"
				required
			/>
		</div>
		<div class="card-body overflow-auto">
			<h5 class="card-title text-decoration-underline text-left text-white">
				Ingredients:
			</h5>
			<ul class="list-group card-text text-left">
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
					<div>
						<input
							placeholder="Name"
							v-model="ingr.name"
							type="text"
							class="bg-transparent border-0 w-75"
							:required="required"
						/>
						<span class="badge bg-primary rounded-pill p-2 w-25">
							<input
								placeholder="qty"
								id="inputSpan"
								v-model="ingr.qty"
								type="text"
								class="text-white text-center font-weight-bold bg-transparent border-0 w-100"
								:required="required"
								@keypress.enter="addIngredient"
							/>
						</span>
					</div>
				</li>
			</ul>
			<button class="btn btn-success" @click="addIngredient">+</button>
			<hr class="bg-light" />
			<h5 class="text-left text-white text-decoration-underline">Notes:</h5>
			<textarea
				placeholder="Enter Note Here"
				v-model="note"
				rows="5"
				class="bg-transparent text-white w-100 p-2"
				required
			></textarea>
		</div>
		<div class="card-footer p-1 shadow-sm">
			<button type="submit" class="btn btn-success">Submit</button>
			<button @click="cancelForm" type="button" class="btn btn-danger">Delete</button>
		</div>
	</form>
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
			required: true,
			title: "",
			ingredients: [],
			note: "",
			ingr: {
				name: "",
				qty: "",
			},
		})
		const addIngredient = () => {
			state.required = false
			state.ingredients.push({
				name: state.ingr.name || "Nothing",
				qty: state.ingr.qty || "Bil7ob",
			})
			state.ingr.name = ""
			state.ingr.qty = ""
		}
		const cancelForm = () => {
			emit("exitForm")
		}
		const submitRecipe = () => {
			store.dispatch("createRecipe", {
				title: state.title,
				ingredients: [...state.ingredients],
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
