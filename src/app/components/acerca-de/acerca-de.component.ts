import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Portfolio } from 'src/app/models/portfolio';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { UiServiceService } from 'src/app/servicios/ui-service.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  formGroup: FormGroup;
  miPortfolio: Portfolio = this.clearPortfolio();
  showLogin: boolean= false;
  editMode: boolean= false;
  subscription? : Subscription;
  color="";

  base64: string = 'Base64...";'
  fileSelected?: Blob;
  imageUrl?: string;

  constructor(private servPortfolio: PortfolioService, private formBuilder: FormBuilder, private uiService: UiServiceService, private authService: AuthService, private sant: DomSanitizer) {
    this.subscription = this.uiService.onToggleSession().subscribe( data =>
        this.showLogin = data
      );      
    this.formGroup = this.formBuilder.group({
      name : ['',[]],
      position : ['',[]],
      ubication : ['',[]],
      about : ['',[]],
      profilePhoto : ['',[]]       
    })
   }

  ngOnInit(): void {
    this.getPortfolio();
  }

  getPortfolio(){
    this.servPortfolio.getPortfolio().subscribe(data =>{
      this.miPortfolio = data[0];
    });
  }

  clearPortfolio(): Portfolio{
    const portfolio: Portfolio = {
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
    return portfolio;
  }

  onUpdate(portfolio: Portfolio){
    this.servPortfolio.updatePortfolio(portfolio).subscribe();   
    this.miPortfolio = portfolio;
    
  }

  toggleEditMode(){
    this.editMode=!this.editMode;
    this.editMode ?  this.color="#D4EFDF": this.color="green";
    //this.btnToggleEdit.emit();
  }

  getSession(): boolean{
    return this.authService.logIn;
  }

  onSelectNewFile(event: Event): void{
    const target= event.target as HTMLInputElement;
    this.fileSelected = (target.files as FileList)[0];
    this.imageUrl= this.sant.bypassSecurityTrustUrl( window.URL.createObjectURL(this.fileSelected)) as string;    
    this.base64="Base64...";
    this.convertFileToBase64();
    
  }  

  convertFileToBase64(): void{
    let reader= new FileReader();
    reader.readAsDataURL(this.fileSelected as Blob);
    reader.onloadend=()=>{
      this.base64=reader.result as string;
    }
    //console.log("Imagen: ", this.imageUrl);
    setTimeout(()=>{                         
      this.miPortfolio.profilePhoto=this.base64;
    }, 500);    
  }

  
}
