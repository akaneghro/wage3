import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private web3: Web3;
  public web3Loaded = new Subject();

  constructor() {
    new Promise((resolve, reject) => {
      // Wait for loading completion to avoid race conditions with web3 injection timing.
      window.addEventListener('load', async () => {
        // Modern dapp browsers...
        const windowProxy = <any>window;
        if (windowProxy.ethereum) {
          this.web3 = new Web3(windowProxy.ethereum);
          try {
            // Request account access if needed
            await windowProxy.ethereum.enable();
            // Accounts now exposed
            resolve(this.web3);
          } catch (error) {
            reject(error);
          }
          this.web3Loaded.next();
        }
        // Legacy dapp browsers...
        else if (windowProxy.web3) {
          // Use Mist/MetaMask's provider.
          this.web3 = windowProxy.web3;
          console.log('Injected web3 detected.');
          resolve(this.web3);
          this.web3Loaded.next();
        }
        // Fallback to localhost; use dev console port by default...
        else {
          const provider = new Web3.providers.HttpProvider(
            'http://127.0.0.1:8545'
          );
          this.web3 = new Web3(provider);
          console.log('No web3 instance injected, using Local web3.');
          resolve(this.web3);
          this.web3Loaded.next();
        }
      });
    });
  }

  getWeb3 = async () => {
    return this.web3;
  };

  getAccounts = async () => {
    return this.web3.eth.getAccounts();
  };

  getNetworkId = async () => {
    return this.web3.eth.net.getId();
  };

  getNetworkType = async () => {
    return this.web3.eth.net.getNetworkType();
  };

  getChainId = async () => {
    return this.web3.eth.getChainId();
  };

  getBalance = async (account) => {
    return this.web3.eth.getBalance(account);
  };

  sign = async (message, account) => {
    return this.web3.eth.sign(
      this.web3.utils.sha3(message),
      account,
      console.log
    );
  };

  getCurrentSymbol = async () => {
    const chainId = await this.getNetworkId();
    //https://chainid.network/chains.json
    switch (chainId) {
      case 137: //Polygon production
      case 80001: //Polygon Mumbai
        return 'MATIC';
      default:
        return 'ETH';
    }
  };

  switchNetwork = async (desiredChainId) => {
    const currentChainId = await this.getNetworkId();

    if (currentChainId !== desiredChainId) {
      try {
        const proveedor = <any>this.web3.currentProvider;
        await proveedor.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: this.web3.utils.toHex(desiredChainId) }],
        });

        return true;
      } catch (switchError) {
        // // This error code indicates that the chain has not been added to MetaMask.
        // if (switchError.code === 4902) {
        //   alert('add this chain id')
        // }
        return false;
      }
    }

    return true;
  };
}
