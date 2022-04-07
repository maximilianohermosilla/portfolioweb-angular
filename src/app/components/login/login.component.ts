import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() btnSubmit = new EventEmitter();
  form: FormGroup;
  loginUsuario: LoginUsuario = {
    user: '',
    password: ''
  };

  isLogged: boolean = false;
  isLoginFail = false;
  //user: string = "";
  //password: string = "";
  perfiles: string[] = [];
  errMsj: string = "";

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: Router, private tokenService: TokenService) { 
    this.form = this.formBuilder.group({
      user: ['',[Validators.required, Validators.minLength(2)]],
      password: ['',[Validators.required, Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.perfiles = this.tokenService.getAuthorities();
    }
  }

  onSubmit(){
    this.btnSubmit.emit();    
  }

  get User(){
    return this.form.get('user');
  }

  get Password(){
    return this.form.get('password');
  }

  onLogin(event: Event){
    event.preventDefault;
    this.authService.iniciarSesion(this.form.value).subscribe(data=>{
      //console.log("Data: " + JSON.stringify(data));
      this.isLogged = true;
      this.isLoginFail = false;
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.user);
      this.tokenService.setAuthorities(data.authorities);
      this.perfiles = data.authorities;
      this.route.navigate(['/portfolio']);
    },
    error => {
      this.isLoginFail = true;
      this.isLogged = false;     
      this.errMsj = error;
      console.log("error: ", this.errMsj);
    }
    )
  }

  loginUser(){    
    this.loginUsuario = { "user": 'user', "password": 'user' };
    console.log(this.form.value);
    console.log(this.loginUsuario);

    this.authService.iniciarSesion(this.loginUsuario).subscribe(data=>{
      //console.log("Data: " + JSON.stringify(data));
      this.isLogged = true;
      this.isLoginFail = false;
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.user);
      this.tokenService.setAuthorities(data.authorities);
      this.perfiles = data.authorities;
      this.route.navigate(['/portfolio']);
    },
    error => {
      this.isLoginFail = true;
      this.isLogged = false;     
      this.errMsj = error;
      console.log("error: ", this.errMsj);
    }
    )
  }

}
