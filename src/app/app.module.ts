import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyDashboardComponent } from './pages/company-dashboard/company-dashboard.component';
import { EmployeeDashboardComponent } from './pages/employee-dashboard/employee-dashboard.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { MainCardComponent } from './components/main-card/main-card.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { ProjectsTabComponent } from './components/projects-tab/projects-tab.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CompanyDashboardComponent,
    EmployeeDashboardComponent,
    ProjectCardComponent,
    ProjectDetailsComponent,
    HeaderComponent,
    DashboardComponent,
    LoaderComponent,
    MainCardComponent,
    ProgressBarComponent,
    ProjectsTabComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, CommonModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
