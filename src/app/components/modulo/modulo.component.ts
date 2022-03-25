import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Experience } from 'src/app/models/experience';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { UiServiceService } from 'src/app/servicios/ui-service.service';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.css']
})
export class ModuloComponent implements OnInit {  
  @Output() btnToggleEdit = new EventEmitter();
  subscription?: Subscription;

  showLogin: boolean = false;
  showEditMode: boolean = false;
  showPortfolio: boolean = true;
  showExperience: boolean = true; 
  showEducation: boolean = true; 
  showSkills: boolean = true; 
  showProjects: boolean = true; 

  editMode: boolean= false;
  color: string ="";

  constructor(private servPortfolio: PortfolioService, private uiService: UiServiceService) {
    this.subscription = this.uiService.onToggleSession().subscribe( data =>
        this.showLogin = data
      );
    this.subscription = this.uiService.onTogglePortfolio().subscribe( data =>
        this.showPortfolio = data
      );
    this.subscription = this.uiService.onToggleExperience().subscribe( data =>
        this.showExperience = data
      );
    this.subscription = this.uiService.onToggleEducation().subscribe( data =>
        this.showEducation = data
      );
    this.subscription = this.uiService.onToggleSkills().subscribe( data =>
        this.showSkills = data
      );
    this.subscription = this.uiService.onToggleProjects().subscribe( data =>
        this.showProjects = data
      );
  }

  ngOnInit(): void {
  }

  toggleEditMode(){
    this.editMode=!this.editMode;
    this.editMode ?  this.color="#D4EFDF": this.color="green";
    this.btnToggleEdit.emit();
  }

  toggleEditExperience(){
    this.uiService.toggleEditExperience();
  }
  toggleEditEducation(){
    this.uiService.toggleEditEducation();
  }
  toggleEditSkills(){
    this.uiService.toggleEditSkills();
  }
  toggleEditProjects(){
    this.uiService.toggleEditProjects();
  }

  getEditMode(){
    return this.editMode;
  }

  getEditExperience(){
    return this.uiService.getEditExperience;
  }

  getEditEducation(){
    return this.uiService.getEditEducation;
  }

  getEditSkills(){
    return this.uiService.getEditSkills;
  }

  getEditProjects(){
    return this.uiService.getEditProjects;
  }

  
  

}
