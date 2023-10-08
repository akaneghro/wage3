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

  async ngOnInit(): Promise<void> {
    this.typeOfUser = TypesOfUser.Employee;
    this.typeOfMainTabSelected = TypesOfMainTab.Dashboard;
    this.web3Service.web3Loaded.subscribe(async (ok) => {
      await this.setupDashboardData();
      await this.web3Service.switchNetwork('0x13881');
      this.wage3Service.initService(await this.web3Service.getWeb3());
      this.wage3Service.getProjects().subscribe((projects) => {
        debugger;
        if (projects) {
          this.openProjects = projects;
        }
      });
    });
  }

  async setupDashboardData() {
    this.dashboardData = <DashboardData>{
      supportingAmount: 8500,
      numberOfSupportedProjects: 2,
      numberOfCompletedProjects: 0,
      numberOfOpenProjects: 5,
      earnedToday: 50.45,
    };

    this.web3Service.getAccounts().then((accounts) => {
      this.dashboardData.address = accounts[0];
      this.web3Service
        .getBalance(this.dashboardData.address)
        .then((balance) => {
          this.dashboardData.currentBalance = balance as any;
        });
    });
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

  loanProject(projectId: number, amount: number) {
    this.wage3Service.loanProject(projectId, amount).then((transactionHash) => {
      console.log(transactionHash);
    });
  }

  claimLoanWithInterest(projectId: number) {
    this.wage3Service
      .claimLoanWithInterest(projectId)
      .then((transactionHash) => {
        console.log(transactionHash);
      });
  }

  claimLoanWithoutInterest(projectId: number) {
    this.wage3Service
      .claimLoanWithoutInterest(projectId)
      .then((transactionHash) => {
        console.log(transactionHash);
      });
  }

  changeInMainTab(newType: TypesOfMainTab) {
    this.typeOfMainTabSelected = newType;
  }

  changeMainTabToProjects() {
    this.changeInMainTab(TypesOfMainTab.Projects);
  }
}
