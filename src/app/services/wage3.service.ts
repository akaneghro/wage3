import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { Observable, Subject, of } from 'rxjs';
import * as Wage3AbiContract from '../contracts/Wage3.json';
import Web3 from 'web3';
import moment from 'moment';
import { AddressAmount } from '../models/address-amount';

@Injectable({
  providedIn: 'root',
})
export class Wage3Service {
  private web3: Web3;
  //private bigNumber: any;
  private webAbiContract: any = Wage3AbiContract;
  private contract: any;
  private address: string;
  private projects: Subject<Array<Project>> = new Subject<Array<Project>>();

  constructor() {}

  initService(web3: Web3) {
    this.web3 = web3;
    this.contract = new this.web3.eth.Contract(
      this.webAbiContract.default.abi,
      this.webAbiContract.default.contract
    );
    this.web3.eth.getAccounts().then((accounts) => {
      this.address = accounts[0];
    });
    //this.bigNumber = this.web3.utils.toBN;
  }

  getProjects(): Subject<Array<Project>> {
    this.contract.methods.getProjects().call((error, result) => {
      if (!error) {
        this.projects.next(
          result.map((project) => {
            let projectMapped = this.mapProject(project);
            return projectMapped;
          })
        );
      } else {
        console.error(error);
      }
    });
    return this.projects;
  }

  async loanProject(projectId: number, amount: number) {
    const amountToSend = this.web3.utils.toWei(
      this.web3.utils.toBN(amount),
      'ether'
    );

    const gasAmount = await this.contract.methods
      .loanProject(projectId, amount)
      .estimateGas({ from: this.address })
      .then((gasAmount) => gasAmount);

    return this.contract.methods.loanProject(projectId, amount).send(
      { from: this.address, value: amountToSend, gas: gasAmount * 2 }, //TO-DO AVERIGUAR BIEN EL COSTE DEL GAS
      () => {
        console.log('Transacción enviada');
      }
    );
  }

  async claimLoanWithInterest(projectId: number) {
    this.contract.methods
      .claimLoanWithInterest(projectId)
      .send({ from: this.address }, (error, transactionHash) => {
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
      .send({ from: this.address }, (error, transactionHash) => {
        if (!error) {
          console.log(`Transacción enviada: ${transactionHash}`);
        } else {
          console.error(error);
        }
      });
  }

  mapProject(data: Array<any>): Project {
    return <Project>{
      id: data[0],
      title: data[1],
      description: data[2],
      amountProposed: data[3],
      interestRate: data[4],
      startDate: moment.unix(data[5]).toDate(),
      endDate: moment.unix(data[6]).toDate(),
      state: data[7],
      addressesAndAmounts: data[9].map((addressAndAmount) => {
        return <AddressAmount>{
          address: addressAndAmount[0],
          amount: addressAndAmount[1],
        };
      }),
    };
  }
}
