import { Component, Input, OnInit } from '@angular/core';
import { TypesOfProjectTab } from 'src/app/enums/types-of-project-tabs';
import { TypesOfUser } from 'src/app/enums/types-of-user';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'wage3-projects-tab',
  templateUrl: './projects-tab.component.html',
  styleUrls: ['./projects-tab.component.sass'],
})
export class ProjectsTabComponent implements OnInit {
  @Input() projects: Array<Project>;
  @Input() typeOfUser: TypesOfUser;
  tabSelected: TypesOfProjectTab;
  TypesOfProjectTab = TypesOfProjectTab;
  TypesOfUser = TypesOfUser;

  constructor() {}

  ngOnInit(): void {}
}
