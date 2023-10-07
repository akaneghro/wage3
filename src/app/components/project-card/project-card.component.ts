import { Component, Input, OnInit } from '@angular/core';
import { TypesOfProjectTab } from 'src/app/enums/types-of-project-tabs';
import { TypesOfUser } from 'src/app/enums/types-of-user';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'wage3-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.sass'],
})
export class ProjectCardComponent implements OnInit {
  @Input() project: Project;
  @Input() tabSelected: TypesOfProjectTab;
  @Input() typeOfUser: TypesOfUser;
  TypesOfProjectTab = TypesOfProjectTab;
  TypesOfUser = TypesOfUser;

  public duration: string;

  constructor() {}

  ngOnInit(): void {}
}
