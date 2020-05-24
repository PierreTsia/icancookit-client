<template>
  <div class="search">
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <v-text-field
          v-model="searchQuery"
          rounded
          outlined
          prepend-inner-icon="mdi-magnify"
        >
          <v-progress-circular
            v-show="$store.getters.searchIsLoading"
            slot="append"
            indeterminate
            color="primary"
            size="24"
          ></v-progress-circular>
        </v-text-field>
        <span class="d-flex justify-end pr-3 search__advanced">
          <v-icon size="12">mdi-cog</v-icon>Advanced search</span
        >
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, watch } from "@vue/composition-api";
import { debounce } from "lodash";
const DEBOUNCE_TIMER = 500;
const MIN_CHAR = 2;
const Search = defineComponent({
  name: "Search",
  setup(props, { root }) {
    const searchQuery: Ref<string> = ref("");
    const searchRecipes = debounce(async (query: string) => {
      await root.$store.dispatch("searchRecipes", {
        queryString: searchQuery.value,
        max: 30
      });
    }, DEBOUNCE_TIMER);

    watch(
      () => searchQuery.value,
      query => {
        if (query.length > MIN_CHAR) {
          searchRecipes(searchQuery.value);
        }
      }
    );

    return { searchQuery, searchRecipes };
  }
});
export default Search;
</script>
<style lang="stylus">
.search
   .search__advanced
       cursor pointer
       font-size 0.8rem
       position relative
       top -20px
       &:hover
           color red
           .v-icon
                color #E53935
</style>
