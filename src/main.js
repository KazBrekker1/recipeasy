import {createApp} from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import {auth} from "./Firebase"

let app
auth.onAuthStateChanged((user) => {
	if (!app) {
		app = createApp(App)
			.use(store)
			.use(router)
			.mount("#app")
			document.title = "Recipeasy"
	}
	if (user) {
		store.dispatch("fetchUserProfile", user)
	}
})
