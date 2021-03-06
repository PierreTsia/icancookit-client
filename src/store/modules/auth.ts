import * as types from "../mutation-types";
import { defaultClient as apolloClient } from "../../main";
import { SIGNUP_USER, SIGNIN_USER, GET_CURRENT_USER } from "@/api";
import router from "@/router/index";

const formatError = (error: GqlError | null) => {
  return error
    ? {
        ...error,
        message: error?.message.replace("GraphQL error: ", "")
      }
    : null;
};
interface GqlError {
  name: string;
  message: string;
}
interface AuthModuleState {
  currentUser: any;
  error: GqlError | null;
}

interface SignupPayload {
  handle: string;
  email: string;
  password: string;
}

export const state = {
  currentUser: null,
  error: null
};
const getters = {
  isAuth: (state: AuthModuleState) => !!state.currentUser,
  authError: (state: AuthModuleState) => formatError(state.error),
  me: (state: AuthModuleState) => state.currentUser
};
export const actions = {
  logout: async ({ commit }: { commit: Function }) => {
    localStorage.setItem("token", "");
    commit(types.SET_CURRENT_USER, null);
    await apolloClient.resetStore();
    commit(types.SET_LOG_OUT_SUCCESS);
    await router.push("/login");
  },
  signup: async ({ commit }: { commit: Function }, payload: SignupPayload) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: SIGNUP_USER,
        variables: payload
      });
      const { token, user } = data.signup;
      localStorage.setItem("token", token);
      commit(types.SET_LOGIN_SUCCESS, user);
      await router.push("/");
    } catch (e) {
      //eslint-disable-next-line
      console.warn(e);
      const { message, name } = e;
      commit(types.SET_AUTH_ERROR, { message, name });
    }
  },
  signin: async ({ commit }: { commit: Function }, payload: SignupPayload) => {
    try {
      localStorage.setItem("token", "");
      const { data } = await apolloClient.mutate({
        mutation: SIGNIN_USER,
        variables: payload
      });
      const { token, user } = data.signin;
      localStorage.setItem("token", token);
      commit(types.SET_LOGIN_SUCCESS, user);
      await router.push("/");
    } catch (e) {
      //eslint-disable-next-line
      console.warn(e);
      const { message, name } = e;
      commit(types.SET_AUTH_ERROR, { message, name });
    }
  },
  getCurrentUser: async ({ commit }: { commit: Function }) => {
    try {
      const { data } = await apolloClient.query({ query: GET_CURRENT_USER });
      commit(types.SET_CURRENT_USER, data.getCurrentUser);
    } catch (e) {
      //eslint-disable-next-line
      console.warn(e);
      const { message, name } = e;
      commit(types.SET_AUTH_ERROR, { message, name });
      /* const { message, name } = e;
      commit(types.SET_AUTH_ERROR, { message, name });*/
    }
  }
};
export const mutations = {
  [types.SET_AUTH_ERROR]: (state: AuthModuleState, error: GqlError) =>
    (state.error = error),
  [types.SET_CURRENT_USER]: (state: AuthModuleState, user: any) =>
    (state.currentUser = user),
  [types.SET_LOG_OUT_SUCCESS]: (state: AuthModuleState) =>
    (state.currentUser = null),
  [types.SET_LOGIN_SUCCESS]: (state: AuthModuleState, user: any) =>
    (state.currentUser = user),
  [types.CLEAR_ERRORS]: (state: AuthModuleState) => (state.error = null)
};
export default {
  state,
  getters,
  actions,
  mutations
};
