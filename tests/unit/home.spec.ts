import { createLocalVue, Wrapper, shallowMount, mount } from "@vue/test-utils";
import SignUp from "@/components/SignUp.ts.vue";
import SignIn from "@/components/SignIn.ts.vue";
import Home from "@/views/Home.ts.vue";
import { AuthProcess } from "@/hooks/auth";
import vuex from "vuex";
import Vue from "vue";
import Vuetify from "vuetify";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);
Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(vuex);
describe("Home.ts.vue", () => {
  let vuetify: any;
  let wrapper: Wrapper<any>;
  const mockStore = (isAuth: boolean, error: any = null) =>
    new vuex.Store({
      getters: {
        isAuth: () => isAuth,
        authError: () => error
      }
    });
  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = shallowMount(Home, {
      mocks: {
        $store: {
          commit: () => jest.fn()
        }
      },
      localVue,
      vuetify,
      store: mockStore(false)
    });
  });

  it("should display the signUp component by default", () => {
    const signUp = wrapper.find(SignUp);
    const signIn = wrapper.find(SignIn);
    expect(signUp.isVisible()).toBeTruthy();
    expect(signIn.exists()).toBeFalsy();
  });
  it("should toggle between auth components when @onSetActiveAuthProcess is emitted", async () => {
    const signUp = wrapper.find(SignUp);
    expect(wrapper.vm.$data.activeAuthProcess).toEqual(AuthProcess.SIGNUP);
    expect(wrapper.vm.$data.activeAuthComponent).toEqual("SignUp");

    signUp.vm.$emit("onSetActiveAuthProcess", AuthProcess.LOGIN);
    wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.activeAuthProcess).toEqual(AuthProcess.LOGIN);
    expect(wrapper.vm.$data.activeAuthComponent).toEqual("SignIn");
  });

  it("should display none of auth components if user is Auth", async () => {
    const wrapper = shallowMount(Home, {
      localVue,
      vuetify,
      store: mockStore(true)
    });
    expect(wrapper.find(SignUp).exists()).toBeFalsy();
    expect(wrapper.find(SignIn).exists()).toBeFalsy();
  });

  [
    [false, null],
    [true, { error: "Error", message: "test error message" }]
  ].forEach(([hasAuthError, error]) => {
    it(`should ${
      hasAuthError ? "" : "not "
    }display error message in a v-alert if getter authError is ${
      hasAuthError ? "not " : ""
    } null`, () => {
      const wrapper = mount(Home, {
        localVue,
        vuetify,
        store: mockStore(false, error)
      });
      const alert = wrapper.find(".home__error");
      if (hasAuthError) {
        expect(alert.exists()).toBeTruthy();
        expect(alert.text()).toEqual("test error message");
      } else {
        expect(alert.exists()).toBeFalsy();
      }
    });
  });
});
