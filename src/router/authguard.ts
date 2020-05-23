import store from "./../store/index";
import { Route } from "vue-router";
//eslint-disable-next-line
export default async (to: Route, from: Route, next: Function) => {
  await store.dispatch("getCurrentUser");
  switch (to.name) {
    case "Home":
      return store.getters.isAuth ? next() : next("/login");
    case "Auth":
      return store.getters.isAuth ? next("/") : next();
  }
};
