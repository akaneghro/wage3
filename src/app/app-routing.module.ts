import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDashboardComponent } from './pages/employee-dashboard/employee-dashboard.component';
import { CompanyDashboardComponent } from './pages/company-dashboard/company-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeDashboardComponent,
  },
  {
    path: 'company',
    component: CompanyDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
