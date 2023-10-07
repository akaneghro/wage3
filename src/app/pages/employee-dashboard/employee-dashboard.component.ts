import { Component, OnInit } from '@angular/core';
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

  constructor(
    private web3Service: Web3Service,
    private wage3Service: Wage3Service
  ) {}

  ngOnInit(): void {
    this.web3Service.web3Loaded.subscribe((ok) => {
      this.getOpenProjects();
    });
  }

  getOpenProjects() {
    this.wage3Service.getOpenProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }
}
