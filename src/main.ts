import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store/index";
import vuetify from "./plugins/vuetify";
import * as types from "@/store/mutation-types";
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import VueCompositionApi from "@vue/composition-api";

Vue.use(VueCompositionApi);
Vue.use(Vuetify);
Vue.use(VueApollo);

const API_URI =
  process.env.NODE_ENV === "production"
    ? "https://icancookit-app.herokuapp.com"
    : "http://localhost:3000";

export const defaultClient = new ApolloClient({
  uri: `${API_URI}/graphql`,
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    // auth headers
    if (!localStorage.token) {
      localStorage.setItem("token", "");
    }
    operation.setContext({
      headers: {
        authorization: localStorage.getItem("token")
      }
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.log("[NETWORK ERROR]", networkError);
    }
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.name === "AuthenticationError") {
          console.warn(err);
          store.commit(types.SET_AUTH_ERROR, err);
          store.dispatch("logout");
        }
      }
    }
  }
});

const apolloProvider = new VueApollo({ defaultClient });
Vue.config.productionTip = false;

new Vue({
  apolloProvider,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
