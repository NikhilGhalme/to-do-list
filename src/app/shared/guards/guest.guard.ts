import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class GuestGuard  {
  constructor(private router: Router, private authService: AuthService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(route.routeConfig?.path);
    if(this.authService.isLoggedIn() && route.routeConfig?.path === 'auth'){
          this.router.navigate(["/task/details"]);
            return false;
    }else if (!this.authService.isLoggedIn() && route.routeConfig?.path !== 'auth'){
      this.router.navigate(["auth/login"]);
    }else {
      return true;
    }
    return false;

  }
  
}
