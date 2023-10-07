import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyDashboardComponent } from './pages/company-dashboard/company-dashboard.component';
import { EmployeeDashboardComponent } from './pages/employee-dashboard/employee-dashboard.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { MainCardComponent } from './components/main-card/main-card.component';

@NgModule({
  declarations: [
    AppComponent,
    CompanyDashboardComponent,
    EmployeeDashboardComponent,
    ProjectListComponent,
    ProjectCardComponent,
    ProjectDetailsComponent,
    HeaderComponent,
    DashboardComponent,
    LoaderComponent,
    MainCardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
