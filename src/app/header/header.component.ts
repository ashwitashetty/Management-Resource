import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../service/login-service.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  loginFlag: any = false;
  constructor(public router: Router, public login: LoginService) {}

  ngOnInit(): void {
    this.ButtonStatus();
  }
  handleLogin() {
    this.router.navigate(["login"]);
  }
  handleLogout() {
    localStorage.setItem("LoggedInStatus", JSON.stringify(false));
    localStorage.removeItem("EmployeeDetail");
    this.loginFlag = false;
    this.router.navigate(["login"]);
  }
  ButtonStatus() {
    if (localStorage.getItem("LoggedInStatus") === "true") {
      this.loginFlag = true;
    } else {
      this.loginFlag = false;
    }
  }

}
