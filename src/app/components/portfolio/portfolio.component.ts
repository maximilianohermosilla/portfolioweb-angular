import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/models/experience';
import { Portfolio } from 'src/app/models/portfolio';
import { Subscription } from 'rxjs';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { UiServiceService } from 'src/app/servicios/ui-service.service';
import { TokenService } from 'src/app/servicios/token.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  miPortfolio: any;
  company: any;
  school: any;
  experienceList: Experience[] = [];
  educationList: any;
  skillsList: any;
  projectsList: any;

  subscription? : Subscription;
  subscriptionPortfolio? : Subscription;
  subscriptionExperience? : Subscription;
  subscriptionEducation? : Subscription;
  subscriptionSkills? : Subscription;
  subscriptionProjects? : Subscription;

  showLogin: boolean = false;
  showPortfolio: boolean = true;
  showExperience: boolean = true; 
  showEducation: boolean = true; 
  showSkills: boolean = true; 
  showProjects: boolean = true; 

  editMode: boolean= false;
  color="";

  isLogged = false;

  constructor(private servPortfolio: PortfolioService, private uiService: UiServiceService, private tokenService: TokenService, private spinnerService: SpinnerService) {
    this.subscription = this.uiService.onTogglePortfolio().subscribe( data =>
      this.showPortfolio = data
    );
   }

  ngOnInit(): void {
    this.spinnerService.show();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }
    else{
      this.isLogged = false;
    }
    this.spinnerService.hide();
  }

  toggleExperience(){
    this.uiService.onToggleExperience();
  }

  toggleEditMode(){
    this.editMode = !this.editMode;
    this.editMode ?  this.color="#D4EFDF": this.color="green";
  }

  toggleLogin(){
    this.showLogin = !this.showLogin;
  }

}
