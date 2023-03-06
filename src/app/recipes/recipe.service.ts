import {Recipe} from "./recipe.model";
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Tasty Schnitzel',
  //     'A super duper tasty schnitzel - awesome!',
  //     'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.pds-JWQhtkDCcud3OrpVdQHaE7%26pid%3DApi&f=1&ipt=c9bfebe58e5e3469196a7178091e5954203361b2603e4511442ec604b79eba42&ipo=images',
  //     [
  //       new Ingredient("Meat", 1),
  //       new Ingredient("French Fries", 20)
  //     ]
  //     ),
  //   new Recipe(
  //     'Spaghetti',
  //     'Spaghetti Bolognese',
  //     'http://www.mnftiu.cc/wp-content/uploads/2013/12/spaghetti-with-tomato-sauce.jpg',
  //     [
  //       new Ingredient("Pasta", 1),
  //       new Ingredient("Meat", 1)
  //     ]
  //     )
  // ];

  constructor(private shoppingListService: ShoppingListService) {
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice())
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice())
  }
}
