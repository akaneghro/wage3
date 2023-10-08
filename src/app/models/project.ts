import { ProjectState } from '../enums/project-states';
import { AddressAmount } from './address-amount';

export interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
  startFinancingDate: Date;
  endFinancingDate: Date;
  endDate: Date;
  amountProposed: number;
  amountAchieved: number;
  amountLoanedByUser: number;
  interestRate: number;
  projectAddress: string;
  ownerAddress: string;
  loanerAddress: string;
  state: ProjectState;
  addressesAndAmounts: Array<AddressAmount>;
}
