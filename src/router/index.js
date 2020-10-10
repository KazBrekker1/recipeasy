import {createRouter, createWebHistory} from "vue-router"
import {auth} from "../Firebase"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import Home from "../views/Home.vue"

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
	},
	{
		path: "/register",
		name: "Register",
		component: Register,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some((x) => x.meta.requiresAuth)
	to.name ? NProgress.start() : null
	if (requiresAuth && !auth.currentUser) {
		next("/login")
	} else {
		next()
	}
})

router.afterEach((to, from) => {
	NProgress.done()
})
