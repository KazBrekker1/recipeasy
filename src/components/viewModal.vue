<template>
	<div class="card bg-dark mb-3 pb-1 font-monospace shadow-lg recipe" id="viewModal">
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
			<button type="button" class="btn btn-danger" @click="closeView">Close</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		recp: Object,
	},
	setup(props, {emit}) {
		const closeView = () => {
			emit("closeView")
		}
		return {
			closeView,
		}
	},
}
</script>

<style lang="scss" scoped>
.recipe {
	z-index: 10;
	width: 50%;
	height: 75%;
	left: 0;
	right: 0;
	margin-left: auto;
	margin-right: auto;
	position: absolute;
}
</style>
