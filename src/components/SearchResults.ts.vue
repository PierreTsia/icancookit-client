<template>
  <div class="searchResults">
    <v-row v-for="(row, rowIndex) in resultsRows" :key="rowIndex">
      <v-col
        cols="12"
        sm="6"
        md="3"
        align-self="center"
        class="mx-auto"
        v-for="(i, colIndex) in 4"
        :key="colIndex"
      >
        <RecipeCard :recipe="resultsRows[rowIndex][colIndex]" />
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import RecipeCard from "@/components/RecipeCard.ts.vue";
import { computed, defineComponent } from "@vue/composition-api";
import { chunk } from "lodash";

const SearchResults = defineComponent({
  name: "SearchResults",
  components: { RecipeCard },
  setup(_, { root }) {
    const resultsRows = computed(() => {
      return chunk(root.$store.getters.searchResults, 6);
    });

    const deviceWidth = computed(() => {
      return window.innerWidth;
    });

    return { resultsRows, deviceWidth };
  }
});
export default SearchResults;
</script>
