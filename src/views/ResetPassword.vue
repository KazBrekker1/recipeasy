<template>
	<form class="reset bg-dark p-4 rounded-lg shadow-lg" @submit.prevent="reset">
		<h2 class="text-white mb-4">Reset Password</h2>
		<p class="alert-danger alert p-0 pl-2 pr-2" v-if="error">{{ error }}</p>
		<input
			class="form-text p-2 text-center rounded border-0"
			placeholder="you@domain.com"
			type="email"
			v-model.trim="emailTxt"
			required
		/>\
		<button type="submit" class="btn btn-warning mb-3 w-25">
			Submit
		</button>
	</form>
</template>

<script>
import {reactive, toRefs} from "vue"
import {mapState, useStore} from "vuex"

export default {
	setup() {
		const store = useStore()
		const state = reactive({
			emailTxt: "",
		})
		const reset = () => {
			store.dispatch("reset", state.emailTxt)
			console.log(12143);
		}
		return {
			...toRefs(state),
			reset,
		}
	},
	computed: {
		...mapState(["error"]),
	},
}
</script>

<style lang="scss" scoped>
.reset {
	margin: auto;
	margin-top: 7%;
	display: grid;
	width: 350px;
	place-items: center;
	input {
		color: black;
		width: 90%;
		margin-bottom: 20px;
	}
	a {
		color: rgb(119, 167, 255);
		text-decoration: none;
	}
}
</style>
