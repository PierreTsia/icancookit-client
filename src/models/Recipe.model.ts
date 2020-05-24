import { As } from "@/models/common";
import { Ingredient } from "@/models/Ingredient.model";
const BASE_IMG_URL = "https://spoonacular.com/recipeImages/";

export type SpoonRecipeId = string & As<"SpoonRecipeId">;

export enum IMG_SIZE {
  XSMALL = "90x90",
  SMALL = "240x150",
  MEDIUM = "312x231",
  LARGE = "556x370",
  XLARGE = "636x393"
}

export class SpoonRecipe {
  id: SpoonRecipeId;
  title: string;
  readyInMinutes: number;
  summary: string;
  cuisines: string[];
  instructions: string;
  servings: 6;
  sourceUrl: string;
  image: string;
  dishTypes: string[];
  sourceName: string;
  creditsText: string;
  extendedIngredients: Ingredient[] = [];

  constructor(obj: any) {
    this.id = obj.id;
    this.title = obj.title;
    this.readyInMinutes = obj.readyInMinutes;
    this.summary = obj.summary;
    this.cuisines = obj.cuisines;
    this.instructions = obj.instructions;
    this.servings = obj.servings;
    this.sourceUrl = obj.sourceUrl;
    this.image = `${BASE_IMG_URL}${obj.id}-${IMG_SIZE.MEDIUM}.jpg`;
    this.dishTypes = obj.dishTypes;
    this.sourceName = obj.sourceName;
    this.sourceUrl = obj.sourceUrl;
    this.creditsText = obj.creditsText;
    if (obj.extendedIngredients) {
      this.extendedIngredients = obj.extendedIngredients.map(
        (ingredient: any) => new Ingredient(ingredient)
      );
    }
  }
}
