import { Component } from '@angular/core';
import Web3 from 'web3';
import { Web3Service } from './services/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'wage3';

  constructor(private web3Service: Web3Service) {
    this.web3Service.web3Loaded.subscribe((ok) => {
      this.getAccounts();
    });
  }

  getAccounts = async () => {
    const accounts = await this.web3Service.getAccounts();
  };
}
