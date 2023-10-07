import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TypesOfMainTab } from 'src/app/enums/types-of-main-tab';

@Component({
  selector: 'wage3-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  @Input() typeOfMainTabSelected: TypesOfMainTab;
  @Output() changeInMainTabEmitter: EventEmitter<TypesOfMainTab> =
    new EventEmitter();
  TypesOfMainTab = TypesOfMainTab;

  constructor() {}

  ngOnInit(): void {}

  emitChangeInMainTab(newType: TypesOfMainTab) {
    this.changeInMainTabEmitter.emit(newType);
  }
}
