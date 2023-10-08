import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { Observable, Subject, of } from 'rxjs';
import * as Wage3AbiContract from '../contracts/Wage3.json';
import Web3 from 'web3';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root',
})
export class Wage3Service {
  private web3: Web3;
  private webAbiContract: any = Wage3AbiContract;
  private contract: any;

  constructor() {}

  initService(web3: Web3) {
    this.web3 = web3;
    this.contract = new this.web3.eth.Contract(
      this.webAbiContract.default.abi,
      this.webAbiContract.default.contract
    );
  }

  getOpenProjects(): Observable<Array<Project>> {
    this.contract.methods.getProjects().call((error, result) => {
      if (!error) {
        const project = result; // El resultado es un objeto con las propiedades del struct
        console.log(project); // Haz algo con el struct devuelto
      } else {
        console.error(error);
      }
    });

    const projects: Project[] = <Array<Project>>[
      <Project>{
        title: 'Ampliar el almacén',
        startDate: new Date(2024, 1, 14),
        endDate: new Date(2025, 1, 1),
        amountProposed: 50000,
        amountAchieved: 13000,
        interestRate: 5,
        ownerAddress: '0x23d902C743C8bF187659dC7107263de429DE9832',
      },
      <Project>{
        title: 'Crear una nueva línea de distribución',
        startDate: new Date(2023, 11, 1),
        endDate: new Date(2025, 1, 13),
        amountProposed: 150000,
        amountAchieved: 10000,
        interestRate: 4,
        ownerAddress: '0x23d902C743C8bF187659dC7107263de429DE9832',
      },
      <Project>{
        title: 'Expandir el negocio a Asia',
        startDate: new Date(2023, 12, 1),
        endDate: new Date(2026, 1, 23),
        amountProposed: 250000,
        amountAchieved: 250000,
        interestRate: 3,
        ownerAddress: '0x23d902C743C8bF187659dC7107263de429DE9832',
      },
    ];
    return of(projects);
  }

  getCompanyRunningProjects(): Observable<Array<Project>> {
    const projects: Project[] = <Array<Project>>[
      <Project>{
        title: 'Ampliar el almacén',
        startDate: new Date(2024, 1, 14),
        endDate: new Date(2025, 1, 1),
        amountProposed: 50000,
        amountAchieved: 13000,
        interestRate: 5,
        ownerAddress: '0x23d902C743C8bF187659dC7107263de429DE9832',
      },
      <Project>{
        title: 'Crear una nueva línea de distribución',
        startDate: new Date(2023, 11, 1),
        endDate: new Date(2025, 1, 13),
        amountProposed: 150000,
        amountAchieved: 10000,
        interestRate: 4,
        ownerAddress: '0x23d902C743C8bF187659dC7107263de429DE9832',
      },
      <Project>{
        title: 'Expandir el negocio a Asia',
        startDate: new Date(2023, 12, 1),
        endDate: new Date(2026, 1, 23),
        amountProposed: 250000,
        amountAchieved: 250000,
        interestRate: 3,
        ownerAddress: '0x23d902C743C8bF187659dC7107263de429DE9832',
      },
    ];
    return of(projects);
  }

  getSupportedProjectsByTheEmployee(): Observable<Array<Project>> {
    const projects: Project[] = <Array<Project>>[
      <Project>{
        title: 'Lo que apoya el empleado',
        startDate: new Date(2024, 1, 1),
        endDate: new Date(2025, 1, 1),
        amountProposed: 50000,
        amountAchieved: 50000,
        amountLoaned: 2500,
        interestRate: 5,
        ownerAddress: '0x23d902C743C8bF187659dC7107263de429DE9832',
      },
    ];
    return of(projects);
  }

  async loanProject(projectId: number, amount: number) {
    this.contract.methods
      .loanProject(projectId, amount)
      .send({ from: fromAccount }, (error, transactionHash) => {
        if (!error) {
          console.log(`Transacción enviada: ${transactionHash}`);
        } else {
          console.error(error);
        }
      });
  }

  async claimLoanWithInterest(projectId: number) {
    this.contract.methods
      .claimLoanWithInterest(projectId)
      .send({ from: fromAccount }, (error, transactionHash) => {
        if (!error) {
          console.log(`Transacción enviada: ${transactionHash}`);
        } else {
          console.error(error);
        }
      });
  }

  async claimLoanWithoutInterest(projectId: number) {
    this.contract.methods
      .claimLoanWithoutInterest(projectId)
      .send({ from: fromAccount }, (error, transactionHash) => {
        if (!error) {
          console.log(`Transacción enviada: ${transactionHash}`);
        } else {
          console.error(error);
        }
      });
  }
}
