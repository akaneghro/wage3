import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TypesOfMainTab } from 'src/app/enums/types-of-main-tab';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardData } from 'src/app/models/dashboard-data';

@Component({
  selector: 'wage3-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  @Input() typeOfMainTabSelected: TypesOfMainTab;
  @Input() dashboardData: DashboardData;
  @Output() changeInMainTabEmitter: EventEmitter<TypesOfMainTab> =
    new EventEmitter();
  TypesOfMainTab = TypesOfMainTab;

  constructor() {}

  ngOnInit(): void {}

  emitChangeInMainTab(newType: TypesOfMainTab) {
    this.changeInMainTabEmitter.emit(newType);
  }
}
