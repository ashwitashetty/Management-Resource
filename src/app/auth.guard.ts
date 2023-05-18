import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LoginService } from "./service/login-service.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  isLoginAuth: string = "";
  constructor(private login: LoginService, private router: Router) {}

  canActivate(): any {
    if (localStorage.getItem("LoggedInStatus") === "true") {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
