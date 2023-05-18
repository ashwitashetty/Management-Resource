import { Component, NgZone, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { timeLimit } from "../constants/enum";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  signupForm!: FormGroup;
  loginDetails: any = [];
  loginStatus: any;
  constructor(private router: Router, private ngZone: NgZone) {}
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
        if (localStorage.getItem("LoggedInStatus") === "true") {
          this.check();
        }
      }, 1000);
    });
  }
  reset() {
    this.lastAction(Date.now());
  }
  check() {
    this.loginStatus = localStorage.getItem("LoggedInStatus");
    const now = Date.now();
    const timeLeft = parseInt(this.getLastAction()) + timeLimit.TIME_LIMIT;
    const diff = timeLeft - now;
    const isTimeout = diff < 0;
    this.ngZone.run(() => {
      if (isTimeout && this.loginStatus) {
        localStorage.removeItem("lastAction");
        setTimeout(() => {
          localStorage.removeItem("EmployeeDetail");
        }, 1000);

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
  }
  onSubmit() {
    let userLoggedInExist;
    this.lastAction(Date.now());
    this.check();
    this.initListener();
    this.initInterval();
    if (
      (userLoggedInExist = this.loginDetails.find(
        (user) =>
          user.email == this.signupForm.value.email &&
          user.password == this.signupForm.value.password
      ))
    ) {
      if (userLoggedInExist !== null) {
        localStorage.setItem("LoggedInStatus", JSON.stringify(true));
        localStorage.setItem("ButtonStatus", JSON.stringify(true));
        this.router.navigate(["/employee"]);
      }
    } else if (
      (userLoggedInExist = this.loginDetails.find(
        (user) =>
          user.email === this.signupForm.value.email &&
          user.password !== this.signupForm.value.password
      ))
    ) {
    } else {
      this.loginDetails.push(this.signupForm.value);
      localStorage.setItem(
        "loginDetailsList",
        JSON.stringify(this.loginDetails)
      );
      localStorage.setItem("LoggedInStatus", JSON.stringify(true));
      localStorage.setItem("ButtonStatus", JSON.stringify(true));
      this.router.navigate(["/employee"]);
    }
  }
}
