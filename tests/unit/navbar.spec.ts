import { createLocalVue, Wrapper, shallowMount, mount } from "@vue/test-utils";
import Navbar from "@/components/Navbar.ts.vue";
import vuex from "vuex";
import Vue from "vue";
import Vuetify from "vuetify";
import VueCompositionApi from "@vue/composition-api";
import { USER_FACTORY } from "./factories/User.factory";

Vue.use(VueCompositionApi);
Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(vuex);
const mocks = {
  $store: {
    dispatch: () => jest.fn()
  }
};

const me = USER_FACTORY.getSingleRecord();

const store = new vuex.Store({
  getters: {
    isAuth: () => true,
    me: () => me
  }
});

describe("Navbar.vue", () => {
  it("should trigger logout when button is clicked", () => {
    const wrapper: Wrapper<any> = mount(Navbar, {
      localVue,
      store,
      mocks
    });
    const logoutSpy = jest.spyOn(mocks.$store, "dispatch");
    expect(wrapper.exists()).toBe(true);
    const logoutBtn = wrapper.find(".navbar__logout");
    logoutBtn.trigger("click");
    expect(logoutSpy).toHaveBeenCalledWith("logout");
  });

  it("should display user avatar", () => {
    const wrapper: Wrapper<any> = mount(Navbar, {
      localVue,
      store,
      mocks
    });
    expect(wrapper.find("img").attributes("src")).toEqual(me.avatar);
  });
});
