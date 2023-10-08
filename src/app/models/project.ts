import { ProjectState } from '../enums/project-states';

export interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
  startDate: Date;
  endDate: Date;
  amountProposed: number;
  amountAchieved: number;
  amountLoaned: number;
  interestRate: number;
  projectAddress: string;
  ownerAddress: string;
  loanerAddress: string;
  state: ProjectState;
  addresses: Array<string>;
}
