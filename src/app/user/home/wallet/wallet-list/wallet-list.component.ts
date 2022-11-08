import {Component, OnInit} from '@angular/core';
import {Wallet} from "../../../model/wallet";
import {WalletService} from "../../../service/wallet.service";

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.css']
})
export class WalletListComponent implements OnInit {
  wallet: Wallet[] = [];

  constructor(private walletService: WalletService,
  ) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.walletService.getAll().subscribe(wallets => {
      this.wallet = wallets;
    })
  }


}
