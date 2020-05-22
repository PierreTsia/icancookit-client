<template>
  <v-app>
    <v-content>
      <Navbar v-if="$store.getters.isAuth" />
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "@/components/Navbar.ts.vue";

export default Vue.extend({
  name: "App",
  components: { Navbar }
});
</script>
