import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Portfolio } from 'src/app/models/portfolio';
import { Experience } from 'src/app/models/experience';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { UiServiceService } from 'src/app/servicios/ui-service.service';
import { LoginComponent } from '../login/login.component';
import { Education } from 'src/app/models/education';
import { TokenService } from 'src/app/servicios/token.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  formGroup: FormGroup;
  formContact: FormGroup;

  miPortfolio: Portfolio = this.clearPortfolio();
  experienceList: Experience[] = [];
  educationList: Education[] = [];
  showLogin: boolean= false;
  editMode: boolean= false;
  subscription? : Subscription;
  color="";
  
  miSchool: Education = this.emptyEducation();
  miCompany: Experience = this.emptyExperience();
  
  base64: string = 'Base64...";'
  fileSelected?: Blob;
  imageUrl?: string;
  sizeImage: boolean = false;
  isAdmin: boolean = false;

  constructor(private servPortfolio: PortfolioService,
             private formBuilder: FormBuilder, 
             private uiService: UiServiceService, 
             private authService: AuthService, 
             private sant: DomSanitizer, 
             private tokenService: TokenService, 
             private spinnerService: SpinnerService) {
    this.subscription = this.uiService.onToggleSession().subscribe( data =>
        this.showLogin = data
      );       
    
    this.formGroup = this.formBuilder.group({
      name : ['',[Validators.required]],
      position : ['',[]],
      ubication : ['',[]],
      image : ['',[]],
      profilePhoto : ['',[]]       
    })  

    this.formContact = this.formBuilder.group({
      email : ['',[]],
      facebook : ['',[]],
      linkedin : ['',[]],
      instagram : ['',[]],    
      youtube : ['',[]],  
      github : ['',[]]     
    })
 }

  ngOnInit(): void {     
    //this.spinnerService.show();   
    this.getPerfil();
    this.getPortfolio();   
    
  }

  getPortfolio(){
    this.servPortfolio.getPortfolioFull().subscribe(data =>{
      this.miPortfolio = data;
      //console.log(this.miPortfolio);
      this.miSchool = data.school;
      this.miCompany = data.company;
      this.experienceList = [];
      this.educationList = [];
      data.experience.forEach(element => {
        const exp: Experience = element;
        this.experienceList.push(exp);
      });
      data.education.forEach(element => {
        const edu: Education = element;
        this.educationList.push(edu);
        //this.spinnerService.hide();     
    
      });
    }); 
    
  }

  setPortfolio(){
    this.formGroup.controls['name'].setValue(this.miPortfolio.name);
    this.formGroup.controls['position'].setValue(this.miPortfolio.position);
    this.formGroup.controls['ubication'].setValue(this.miPortfolio.ubication);
    this.base64 = this.miPortfolio.profilePhoto;
  }

  setPortfolioContact(){
    this.formContact.controls['email'].setValue(this.miPortfolio.email);
    this.formContact.controls['facebook'].setValue(this.miPortfolio.facebook);
    this.formContact.controls['linkedin'].setValue(this.miPortfolio.linkedin);
    this.formContact.controls['instagram'].setValue(this.miPortfolio.instagram); 
    this.formContact.controls['youtube'].setValue(this.miPortfolio.youtube); 
    this.formContact.controls['github'].setValue(this.miPortfolio.github); 
  }

  clearPortfolio(): Portfolio{
    const portfolio: Portfolio = {
      name: '',
      profilePhoto: '',
      image: '',
      position: '',
      ubication: '',
      about: '',
      company: {company:'', img:'', position:'', mode:'', start:'', end:'', timeElapsed:'', ubication:''},
      school: {school:'', image:'', title:'', career:'', score:'', start:'', end:'',},
      email: '',
      facebook: '',
      linkedin: '',
      instagram: '',
      youtube: '',
      github: '',
      experience: [],
      education: [],
      skills: [],
      projects: []
    };
    return portfolio;
  }

  onUpdate(portfolio: Portfolio){    
    portfolio.name=this.formGroup.value.name;
    portfolio.position=this.formGroup.value.position;
    portfolio.ubication=this.formGroup.value.ubication;

    if(this.base64!=''){portfolio.profilePhoto=this.base64;}    
    this.servPortfolio.updatePortfolio(portfolio).subscribe(result=>{this.ngOnInit();});  
    this.getPortfolio();
    this.base64="";    
  }

  onUpdateBanner(portfolio: Portfolio){   
    if(this.base64!=''){portfolio.image=this.base64;}    
    this.servPortfolio.updatePortfolio(portfolio).subscribe(result=>{this.ngOnInit();});  
    this.getPortfolio();
    this.base64="";    
  }

  onUpdateContact(portfolio: Portfolio){ 
    portfolio.email=this.formContact.value.email;
    portfolio.facebook=this.formContact.value.facebook;
    portfolio.linkedin=this.formContact.value.linkedin;
    portfolio.instagram=this.formContact.value.instagram;
    portfolio.youtube=this.formContact.value.youtube;
    portfolio.github=this.formContact.value.github;

    this.servPortfolio.updatePortfolio(portfolio).subscribe(result=>{this.ngOnInit();});  
    this.getPortfolio();
  }

  toggleEditMode(){
    this.editMode=!this.editMode;
    this.editMode ?  this.color="#D4EFDF": this.color="green";
    //this.btnToggleEdit.emit();
  }

  toggleAbout(){
    this.uiService.toggleAbout();
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

  onSelectNewFile(event: Event): void{
    const target= event.target as HTMLInputElement;
    this.fileSelected = (target.files as FileList)[0];
    this.imageUrl= this.sant.bypassSecurityTrustUrl( window.URL.createObjectURL(this.fileSelected)) as string;    
    this.base64="";
    this.convertFileToBase64();
    
  }  

  convertFileToBase64(): void{
    let reader= new FileReader();
    reader.readAsDataURL(this.fileSelected as Blob);
    reader.onloadend=()=>{
      this.base64=reader.result as string;
    }
    setTimeout(()=>{       
      this.bigImage();   
    }, 500);    
  }

  bigImage(){
    this.sizeImage = (this.base64.length > 50000);
    //console.log("Imagen base64 length: ", this.base64.length);
  }

  clearImage(educationImg: string){
    this.base64=educationImg;
    this.bigImage();
  }  

  emptyEducation(): Education{
    let education: Education = {    school: '',    title: '',    image: '',    career: '',    score: '',    start: '',    end: ''  };
    return education;
  }

  emptyExperience(): Experience{
    let experience: Experience = {    position: '',    company: '',    img: '',    mode: '',    start: '',    end: '',    timeElapsed: '',    ubication: ''  };
    return experience;
  }

  updateCompanySchool(portfolio: Portfolio, education: Education, experience: Experience){ 
    if (education.school = ""){
      //console.log("school empty");
      //portfolio.school = this.emptyEducation();
    }

    if (experience.company = ""){
      //console.log("company empty");
      //portfolio.school = this.emptyEducation();
    }
    this.miPortfolio.company = experience;
    this.miPortfolio.school = education;
    
    
    this.servPortfolio.updatePortfolio(portfolio).subscribe(result=>{
      this.ngOnInit();
      this.miCompany=experience;
      this.miSchool=education;      
      this.toggleEditMode();
    });  
    this.getPortfolio();
  }

  
}
