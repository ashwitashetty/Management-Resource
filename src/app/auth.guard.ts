import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './service/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoginAuth:string=''
  constructor(private login:LoginService,private router:Router){
  console.log("in auth",this.login.getIsLoggedIn())
  }

   

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.login.getIsLoggedIn().subscribe((data)=>{
        this.isLoginAuth=data
       })
       if(this.isLoginAuth){
        return true
       }
    else{
      this.router.navigate(['/login'])
      return false
    }
  }
  
}
// if (this.login.getIsLoggedIn()) {
//   return true;
// } else {
//   this.router.navigateByUrl('/');
//   return false;
// }
