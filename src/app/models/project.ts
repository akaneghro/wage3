import { ProjectState } from '../enums/project-states';
import { AddressAmount } from './address-amount';

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
  addressesAndAmounts: Array<AddressAmount>;
}
