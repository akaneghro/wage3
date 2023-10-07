import { Component, OnInit } from '@angular/core';
import { TypesOfMainTab } from 'src/app/enums/types-of-main-tab';
import { TypesOfUser } from 'src/app/enums/types-of-user';
import { Project } from 'src/app/models/project';
import { Wage3Service } from 'src/app/services/wage3.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'wage3-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.sass'],
})
export class EmployeeDashboardComponent implements OnInit {
  public projects: Array<Project>;
  public typeOfMainTabSelected: TypesOfMainTab;
  TypesOfMainTab = TypesOfMainTab;
  typeOfUser: TypesOfUser;

  constructor(
    private web3Service: Web3Service,
    private wage3Service: Wage3Service
  ) {}

  ngOnInit(): void {
    this.typeOfUser = TypesOfUser.Employee;
    this.typeOfMainTabSelected = TypesOfMainTab.Projects;
    this.web3Service.web3Loaded.subscribe((ok) => {
      this.getOpenProjects();
    });
  }

  getOpenProjects() {
    this.wage3Service.getOpenProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

  changeInMainTab(newType: TypesOfMainTab) {
    this.typeOfMainTabSelected = newType;
  }
}
