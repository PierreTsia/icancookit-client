import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import search from "./modules/search";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    search
  }
});
