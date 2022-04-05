import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { UiServiceService } from './ui-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = 'http://localhost:8080/auth/login';
  token;
  isLogin: boolean = false;
  currentUserSubject: BehaviorSubject<any>;

  constructor(private httpClient: HttpClient, private router: Router, private uiService: UiServiceService) { 
    console.log("Servicio autenticacion corriendo");
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
  }

  iniciarSesion(credenciales: any): Observable<any>{
    console.log(credenciales);
    return this.httpClient.post<any>(this.api, credenciales).pipe(map(data=>{
        console.log(data);
        this.uiService.toggleSession();
        localStorage.setItem('curentUser', JSON.stringify(data));
        this.currentUserSubject.next(data);

        return data;
      }))
  }

  get UsuarioAutenticado(){
    return this.currentUserSubject.value;
  }






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
