<template>
  <div class="home">
    <SignUp />
  </div>
</template>

<script lang="ts">
import { ref, SetupContext } from "@vue/composition-api";
import SignUp from "@/components/SignUp.ts.vue";
export default {
  name: "Home",
  components: { SignUp },
  setup(props: any, context: SetupContext) {
    const test = ref("pouet");
    console.log("setup", test.value);

    return { test };
  }
};
</script>
<style lang="stylus">
.home
  height 100vh
  display flex
  align-items center
</style>
