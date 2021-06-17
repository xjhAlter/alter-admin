import { createStore } from "vuex"
import getters from "./getters"
import user from "./modules/user"
import app from "./modules/app"
import settings from "./modules/settings"

export default createStore({
    getters,
    modules: {
        user,
        app,
        settings
    }
})