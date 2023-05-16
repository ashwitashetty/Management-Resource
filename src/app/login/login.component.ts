import { Component, NgZone, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "../service/login-service.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  signupForm!: FormGroup;
  loginDetails: any = [];
  loginStatus: any;
  constructor(
    private router: Router,
    private login: LoginService,
    private ngZone: NgZone
  ) {}
  getLastAction() {
    return localStorage.getItem("lastAction");
  }
  lastAction(value) {
    localStorage.setItem("lastAction", JSON.stringify(value));
  }
  initListener() {
    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener("click", () => this.reset());
    });
  }
  initInterval() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        if (localStorage.getItem("LoggedInStatus") === 'true') {
          this.check();
        }
        // this.check();
      }, 1000);
    });
  }
  reset() {
    this.lastAction(Date.now());
  }
  check() {
    // this.loginStatus = this.login.getIsLoggedIn();
    this.loginStatus = localStorage.getItem("LoggedInStatus");
    const now = Date.now();
    const timeLeft = parseInt(this.getLastAction()) + 10 * 50 * 10;
    const diff = timeLeft - now;
    const isTimeout = diff < 0;
    //this.isLoggedIn.subscribe(event => this.isLogin = event);
    console.log("diff", diff);
    this.ngZone.run(() => {
      if (isTimeout && this.loginStatus) {
        localStorage.removeItem("lastAction");
        setTimeout(() => {
          alert("Session Expired,Please Login again");
        }, 1000);

        // this.login.setIsLoggedIn(false);
        localStorage.setItem("LoggedInStatus", JSON.stringify(false));
        this.router.navigate(["login"]);
      }
    });
  }
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        ),
      ]),
    });
    const usersData = localStorage.getItem("loginDetailsList");
    if (usersData != null) {
      this.loginDetails = JSON.parse(usersData);
    }
    // this.lastAction(Date.now());
    // this.check();
    // this.initListener();
    // this.initInterval();
  }
  onSubmit() {
    console.log("siggh", this.login.signUpStatus);
    // console.log("In login after submit", this.login.isLoggedIn);
    console.log("Form clicked");
    console.log(this.signupForm.value);
    let userLoggedInExist;
    if (
      (userLoggedInExist = this.loginDetails.find(
        (user) =>
          user.email == this.signupForm.value.email &&
          user.password == this.signupForm.value.password
      ))
    ) {
      console.log("first", userLoggedInExist);

      if (userLoggedInExist !== null) {
        localStorage.setItem("LoggedInStatus", JSON.stringify(true));
        // this.login.signUpStatus = true;
        localStorage.setItem(
          "ButtonStatus",
          JSON.stringify(true)
        );
        this.router.navigate(["/employee"]);
        // console.log('Logged In');
      }
    } else if (
      (userLoggedInExist = this.loginDetails.find(
        (user) =>
          user.email === this.signupForm.value.email &&
          user.password !== this.signupForm.value.password
      ))
    ) {
      alert("please enter valid password");
    } else {
      this.loginDetails.push(this.signupForm.value);
      console.log("array of users", this.loginDetails);
      localStorage.setItem(
        "loginDetailsList",
        JSON.stringify(this.loginDetails)
      );
      localStorage.setItem("LoggedInStatus", JSON.stringify(true));
      // this.login.signUpStatus = true;
      localStorage.setItem(
        "ButtonStatus",
        JSON.stringify(true)
      );
      this.router.navigate(["/employee"]);
    }
  }
}
