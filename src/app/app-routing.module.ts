import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardRestComponent } from './dashboard-rest/dashboard-rest.component';
import { DashboardGraphqlComponent } from './dashboard-graphql/dashboard-graphql.component';

const routes: Routes = [
  { path: 'dashboard-rest', component: DashboardRestComponent },
  { path: 'dashboard-graphql', component: DashboardGraphqlComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
