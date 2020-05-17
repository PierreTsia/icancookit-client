import { ref, Ref } from "@vue/composition-api";

export enum AuthProcess {
  SIGNUP = "signup",
  LOGIN = "login"
}

const RULES_ERRORS = (property: string | null = "") => ({
  noWhiteSpace: "No white spaces allowed",
  required: `${property} is required`,
  handle: {
    size: "User name must be between 5 and 20 chars"
  },
  password: {
    size: "Password must be less than 10 characters"
  },
  password2: {
    noMatch: "Passwords don't match"
  },
  email: {
    format: "E-mail must be valid"
  }
});

const useSignUp = (
  handle: Ref<string>,
  email: Ref<string>,
  password: Ref<string>
) => {
  const handleRules: Ref<Function[]> = ref([
    (n: string) => !!n?.length || RULES_ERRORS("User name").required,
    (n: string) => !/\s/.test(n) || RULES_ERRORS().noWhiteSpace,
    (n: string) =>
      (n?.length > 4 && n?.length <= 20) || RULES_ERRORS().handle.size
  ]);
  const passwordRules: Ref<Function[]> = ref([
    (p: string) => !!p?.length || RULES_ERRORS("Password").required,
    (p: string) => !/\s/.test(p) || RULES_ERRORS().noWhiteSpace,
    (p: string) => p?.length <= 10 || RULES_ERRORS().password.size
  ]);

  const password2Rules: Ref<Function[]> = ref([
    (p: string) =>
      !!p?.length || RULES_ERRORS("Password confirmation").required,
    (p: string) => p === password.value || RULES_ERRORS().password2.noMatch
  ]);
  const emailRules: Ref<Function[]> = ref([
    (e: string) => !!e?.length || RULES_ERRORS("E-mail").required,
    (e: string) => /.+@.+\..+/.test(e) || RULES_ERRORS().email.format
  ]);

  return {
    handleRules,
    passwordRules,
    password2Rules,
    emailRules
  };
};

export { useSignUp };
