import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() btnSubmit = new EventEmitter();
  form: FormGroup;
  

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: Router) { 
    this.form = this.formBuilder.group({
      user: ['',[Validators.required, Validators.minLength(2)]],
      password: ['',[Validators.required, Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
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
      console.log("Data: " + JSON.stringify(data));
      this.route.navigate(['/portfolio']);
    })
  }

}
