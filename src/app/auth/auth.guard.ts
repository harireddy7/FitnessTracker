import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.authService.isAuth()) {
        console.log('guard activated - passed!');
        return true;
      } else {
        console.log('guard activated - failed!');
        this.router.navigate(['/login']);
      }
  }

  canLoad(route: Route) {
    if (this.authService.isAuth()) {
      console.log('guard activated - passed!');
      return true;
    } else {
      console.log('guard activated - failed!');
      this.router.navigate(['/login']);
    }
  }
}
