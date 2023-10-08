import { Component, Input, OnInit } from '@angular/core';
import { TypesOfProjectTab } from 'src/app/enums/types-of-project-tabs';
import { TypesOfUser } from 'src/app/enums/types-of-user';
import { Project } from 'src/app/models/project';
import moment from 'moment';
import { Wage3Service } from 'src/app/services/wage3.service';

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
  public amountToLoan: number;

  public duration: string;
  public timeLeft: string;
  public estimatedInterest: number;

  constructor(private wage3Service: Wage3Service) {}

  ngOnInit(): void {
    this.duration = this.getDifferenceInMonthsAndDays(
      this.project.startFinancingDate,
      this.project.endDate
    );
    this.timeLeft = this.getDifferenceInMonthsAndDays(
      new Date(),
      this.project.endFinancingDate
    );
    if (this.tabSelected == TypesOfProjectTab.Supported) {
      let totalInterest = this.calculateInterest(
        this.project.startFinancingDate,
        this.project.endDate,
        this.project.interestRate
      );
      this.estimatedInterest =
        this.project.amountLoanedByUser +
        (this.project.amountLoanedByUser * totalInterest) / 100;
    }
  }

  calculateInterest(
    startDate: Date,
    endDate: Date,
    annualInterestRate: number
  ): number {
    // Convertir las fechas a objetos moment
    const start = moment(startDate);
    const end = moment(endDate);

    // Calcular la diferencia en años (como número decimal)
    const yearsDifference = end.diff(start, 'years', true);

    // Calcular el interés
    const interest = yearsDifference * annualInterestRate;

    return interest;
  }

  getDifferenceInMonthsAndDays(date1: Date, date2: Date): string {
    const mDate1 = moment(date1);
    const mDate2 = moment(date2);
    const diffInMonths = mDate2.diff(mDate1, 'months');
    mDate1.add(diffInMonths, 'months');
    const diffInDays = mDate2.diff(mDate1, 'days');

    return `${diffInMonths} month(s) and ${diffInDays} day(s)`;
  }

  async supportProject(project: Project) {
    const amount = this.amountToLoan / 1000000000000000000;
    debugger;
    await this.wage3Service.loanProject(project.id, this.amountToLoan);
  }
}
