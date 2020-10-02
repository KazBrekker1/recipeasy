<template>
	<nav id="nav" class="nav justify-content-between bg-dark sticky-top p-0">
		<router-link class="nav-item" to="/">Recipeasy</router-link>
		<h3 class="m-auto">
			<strong> {{ user.fName }}</strong> 's Kitchen
		</h3>
		<div class="user-controls nav-item justify-content-center">
			<button id="loginBTN" class="bg-warning border-0 rounded-pill m-3 pl-5 pr-5 pb-2">
				Log-In
			</button>
			<button id="registerBTN" class="bg-light border-0 rounded-pill m-3 pl-5 pr-5 pb-2">
				Register
			</button>
		</div>
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
		font-size: 2rem;
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
import {useStore} from "vuex"
import {users} from "@/assets/users"
export default {
	setup() {
		const store = useStore()
		const user = store.state.currentUser || users[0]
		if (!store.state.currentUser) {
			store.dispatch("setUser", users[0])
		}
		return {
			user,
		}
	},
}
</script>
