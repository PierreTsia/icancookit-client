<template>
  <v-app-bar color="primary accent-4" dense dark class="navbar">
    <v-spacer></v-spacer>

    <v-btn icon>
      <v-avatar size="36">
        <img
          :src="$store.getters.me.avatar"
          :alt="$store.getters.me.displayName"
        />
      </v-avatar>
    </v-btn>

    <v-btn icon @click.native="handleLogout" class="navbar__logout">
      <v-icon>mdi-logout-variant</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";

const Navbar = defineComponent({
  name: "Navbar",
  setup(props, { root }) {
    const handleLogout = async () => {
      await root.$store.dispatch("logout");
    };

    return {
      handleLogout
    };
  }
});
export default Navbar;
</script>
