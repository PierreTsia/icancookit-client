import { gql } from "apollo-boost";

export const SEARCH_RECIPES = gql`
  query($searchInput: SearchInput) {
    searchRecipes(searchInput: $searchInput) {
      id
      title
      readyInMinutes
      servings
      sourceUrl
    }
  }
`;
