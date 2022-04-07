import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private authService: AuthService, private route: Router, private tokenService: TokenService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let currentUser = this.authService.UsuarioAutenticado;
    if (this.tokenService.getToken() != null){
      return true;
    }
    else{
      return false;
    }
    
    /*if (currentUser && currentUser.accessToken){
      return true;
    }
    else{
      this.route.navigate(['/login']);
      return false;
    }*/


  }
  
}
