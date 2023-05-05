import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'  // only redirect if full path is empty
  },
  {
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule), //only load module, when user visits path
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule), //only load module, when user visits path
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), //only load module, when user visits path
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
