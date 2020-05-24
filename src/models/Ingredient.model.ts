import { As } from "@/models/common";
export type SpoonIngredientId = string & As<"SpoonIngredientId">;
export const INGREDIENT_URL =
  "https://spoonacular.com/cdn/ingredients_100x100/";
export class Ingredient {
  id: SpoonIngredientId;
  name: string;
  aisle: string;
  consistency: string;
  image: string;
  amount: number;
  unit: string;
  constructor(obj: any) {
    this.aisle = obj.aisle;
    this.amount = obj.amount;
    this.consistency = obj.consistency;
    this.id = obj.id;
    this.name = obj.name;
    this.image = `${INGREDIENT_URL}${obj.image}`;
    this.unit = obj.unit;
  }
}
