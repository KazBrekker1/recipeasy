<template>
	<form class="login bg-dark p-4 rounded-lg shadow-lg" @submit.prevent="login">
		<h2 class="text-white mb-4">Log-in</h2>
		<p class="alert-danger alert p-0 pl-2 pr-2" v-if="error">{{ error }}</p>
		<input
			class="form-text p-2 text-center rounded border-0"
			placeholder="you@domain.com"
			type="email"
			v-model.trim="emailTxt"
			required
		/>
		<input
			class="form-text p-2 text-center rounded border-0"
			placeholder="*******"
			type="password"
			v-model.trim="pwd"
			required
		/>
		<button type="submit" class="btn btn-warning mb-3 w-25" v-if="!loading">
			login
		</button>
		<button class="btn btn-warning" type="button" v-else disabled>
			<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
			Loading...
		</button>
		<router-link to="/register">need an account?</router-link>
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
			pwd: "",
			loading: false,
		})
		const login = () => {
			store.dispatch("login", {
				email: state.emailTxt,
				password: state.pwd,
			})
		}
		return {
			login,
			...toRefs(state),
		}
	},
	computed: {
		...mapState(["error"]),
	},
}
</script>

<style scoped lang="scss">
.login {
	margin: auto;
	margin-top: 10%;
	display: grid;
	width: 30%;
	place-items: center;
	input {
		color: black;
		width: 80%;
		margin-bottom: 20px;
	}
	a {
		color: rgb(119, 167, 255);
		text-decoration: none;
	}
}
</style>
