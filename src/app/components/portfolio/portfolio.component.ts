import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/models/experience';
import { Portfolio } from 'src/app/models/portfolio';
import { Subscription } from 'rxjs';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { UiServiceService } from 'src/app/servicios/ui-service.service';

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

  constructor(private servPortfolio: PortfolioService, private uiService: UiServiceService) {
    this.subscription = this.uiService.onTogglePortfolio().subscribe( data =>
      this.showPortfolio = data
    );
   }

  ngOnInit(): void {
    this.servPortfolio.obtenerDatos().subscribe(data =>{
      this.miPortfolio = data;
      this.experienceList = data.experience;
      this.educationList = data.education;
      this.skillsList = data.skills;
      this.projectsList = data.projects;
      this.company = data.company;
      this.school = data.school;
    });   
    setTimeout(()=>{                         
      console.log(this.experienceList.length>0);
    }, 500);
  }

  toggleExperience(){
    this.uiService.onToggleExperience();
    console.log(this.showExperience);
  }

}
