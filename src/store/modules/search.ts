import { SEARCH_RECIPES } from "@/api";
import { defaultClient as apolloClient } from "../../main";
import { SpoonRecipe } from "@/models/Recipe.model";
import * as types from "./../mutation-types";

interface SearchState {
  results: SpoonRecipe[];
  isLoading: boolean;
}
interface SearchInput {
  queryString: string;
  max: number;
}

const state = {
  results: [],
  isLoading: false
};

const getters = {
  searchResults: (state: SearchState) => state.results,
  searchIsLoading: (state: SearchState) => state.isLoading
};

const actions = {
  searchRecipes: async (
    { commit }: { commit: Function },
    { queryString, max = 20 }: SearchInput
  ) => {
    try {
      commit(types.SEARCH_RECIPES_LOADING, true);
      const { data } = await apolloClient.query({
        query: SEARCH_RECIPES,
        variables: { searchInput: { queryString, max } }
      });
      const recipes = data.searchRecipes.map(
        (recipe: any) => new SpoonRecipe(recipe)
      );
      commit(types.SEARCH_RECIPES_SUCCESS, recipes);
      commit(types.SEARCH_RECIPES_LOADING, false);
    } catch (e) {
      console.warn(e);
    }
  }
};

const mutations = {
  [types.SEARCH_RECIPES_LOADING]: (state: SearchState, isLoading: boolean) =>
    (state.isLoading = isLoading),
  [types.SEARCH_RECIPES_SUCCESS]: (
    state: SearchState,
    recipes: SpoonRecipe[]
  ) => (state.results = recipes)
};

export default { state, getters, actions, mutations };
