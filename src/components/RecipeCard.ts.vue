<template>
  <v-card max-width="400" class="mx-auto">
    <v-img class="white--text align-end" height="200px" :src="recipe.image">
      <v-card-title>{{ recipe.title }}</v-card-title>
    </v-img>

    <v-card-text class="text--primary">
      <v-chip class="ma-2" color="green" text-color="white">
        <v-icon>mdi-timer-sand</v-icon>
        <v-avatar left class="green darken-4 ml-2">
          {{ recipe.readyInMinutes }}
        </v-avatar>
      </v-chip>
      <v-chip class="ma-2" color="blue" text-color="white">
        <v-icon>mdi-account-group-outline</v-icon>
        <v-avatar left class="blue darken-4 ml-2">
          {{ recipe.servings }}
        </v-avatar>
      </v-chip>
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange" text>
        Share
      </v-btn>

      <v-btn color="orange" text>
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";
const RecipeCard = defineComponent({
  name: "RecipeCard",
  props: { recipe: {} }
});
export default RecipeCard;
</script>
