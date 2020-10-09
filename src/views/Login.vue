<template>
	<div class="login bg-dark p-4 rounded-lg shadow-lg disabled">
		<h2 class="text-white mb-4">Log-in</h2>
		<input
			class="form-text p-2 text-center rounded border-0"
			placeholder="you@domain.com"
			type="email"
			v-model.trim="emailTxt"
		/>
		<input
			class="form-text p-2 text-center rounded border-0"
			placeholder="*******"
			type="password"
			v-model.trim="pwd"
		/>
		<button class="btn btn-warning mb-3 w-25" v-if="!loading" @click="login">
			login
		</button>
		<button class="btn btn-warning" type="button" v-else disabled>
			<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
			Loading...
		</button>
		<router-link to="/register">need an account?</router-link>
	</div>
</template>

<script>
import {reactive, toRefs} from "vue"
import {useStore} from "vuex"

export default {
	setup() {
		const store = useStore()
		const state = reactive({
			emailTxt: "",
			pwd: "",
			loading: false,
		})
		const login = () => {
			state.loading = true
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
