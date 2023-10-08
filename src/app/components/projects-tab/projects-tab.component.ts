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
  @Input() openProjects: Array<Project>;
  @Input() completedProjects: Array<Project>;
  @Input() supportedProjects: Array<Project>;
  @Input() typeOfUser: TypesOfUser;
  projects: Array<Project>;
  tabSelected: TypesOfProjectTab;
  TypesOfProjectTab = TypesOfProjectTab;
  TypesOfUser = TypesOfUser;

  constructor() {}

  ngOnInit(): void {
    this.changeProjectTab(TypesOfProjectTab.Open);
  }

  changeProjectTab(newType: TypesOfProjectTab) {
    this.tabSelected = newType;
    switch (newType) {
      case TypesOfProjectTab.Open:
        this.projects = this.openProjects;
        break;
      case TypesOfProjectTab.Supported:
        this.projects = this.supportedProjects;
        break;
      case TypesOfProjectTab.Completed:
        this.projects = this.completedProjects;
        break;
    }
  }
}
