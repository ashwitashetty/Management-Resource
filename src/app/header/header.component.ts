import { Component, Input, OnInit } from "@angular/core";
import { Router, TitleStrategy } from "@angular/router";
import { LoginService } from "../service/login-service.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  loginFlag: any = false;
  constructor(public router: Router, public login: LoginService) {
    
  }

  ngOnInit(): void {
    // this.login.getIsLoggedIn().subscribe((data) => {
    //   this.loginFlag = data;
    //   console.log("login flag", this.loginFlag);
    // });
    // alert("alert1")
    this.ButtonStatus();
    // this.refresh();
    // this.loginFlag = this.login.signUpStatus;
  }
  handleLogin() {
    this.router.navigate(["login"]);
    // this.refresh();
  }
  handleLogout() {
    // this.loginFlag = true;
    // this.login.setIsLoggedIn(false);
    localStorage.setItem("LoggedInStatus", JSON.stringify(false));
    localStorage.setItem("ButtonStatus", JSON.stringify(true));
    this.loginFlag = false;
    this.router.navigate(["login"]);
  }
  ButtonStatus() {
    console.log('heyyyy')
    console.log('button status',localStorage.getItem("LoggedInStatus"));
    if (localStorage.getItem("LoggedInStatus") === "true") {
      this.loginFlag = true;
    } else {
      this.loginFlag = false;
    }
  }
  refresh() {
    window.location.reload()
  }

}
