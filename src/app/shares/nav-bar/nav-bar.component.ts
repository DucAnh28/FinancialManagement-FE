import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../account/service/account.service";
import {AppUser} from "../../user/model/appUser";
import {Router} from "@angular/router";
import {LoginComponent} from "../../account/login/login.component";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  appUser: AppUser = {}

  constructor(private accountService: AccountService,
              private router :Router) {
    accountService.getUserById().subscribe(data => {
      this.appUser = data;
    })
  }

  ngOnInit(): void {
  }

  logout() {
    this.accountService.logout();
    this.router.navigate([""]);
  }
}
