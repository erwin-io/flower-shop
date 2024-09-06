import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CollectionsComponent } from './collections/collections.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    ShopComponent,
    CategoriesComponent,
    CollectionsComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ShopComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'collections', component: CollectionsComponent },
      { path: 'search', component: SearchComponent }
    ])
  ]
})
export class ShopModule { }