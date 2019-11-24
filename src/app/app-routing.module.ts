import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComicListComponent } from './comic-list/comic-list.component'
import { ComicDetailComponent } from './comic-detail/comic-detail.component'


const routes: Routes = [
  { path: '', redirectTo: 'comics', pathMatch: 'full' },
  { path: 'comics', component: ComicListComponent },
  { path: 'comics/detail/:id/:title', component: ComicDetailComponent },
  // { path: 'add', component: CreateEmployeeComponent },
  // { path: 'update/:id', component: UpdateEmployeeComponent },
  // { path: 'details/:id', component: EmployeeDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
