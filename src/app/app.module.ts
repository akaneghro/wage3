import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyDashboardComponent } from './pages/company-dashboard/company-dashboard.component';
import { EmployeeDashboardComponent } from './pages/employee-dashboard/employee-dashboard.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CompanyDashboardComponent,
    EmployeeDashboardComponent,
    ProjectListComponent,
    ProjectCardComponent,
    ProjectDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
