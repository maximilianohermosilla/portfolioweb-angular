import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Portfolio } from 'src/app/models/portfolio';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  formGroup: FormGroup;

  miPortfolio: Portfolio = {
    name: '',
    profilePhoto: '',
    image: '',
    position: '',
    ubication: '',
    about: '',
    company: {name:'', img:'', url:''},
    school: {name:'', img:'', url:''},
    experience: [],
    education: [],
    skills: [],
    projects: []
  };
  editMode: boolean= false;
  color="";

  constructor(private servPortfolio: PortfolioService, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      name : ['',[]],
      position : ['',[]],
      ubication : ['',[]],
      about : ['',[]]      
    })
   }

  ngOnInit(): void {
    this.getPortfolio();
  }

  getPortfolio(){
    this.servPortfolio.obtenerDatos().subscribe(data =>{
      this.miPortfolio = data;
    });
  }

  onUpdate(portfolio: Portfolio){
    this.servPortfolio.updatePortfolio(portfolio).subscribe();   
    this.miPortfolio = portfolio;
    
  }

  toggleEdit(portfolio: Portfolio){
    this.editMode=!this.editMode;
    this.editMode ?  this.color="#D4EFDF": this.color="green";
  }

  
}
