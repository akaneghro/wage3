import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'wage3-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.sass'],
})
export class ProjectListComponent implements OnInit {
  @Input() projects: Array<Project>;

  constructor() {}

  ngOnInit(): void {}
}
