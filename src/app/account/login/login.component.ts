import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../service/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.pattern("^([A-Z]{1})([a-z]{4,})([0-9]{1,})")])
  })

  constructor(private accountService: AccountService,
              private router: Router) {}

  ngOnInit(): void {
  }

  get username() {
    return this.loginForm.get("username")
  }

  get password() {
    return this.loginForm.get("password")
  }

  login() {
    const form = this.loginForm.value;
    this.accountService.login(form).pipe().subscribe(data => {
      if (data == null) {
        alert("Sai tai khoan hay mat khau mat oi`")
      } else {
        localStorage.setItem("user",JSON.stringify(data))
        localStorage.setItem("token",JSON.stringify(data.token))
        this.router.navigate(['/user/home'])
      }
    })
  }
}
