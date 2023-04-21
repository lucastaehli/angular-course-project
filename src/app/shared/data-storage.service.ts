import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import {map, tap} from "rxjs";

@Injectable()
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put('https://course-recipe-book-8e793-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
      .subscribe(  response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>('https://course-recipe-book-8e793-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            // ensure ingredients is always initialized
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
          })
        }),
        // execute additional code
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )
  }
}
