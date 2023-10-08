import { Component, OnInit } from '@angular/core';
import { TypesOfMainTab } from 'src/app/enums/types-of-main-tab';
import { TypesOfUser } from 'src/app/enums/types-of-user';
import { DashboardData } from 'src/app/models/dashboard-data';
import { Project } from 'src/app/models/project';
import { Wage3Service } from 'src/app/services/wage3.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'wage3-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.sass'],
})
export class EmployeeDashboardComponent implements OnInit {
  public openProjects: Array<Project>;
  public supportedProjects: Array<Project>;
  public typeOfMainTabSelected: TypesOfMainTab;
  TypesOfMainTab = TypesOfMainTab;
  typeOfUser: TypesOfUser;
  public dashboardData: DashboardData;

  constructor(
    private web3Service: Web3Service,
    private wage3Service: Wage3Service
  ) {}

  ngOnInit(): void {
    this.typeOfUser = TypesOfUser.Employee;
    this.typeOfMainTabSelected = TypesOfMainTab.Dashboard;

    this.web3Service.web3Loaded.subscribe((ok) => {
      this.setupDashboardData();
      this.getOpenProjects();
      this.getSupportedProjects();
    });
  }

  setupDashboardData() {
    this.dashboardData = <DashboardData>{
      address: this.web3Service.getAccounts()[0],
      currentBalance: 1300.53,
      supportingAmount: 8500,
      numberOfSupportedProjects: 2,
      numberOfCompletedProjects: 0,
      numberOfOpenProjects: 5,
      earnedToday: 50.45,
    };
  }

  getSupportedProjects() {
    this.wage3Service
      .getSupportedProjectsByTheEmployee()
      .subscribe((projects) => {
        this.supportedProjects = projects;
      });
  }

  getOpenProjects() {
    this.wage3Service.getOpenProjects().subscribe((projects) => {
      this.openProjects = projects;
    });
  }

  changeInMainTab(newType: TypesOfMainTab) {
    this.typeOfMainTabSelected = newType;
  }

  changeMainTabToProjects() {
    this.changeInMainTab(TypesOfMainTab.Projects);
  }
}
