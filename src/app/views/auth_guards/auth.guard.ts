import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem('userToken') != null){
        // logged in so return true
    return true;
     }
     // not logged in so redirect to login page with the return url
   this.router.navigate(['/login']);
   return false;

   
  }
  
}
//The auth guard is an angular route guard that's used to prevent unauthenticated users from accessing restricted routes, 
//it does this by implementing the CanActivate interface which allows the guard to decide if a route can be activated with the canActivate() method.
// If the method returns true the route is activated (allowed to proceed),
// otherwise if the method returns false the route is blocked.
