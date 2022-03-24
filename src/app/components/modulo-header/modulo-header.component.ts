import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
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

  editMode: boolean= false;
  color: string ="";

  constructor(private servPortfolio: PortfolioService, private uiService: UiServiceService) {
    this.subscription = this.uiService.onToggleSession().subscribe( data =>
        this.showLogin = data
      );
  }

  ngOnInit(): void {
  }

  toggleEditMode(){
    this.editMode=!this.editMode;
    this.editMode ?  this.color="#D4EFDF": this.color="green";
  }

  onClick(){
    this.toggleEditMode();
    this.btnToggleEditMode.emit();
  }

}
