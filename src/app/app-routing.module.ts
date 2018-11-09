import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@registration-items-components/page-not-found';
import { ItemsFormComponent, ItemsListComponent } from '@registration-items-features';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ItemsListComponent },
  { path: 'add', component: ItemsFormComponent },
  { path: 'edit/:id', component: ItemsFormComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'page-not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
