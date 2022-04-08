import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Portfolio } from 'src/app/models/portfolio';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['../../../styles.css']
})
export class AboutComponent implements OnInit {  
  @Input() editMode: boolean = false;
  formGroup: FormGroup;

  miPortfolio: Portfolio = this.clearPortfolio();
  showLogin: boolean= false;
  isAdmin: boolean = false;
  subscription? : Subscription;
  color="";

  constructor(private tokenService: TokenService, private servPortfolio: PortfolioService, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      about : ['',[]]     
    })
   }

  ngOnInit(): void {
    this.getPortfolio();
  }

  getPortfolio(){
    this.servPortfolio.getPortfolioFull().subscribe(data =>{
      this.miPortfolio = data;      
    });
    
  }

  setPortfolio(){
    this.formGroup.controls['about'].setValue(this.miPortfolio.about); 
  }

  clearPortfolio(): Portfolio{
    const portfolio: Portfolio = {
      name: '',
      profilePhoto: '',
      image: '',
      position: '',
      ubication: '',
      about: '',
      email: '',
      facebook: '',
      linkedin: '',
      instagram: '',
      youtube: '',
      github: '',
      company: {company:'', img:'', position:'', mode:'', start:'', end:'', timeElapsed:'', ubication:''},
      school: {school:'', image:'', title:'', career:'', score:'', start:'', end:'',},
      experience: [],
      education: [],
      skills: [],
      projects: []
    };
    return portfolio;
  }

  onUpdate(portfolio: Portfolio){  
    portfolio.about=this.formGroup.value.about; 
    this.servPortfolio.updatePortfolio(portfolio).subscribe(result=>{this.ngOnInit();});  
    this.getPortfolio();
  }

  toggleEditMode(){
    this.editMode=!this.editMode;
    this.editMode ?  this.color="#D4EFDF": this.color="green";
    //this.btnToggleEdit.emit();
  }

  getSession(): boolean{
    return (this.tokenService.getToken() != null);
  }

  getPerfil(){
    const perfiles = this.tokenService.getAuthorities();
    this.isAdmin = false;
    perfiles.forEach(perfil => {
      if (perfil === 'PERFIL_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

}
