import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { JwtDTO } from '../models/jwt-dto';
import { LoginUsuario } from '../models/login-usuario';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { SpinnerService } from './spinner.service';
import { UiServiceService } from './ui-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //apiHeroku = 'http://localhost:8080/auth/';
  apiHeroku = 'https://limitless-gorge-37634.herokuapp.com/auth/';

  token;
  isLogin: boolean = false;
  currentUserSubject: BehaviorSubject<any>;

  constructor(private httpClient: HttpClient, private router: Router, private uiService: UiServiceService, private spinnerService: SpinnerService) { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
  }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any>{
    return this.httpClient.post<any>(this.apiHeroku + 'nuevo', nuevoUsuario);
  }

  iniciarSesion(credenciales: LoginUsuario): Observable<JwtDTO>{
    //console.log(credenciales);
    this.spinnerService.show();
    return this.httpClient.post<any>(this.apiHeroku + 'login', credenciales).pipe(map(data=>{        
        //console.log(data);
        this.uiService.toggleSession();
        sessionStorage.setItem('curentUser', JSON.stringify(data));
        this.currentUserSubject.next(data);
        this.spinnerService.hide();
        return data;
      }))
  }

  get UsuarioAutenticado(){
    //console.log("Usuario aut: ", this.currentUserSubject.value);
    //console.log(this.currentUserSubject);
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
