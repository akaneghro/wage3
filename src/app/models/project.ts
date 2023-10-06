export interface project {
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
}
