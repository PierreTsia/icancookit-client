<template>
  <v-container class="signIn grey lighten-5 d-flex align-center">
    <v-row no-gutters>
      <v-col cols="12" offset="0" lg="6" offset-lg="3" align="center">
        <v-card class="pa-4 mx-auto">
          <slot name="alert" />
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              class="input"
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              class="input"
              v-model="password"
              :rules="passwordRules"
              type="password"
              label="Password"
              required
            ></v-text-field>
            <v-btn
              :disabled="!valid"
              rounded
              min-width="100"
              color="primary"
              class="btn--validate ma-4"
              @click.native="handleValidateClick"
            >
              Sign In
            </v-btn>

            <v-btn
              color="primary"
              outlined
              min-width="100"
              rounded
              class="mr-4 btn--reset"
              @click.native="handleResetClick"
            >
              Reset
            </v-btn>
          </v-form>
          <v-card-subtitle
            class="signIn__footer"
            @click="$emit('onSetActiveAuthProcess', authProcess.SIGNUP)"
            >Don't have an account yet ? Click here to
            <span class="secondary--text"> Sign up </span></v-card-subtitle
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { ref, Ref, SetupContext } from "@vue/composition-api";
import { useSignUp, AuthProcess } from "@/hooks/auth";

export default {
  name: "SignIn",
  setup(props: any, { root }: SetupContext) {
    const { $store } = root;
    const authProcess = AuthProcess;
    const form: Ref<any> = ref(null);
    const valid: Ref<boolean> = ref(true);
    const handle: Ref<string> = ref("");
    const email: Ref<string> = ref("");
    const password: Ref<string> = ref("");
    const handleValidateClick = async () => {
      $store.commit("CLEAR_ERRORS");
      if (form.value.validate()) {
        await $store.dispatch("signin", {
          email: email.value,
          password: password.value
        });
      }
    };

    const handleResetClick = () => {
      $store.commit("CLEAR_ERRORS");
      form.value.reset();
    };

    const { handleRules, passwordRules, emailRules } = useSignUp(
      handle,
      email,
      password
    );

    return {
      authProcess,
      form,
      valid,
      handle,
      email,
      password,
      handleRules,
      passwordRules,
      emailRules,
      handleValidateClick,
      handleResetClick
    };
  }
};
</script>
<style lang="stylus">
.signIn
  .signIn__footer
    cursor pointer
</style>
