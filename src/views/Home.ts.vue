<template>
  <div class="home">
    <h1>HOME</h1>
  </div>
</template>

<script lang="ts">
import { watch, defineComponent } from "@vue/composition-api";

const Home = defineComponent({
  name: "Home",
  components: {},
  setup(props, { root }) {
    watch(
      () => root.$store.getters.isAuth,
      isAuth => {
        if (!isAuth) root.$router.push("/login");
      }
    );
  }
});
export default Home;
</script>
<style lang="stylus">
.home
  height 100vh
  display flex
  flex-direction column
  justify-content  center
</style>
