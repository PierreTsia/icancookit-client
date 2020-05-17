<template>
  <v-container class="signUp grey lighten-5 d-flex align-center">
    <v-row no-gutters>
      <v-col cols="12" offset="0" lg="6" offset-lg="3" align="center">
        <v-card class="login pa-4 mx-auto">
          <slot name="alert" />
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              class="input"
              v-model="handle"
              :rules="handleRules"
              label="User Name"
              required
            ></v-text-field>
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
            <v-text-field
              class="input"
              v-model="password2"
              :rules="password2Rules"
              type="password"
              label="Confirm password"
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
              Sign Up
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
            class="signup__footer"
            @click="$emit('onSetActiveAuthProcess', authProcess.LOGIN)"
            >Already have an account ? Click here to
            <span class="secondary--text"> Login </span></v-card-subtitle
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
  name: "SignUp",
  setup(props: any, { root }: SetupContext) {
    const { $store } = root;
    const authProcess = AuthProcess;
    const form: Ref<any> = ref(null);
    const valid: Ref<boolean> = ref(true);
    const handle: Ref<string> = ref("");
    const email: Ref<string> = ref("");
    const password: Ref<string> = ref("");
    const password2: Ref<string> = ref("");
    const handleValidateClick = async () => {
      if (form.value.validate()) {
        await $store.dispatch("signup", {
          handle: handle.value,
          email: email.value,
          password: password.value
        });
      }
    };

    const handleResetClick = () => {
      form.value.reset();
    };

    const {
      handleRules,
      passwordRules,
      password2Rules,
      emailRules
    } = useSignUp(handle, email, password);

    return {
      authProcess,
      form,
      valid,
      handle,
      email,
      password,
      password2,
      handleRules,
      passwordRules,
      password2Rules,
      emailRules,
      handleValidateClick,
      handleResetClick
    };
  }
};
</script>
