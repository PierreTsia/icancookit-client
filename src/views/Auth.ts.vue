<template>
  <div class="auth">
    <component
      v-if="!$store.getters.isAuth"
      :is="activeAuthComponent"
      @onSetActiveAuthProcess="handleSetActiveProcess"
    >
      <template slot="alert">
        <v-alert
          v-if="$store.getters.authError"
          dense
          outlined
          type="error"
          class="home__error"
        >
          {{ $store.getters.authError.message }}
        </v-alert>
      </template>
    </component>
  </div>
</template>

<script lang="ts">
import { SetupContext, ref, Ref, computed, watch } from "@vue/composition-api";
import { AuthProcess } from "@/hooks/auth";
import SignUp from "@/components/SignUp.ts.vue";
import SignIn from "@/components/SignIn.ts.vue";
export default {
  name: "Auth",
  components: { SignUp, SignIn },
  setup(props: any, { root }: SetupContext) {
    const activeAuthProcess: Ref<AuthProcess> = ref(AuthProcess.SIGNUP);
    const handleSetActiveProcess = (process: AuthProcess) => {
      root.$store.commit("CLEAR_ERRORS");
      activeAuthProcess.value = process;
    };
    const activeAuthComponent = computed(() => {
      return activeAuthProcess.value === AuthProcess.SIGNUP
        ? "SignUp"
        : "SignIn";
    });

    watch(
      () => root.$store.getters.isAuth,
      isAuth => {
        if (isAuth) root.$router.push("/");
      }
    );

    return {
      activeAuthProcess,
      handleSetActiveProcess,
      activeAuthComponent
    };
  }
};
</script>
<style lang="stylus">
.auth
  height 100vh
  display flex
  flex-direction column
  justify-content  center
</style>
