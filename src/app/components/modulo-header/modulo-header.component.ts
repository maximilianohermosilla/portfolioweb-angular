import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { TokenService } from 'src/app/servicios/token.service';
import { UiServiceService } from 'src/app/servicios/ui-service.service';

@Component({
  selector: 'app-modulo-header',
  templateUrl: './modulo-header.component.html',
  styleUrls: ['./modulo-header.component.css']
})
export class ModuloHeaderComponent implements OnInit {
  @Output() btnToggleEditMode = new EventEmitter();
  @Input() title: string="";
  @Input() icon: string="";
  subscription?: Subscription;

  showLogin: boolean = false;
  showPortfolio: boolean = true;
  showExperience: boolean = true; 
  showEducation: boolean = true; 
  showSkills: boolean = true; 
  showProjects: boolean = true; 

  isAdmin: boolean = false;
  editMode: boolean= false;
  color: string ="";

  constructor(private servPortfolio: PortfolioService, private uiService: UiServiceService, private authService: AuthService, private tokenService: TokenService) {
    this.subscription = this.uiService.onToggleSession().subscribe( data =>
        this.showLogin = data
      );
  }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      //console.log("Get Token true");
      this.showLogin = true;
    }
    else{
      this.showLogin = false;
    }
    this.getPerfil();
  }

  toggleEditMode(){
    this.editMode=!this.editMode;
    this.editMode ?  this.color="#D4EFDF": this.color="green";
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

  onClick(){
    this.toggleEditMode();
    this.btnToggleEditMode.emit();
  }

  getSession(): boolean{
    //return this.authService.logIn;
    //return (this.tokenService.getToken() != null);
    return this.showLogin;
  }

}
