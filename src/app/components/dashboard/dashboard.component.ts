import { Component, OnInit } from '@angular/core';

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
  constructor() {}

  ngOnInit(): void {
    this.today = new Date();
    this.totalAssets = 5000.25;
    this.investedAmount = 2500;
    this.earnedToday = 5;
  }
}
