import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { Wage3Service } from 'src/app/services/wage3.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'wage3-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.sass'],
})
export class CompanyDashboardComponent implements OnInit {
  public projects: Array<Project>;

  constructor(
    private web3Service: Web3Service,
    private wage3Service: Wage3Service
  ) {}

  ngOnInit(): void {}
}
