<template>
	<div class="register bg-dark p-4 rounded-lg shadow-lg">
		<h2 class="text-white mb-4">Register</h2>
		<input
			class="form-text p-2 text-center rounded border-0"
			placeholder="username"
			type="text"
			v-model.trim="username"
		/>
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
		<button class="btn btn-warning mb-3 w-25" @click="register">
			Submit
		</button>
		<router-link to="/login">have an account?</router-link>
	</div>
</template>

<script>
import {reactive, toRefs} from "vue"
import {useStore} from "vuex"

export default {
	setup() {
		const store = useStore()
		const state = reactive({
			username: "",
			emailTxt: "",
			pwd: "",
		})
		const register = () => {
			console.log(state.username, state.emailTxt, state.pwd)
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
