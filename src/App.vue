<template>
	<nav id="nav" class="nav justify-content-between bg-dark sticky-top p-0">
		<router-link class="nav-item" to="/">Recipeasy</router-link>
		<h3 v-if="userProfile.name" class="m-auto">
			<strong> {{ userProfile.name }}</strong> 's Kitchen
		</h3>
		<div v-if="!userProfile.name" class="p-2">
			<router-link to="/login" id="loginBTN" class="nav-item bg-dark">
				Log-In
			</router-link>
			<router-link to="/register" id="registerBTN" class="nav-item bg-dark">
				Register
			</router-link>
		</div>
		<button v-else class="btn btn-danger m-3" @click="logout">Logout</button>
	</nav>
	<router-view />
</template>

<style lang="scss">
#app {
	height: 80%;
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
	text-align: center;
}

#nav {
	a {
		font-size: 1.75rem;
		font-family: "Architects Daughter", cursive;
		margin: 10px;
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
</style>

<script>
import {useStore, mapState} from "vuex"
import {ref} from "vue"
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
	},
}
</script>
