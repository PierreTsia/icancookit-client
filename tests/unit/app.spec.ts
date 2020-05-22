import App from "@/App.vue";
import Navbar from "@/components/Navbar.ts.vue";
import { shallowMount, createLocalVue, Wrapper } from "@vue/test-utils";
import vuex from "vuex";
import Vue from "vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);

const mockStore = (isAuth: boolean, error: any = null) =>
  new vuex.Store({
    getters: {
      isAuth: () => isAuth,
      authError: () => error
    }
  });

const localVue = createLocalVue();
localVue.use(vuex);

describe("App.vue", () => {
  [
    [false], //
    [true]
  ].forEach(([isAuth]) => {
    it(`should ${
      isAuth ? "" : "not "
    }display app navbar if isAuth equals ${isAuth}`, () => {
      const wrapper: Wrapper<any> = shallowMount(App, {
        localVue,
        store: mockStore(isAuth),
        stubs: ["router-view"]
      });
      const navBar = wrapper.find(Navbar);
      expect(navBar.exists()).toEqual(isAuth);
    });
  });
});
