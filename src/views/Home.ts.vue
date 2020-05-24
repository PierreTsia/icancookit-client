<template>
  <v-container fluid class="home">
    <Search />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import Search from "@/components/Search.ts.vue";

const Home = defineComponent({
  name: "Home",
  components: { Search }
});
export default Home;
</script>
<style lang="stylus">
.home
  height calc(100vh - 48px)
  display flex
  flex-direction column
  justify-content  flex-start
</style>
