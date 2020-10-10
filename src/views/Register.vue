<template>
	<form class="register bg-dark p-4 rounded-lg shadow-lg" @submit.prevent="register">
		<h2 class="text-white mb-4">Register</h2>
		<p class="alert-danger alert p-0 pl-2 pr-2" v-if="error">{{ error }}</p>
		<input
			class="form-text p-2 text-center rounded border-0"
			placeholder="username"
			type="text"
			v-model.trim="username"
			required
		/>
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
			pattern="(?=.*\d)(?=.*[a-z]).{6,}"
			title="1 Number, 1 Lowercase, Min 6 characters"
		/>
		<button type="submit" class="btn btn-warning mb-3">
			Submit
		</button>
		<router-link to="/login">have an account?</router-link>
	</form>
</template>

<script>
import {reactive, toRefs} from "vue"
import {mapState, useStore} from "vuex"

export default {
	setup() {
		const store = useStore()
		const state = reactive({
			username: "",
			emailTxt: "",
			pwd: "",
		})
		const register = () => {
			NProgress.start()
			store.dispatch("register", {
				name: state.username,
				email: state.emailTxt,
				password: state.pwd,
			})
		}
		return {
			register,
			...toRefs(state),
		}
	},
	computed: {
		...mapState(["error"]),
	},
}
</script>

<style scoped lang="scss">
.register {
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
