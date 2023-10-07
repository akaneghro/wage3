import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wage3-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.sass'],
})
export class ProgressBarComponent implements OnInit {
  @Input() currentNumber: number;
  @Input() maxNumber: number;

  public percentage: number;
  constructor() {}

  ngOnInit(): void {
    this.percentage = (this.currentNumber * 100) / this.maxNumber;
  }
}
