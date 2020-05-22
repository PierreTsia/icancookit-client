import { mount, createLocalVue, Wrapper } from "@vue/test-utils";
import SignIn from "@/components/SignIn.ts.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import VueCompositionApi from "@vue/composition-api";
import vuex from "vuex";
Vue.use(VueCompositionApi);
Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(vuex);

describe("SignIn.ts.vue", () => {
  let vuetify: any;
  let wrapper: Wrapper<any>;
  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(SignIn, {
      localVue,
      vuetify,
      mocks: {
        $store: {
          commit: () => jest.fn()
        }
      }
    });
  });

  it("should display an input for signup required infos", () => {
    expect(wrapper.exists()).toBeTruthy();
    const inputs = wrapper.findAll(".input");
    expect(inputs.length).toEqual(2);
  });

  [
    ["handleValidateClick", ".btn--validate"],
    ["handleResetClick", ".btn--reset"]
  ].forEach(([methodName, btnClass]) => {
    it(`should trigger ${methodName} when button is clicked`, () => {
      const spy = jest.spyOn(wrapper.vm, methodName);
      const btn = wrapper.find(btnClass);
      btn.trigger("click");
      expect(spy).toHaveBeenCalled();
    });
  });

  it("should display a link to redirect to SignUp", async () => {
    const link = wrapper.find(".signIn__footer");
    expect(link.exists()).toBeTruthy();
    link.trigger("click");
    wrapper.vm.$nextTick();
    expect(wrapper.emitted("onSetActiveAuthProcess")[0]).toEqual(["signup"]);
  });
});
