import { mount, createLocalVue, Wrapper } from "@vue/test-utils";
import SignUp from "@/components/SignUp.ts.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);
Vue.use(Vuetify);

const emailCases = [
  ["", ["E-mail is required", "E-mail must be valid"], "is empty"], //
  ["notamail", [true, "E-mail must be valid"], "is not a valid mail format"], //
  ["mail@mail.com", [true, true], "is valid"] //
];

const handleCases = [
  [
    "aaa",
    [true, true, "User name must be between 5 and 20 chars"],
    "is too short"
  ], //
  [
    "",
    ["User name is required", true, "User name must be between 5 and 20 chars"],
    "is empty"
  ], //
  ["aaa aaa", [true, "No white spaces allowed", true], "has white spaces"], //
  ["aaaaaa", [true, true, true], "is valid"] //
];

const passwordConfirmCases = [
  [
    "",
    ["Password confirmation is required", "Passwords don't match"],
    "is empty"
  ],
  ["othervalue", [true, "Passwords don't match"], "is different than password"],
  ["test", [true, true], "is valid"] //
];

const passwordCases = [
  ["", ["Password is required", true, true], "is empty"], //
  [
    "abcdefghijk",
    [true, "Password must be less than 10 characters", true],
    "is too long"
  ], //
  ["aaa aaa", [true, true, "No white spaces allowed"], "has white spaces"], //
  ["aaaaaa", [true, true, true], "is valid"] //
];

const localVue = createLocalVue();
describe("SignUp.ts.vue", () => {
  let vuetify: any;
  let wrapper: Wrapper<any>;
  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(SignUp, {
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
    expect(inputs.length).toEqual(4);
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

  it("should display a link to redirect to Login", async () => {
    const link = wrapper.find(".signup__footer");
    expect(link.exists()).toBeTruthy();
    link.trigger("click");
    wrapper.vm.$nextTick();
    expect(wrapper.emitted("onSetActiveAuthProcess")[0]).toEqual(["login"]);
  });

  describe("|-> Rules", () => {
    passwordCases.forEach(
      ([
        password,
        [valueAnswer, lengthAnswer, whitespaceAnswer],
        description
      ]) => {
        it(`Should enforce password rules when password ${description}`, () => {
          const { passwordRules } = wrapper.vm;
          wrapper.setData({ password: password });
          const [
            hasValue,
            hasNoWhiteSpace,
            hasSufficientLength
          ] = passwordRules.map((rule: Function) =>
            rule(wrapper.vm.$data.password)
          );

          expect(hasValue).toBe(valueAnswer);
          expect(hasNoWhiteSpace).toBe(whitespaceAnswer);
          expect(hasSufficientLength).toBe(lengthAnswer);
        });
      }
    );
    passwordConfirmCases.forEach(
      ([password2, [valueAnswer, sameValueAnswer], description]) => {
        it(`Should enforce confirm password rules when password2 ${description}`, () => {
          const { password2Rules } = wrapper.vm;
          wrapper.setData({ password: "test", password2 });
          const [
            hasValue,
            hasSameValue
          ] = password2Rules.map((rule: Function) =>
            rule(wrapper.vm.$data.password2)
          );

          expect(hasValue).toBe(valueAnswer);
          expect(hasSameValue).toBe(sameValueAnswer);
        });
      }
    );

    handleCases.forEach(
      ([
        handle,
        [valueAnswer, whitespaceAnswer, lengthAnswer],
        description
      ]) => {
        it(`Should enforce handle rules when handle ${description}`, () => {
          const { handleRules } = wrapper.vm;
          wrapper.setData({ handle });
          const [
            hasValue,
            hasNoWhiteSpace,
            hasSufficientLength
          ] = handleRules.map((rule: Function) =>
            rule(wrapper.vm.$data.handle)
          );

          expect(hasValue).toBe(valueAnswer);
          expect(hasNoWhiteSpace).toBe(whitespaceAnswer);
          expect(hasSufficientLength).toBe(lengthAnswer);
        });
      }
    );
    emailCases.forEach(([email, [valueAnswer, formatAnswer], description]) => {
      it(`Should enforce email rules when email ${description}`, () => {
        const { emailRules } = wrapper.vm;
        wrapper.setData({ email });
        const [hasValue, hasValidFormat] = emailRules.map((rule: Function) =>
          rule(wrapper.vm.$data.email)
        );

        expect(hasValue).toBe(valueAnswer);
        expect(hasValidFormat).toBe(formatAnswer);
      });
    });
  });
});
