import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  public isLoggedIn: BehaviorSubject<any> = new BehaviorSubject<boolean>(false);

  setIsLoggedIn(data: boolean) {
    this.isLoggedIn.next(data);
  }
  getIsLoggedIn() {
    return this.isLoggedIn.asObservable();
  }
  signUpStatus:boolean=false;
  constructor() {}
}
