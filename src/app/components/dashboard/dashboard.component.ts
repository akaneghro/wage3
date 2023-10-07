import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashboardData } from 'src/app/models/dashboard-data';

@Component({
  selector: 'wage3-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  today: Date;
  totalAssets: number;
  investedAmount: number;
  earnedToday: number;
  currentBalance: number;
  @Input() dashboardData: DashboardData;
  @Output() changeMainTabToProjects: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.today = new Date();
    this.totalAssets = 5000.25;
    this.investedAmount = 2500;
    this.earnedToday = 5;
    this.currentBalance = 2500;
  }

  emitChangeInMainTabToProjects() {
    this.changeMainTabToProjects.emit();
  }
}
