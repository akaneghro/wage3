import { Component, OnInit } from '@angular/core';
import { TypesOfMainTab } from 'src/app/enums/types-of-main-tab';
import { TypesOfUser } from 'src/app/enums/types-of-user';
import { DashboardData } from 'src/app/models/dashboard-data';
import { Project } from 'src/app/models/project';
import { Wage3Service } from 'src/app/services/wage3.service';
import { Web3Service } from 'src/app/services/web3.service';
import moment from 'moment';

@Component({
  selector: 'wage3-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.sass'],
})
export class EmployeeDashboardComponent implements OnInit {
  public openProjects: Array<Project>;
  public completedProjects: Array<Project>;
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
    this.dashboardData = <DashboardData>{
      supportingAmount: 0,
    };
    this.typeOfUser = TypesOfUser.Employee;
    this.typeOfMainTabSelected = TypesOfMainTab.Dashboard;
    this.web3Service.web3Loaded.subscribe(async (ok) => {
      await this.setupDashboardData();
      await this.web3Service.switchNetwork('0x13881');
      this.wage3Service.initService(await this.web3Service.getWeb3());
      this.wage3Service.getProjects().subscribe((projects) => {
        if (projects) {
          this.completedProjects = projects.filter((project) =>
            moment(project.endDate).isBefore(moment())
          );
          this.supportedProjects = projects.filter((project) => {
            return project.amountLoanedByUser > 0;
          });
          this.supportedProjects.forEach((project) => {
            this.dashboardData.supportingAmount += project.amountLoanedByUser;
          });
          this.openProjects = projects.filter((project) => {
            return (
              moment(project.endFinancingDate).isAfter(moment()) &&
              moment(project.startFinancingDate).isBefore(moment()) &&
              project.amountLoanedByUser == 0
            );
          });

          this.dashboardData.numberOfCompletedProjects =
            this.completedProjects.length;
          this.dashboardData.numberOfOpenProjects = this.openProjects.length;
          this.dashboardData.numberOfSupportedProjects =
            this.supportedProjects.length;
        }
      });
    });
  }

  async setupDashboardData() {
    this.web3Service.getAccounts().then((accounts) => {
      this.dashboardData.address = accounts[0];
      this.web3Service
        .getBalanceInEth(this.dashboardData.address)
        .then((balance) => {
          let balanceByThousand = parseInt(balance) * 1000;
          this.dashboardData.currentBalance = balanceByThousand;
        });
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
