import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionComponent } from './collection.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CollectionComponent,
    data: { title: 'Collection' }
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionRoutingModule { }
