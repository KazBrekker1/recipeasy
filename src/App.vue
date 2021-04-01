<template>
	<nav id="nav" class="navbar bg-dark sticky-top p-1 shadow-sm justify-content-between">
		<router-link class="nav-item" to="/">Recipeasy</router-link>
		<h3 class="m-auto" v-if="userProfile.name">
			<strong> {{ userProfile.name }}</strong
			>'s Kitchen
		</h3>
		<div v-if="!userProfile.name" class="ml-5">
			<router-link to="/login" class="nav-item">
				Log-In
			</router-link>
			<router-link to="/register" class="nav-item">
				Register
			</router-link>
		</div>
		<button v-else class="btn m-1 px-3 btn-outline-warning" @click="logout">Logout</button>
	</nav>
	<p id="successMsg" class="alert-success alert p-0 pl-2 pr-2 w-25" v-if="success">{{ success }}</p>
	<p id="errorMsg" class="alert-danger alert p-0 pl-2 pr-2 w-25" v-if="error">{{ error }}</p>
	<router-view />
</template>

<script>
import { useStore, mapState } from "vuex"
import { ref } from "vue"
export default {
	setup() {
		const store = useStore()
		const logout = () => {
			store.dispatch("logout")
		}
		return {
			logout,
		}
	},
	computed: {
		...mapState(["userProfile"]),
		...mapState(["success", "error"]),
	},
}
</script>

<style lang="scss">
#app {
	height: 80%;
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
	text-align: center;
}
#nav {
	display: grid;
	grid-auto-flow: column;
	a {
		margin: 10px;
		font-size: 30px;
		font-family: "Pacifico", cursive;
		color: whitesmoke;
		text-decoration: none;
		transition: 200ms ease-in-out;
		&:hover {
			color: #eee199;
		}
		&.router-link-exact-active {
			color: #f3d631;
		}
	}
	h3 {
		color: #f3d631;
	}
}
#successMsg,
#errorMsg {
	position: absolute;
	z-index: 10;
	left: 0;
	right: 0;
	margin-left: auto;
	margin-right: auto;
}
</style>
