import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  loginFlag: any = false;
  constructor(public router: Router, public login: LoginService) {}

  ngOnInit(): void {
    this.login.getIsLoggedIn().subscribe((data) => {
      this.loginFlag = data;
      console.log('clicked', this.loginFlag);
    });
  }
  handleLogin() {
    this.router.navigate(['login']);
    // console.log('clicked',this.login.isLoggedIn);
  }
}
