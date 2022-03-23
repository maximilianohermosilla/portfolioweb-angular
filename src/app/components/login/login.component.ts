import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() btnSubmit = new EventEmitter();
  form: FormGroup;
  

  constructor(private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      user: ['',[]],
      password: ['',[]]
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.btnSubmit.emit();    
  }

}
