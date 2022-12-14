import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../service/account.service";
import {Router} from "@angular/router";
import {FacebookLoginProvider, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {TokenDto} from "../model/token-dto";
import Swal from "sweetalert2";

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
  message: string = "";
  socialUser: SocialUser;

  constructor(private accountService: AccountService,
              private router: Router,
              private socialService: SocialAuthService) {
    // this.logOutFB();
    if (localStorage.getItem("user") !== null) {
      this.router.navigate(["/user/wallet"])
    }
  }

  ngOnInit(): void {
    this.socialService.authState.subscribe((user) => {
      this.socialUser = user;
      console.log(user);
    });
  }

  get username() {
    return this.loginForm.get("username")
  }

  get password() {
    return this.loginForm.get("password")
  }

  loginWithFB() {
    this.socialService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {
        console.log(data);
        this.socialUser = data;
        const tokenFace = new TokenDto(this.socialUser.authToken);
        this.accountService.facebook(tokenFace).subscribe(data => {
          localStorage.setItem("user", JSON.stringify(data))
          localStorage.setItem("token", JSON.stringify(data.token));
          location.reload();
        })
      }
    )
  }

  login() {
    const form = this.loginForm.value;
    this.accountService.login(form).subscribe(data => {
      if (data == null) {
        Swal.fire("Warning","Wrong user or password !","warning");
      } else {
        localStorage.setItem("user", JSON.stringify(data))
        localStorage.setItem("token", JSON.stringify(data.token));
        Swal.fire("Success","Welcome to our website","success");
        location.reload();
      }
    })
  }

  logOutFB(): void {
    this.socialService.signOut().then(
      data => {
        console.log("logouthanhcong")
      }
    );
  }
}
