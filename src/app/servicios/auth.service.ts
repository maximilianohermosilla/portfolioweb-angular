import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = 'https://localhost:3000/api';
  token;
  isLogin: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router) { }

  _login(user: string, password: string){
    /*this.httpClient.post(this.api + '/authenticate', {user: user, password: password}).subscribe((resp: any)=>{
      this.router.navigate(['portfolio']);
      localStorage.setItem('auth_token', resp.token);
    })*/
    this.isLogin = true;
  }

  login(){
    /*this.httpClient.post(this.api + '/authenticate', {user: user, password: password}).subscribe((resp: any)=>{
      this.router.navigate(['portfolio']);
      localStorage.setItem('auth_token', resp.token);
    })*/
    this.isLogin = true;
  }

  logout(){
    //localStorage.removeItem('token');
    this.isLogin = false;

  }

  public get logIn(): boolean {
    //return (localStorage.getItem('token') !== null);
    return this.isLogin;
  }
}
