import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signupForm!: FormGroup;
  loginDetails: any = [];
  constructor(private router: Router, private login: LoginService) {}
  ngOnInit(): void {
    console.log('In login after submit', this.login.isLoggedIn);

    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        ),
      ]),
    });
    const usersData = localStorage.getItem('loginDetailsList');
    if (usersData != null) {
      this.loginDetails = JSON.parse(usersData);
    }
  }
  onSubmit() {
    this.login.setIsLoggedIn(true);
    console.log('In login after submit', this.login.isLoggedIn);
    console.log('Form clicked');
    console.log(this.signupForm.value);
    let userLoggedInExist;
    if (
      (userLoggedInExist = this.loginDetails.find(
        (user) =>
          user.email == this.signupForm.value.email &&
          user.password == this.signupForm.value.password
      ))
    ) {
      if (userLoggedInExist !== null) {
        console.log('first', userLoggedInExist);
        this.router.navigate(['/employee']);
        // console.log('Logged In');
      }
    } else if (
      (userLoggedInExist = this.loginDetails.find(
        (user) =>
          user.email === this.signupForm.value.email &&
          user.password !== this.signupForm.value.password
      ))
    ) {
      console.log('please enter valid password');
    } else {
      this.loginDetails.push(this.signupForm.value);
      console.log('array of users', this.loginDetails);
      localStorage.setItem(
        'loginDetailsList',
        JSON.stringify(this.loginDetails)
      );
      this.router.navigate(['/employee']);
     
    }
  }
}
