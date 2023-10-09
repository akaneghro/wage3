import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDashboardComponent } from './pages/employee-dashboard/employee-dashboard.component';
import { CompanyDashboardComponent } from './pages/company-dashboard/company-dashboard.component';
import { RedirectGuard } from './guards/redirect-guard';

const routes: Routes = [
  {
    path: '',
    component: EmployeeDashboardComponent,
  },
  {
    path: 'company',
    component: CompanyDashboardComponent,
  },
  {
    path: 'demo',
    canActivate: [RedirectGuard],
    component: RedirectGuard,
    data: {
      externalUrl:
        'https://www.figma.com/proto/wADIFYX68ZJ7NjcoKpf9aQ/Hackaton-Wage-3?page-id=99%3A6158&type=design&node-id=135-8862&viewport=429%2C-219%2C0.04&t=U9zNRP0KGfan6NBX-1&scaling=contain&starting-point-node-id=135%3A8862&mode=design',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
