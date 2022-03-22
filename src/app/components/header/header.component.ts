import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Portfolio } from 'src/app/models/portfolio';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { UiServiceService } from 'src/app/servicios/ui-service.service';
import { ButtonComponent } from '../button/button.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
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
  showLogin: boolean = false;
  subscription? : Subscription;

  constructor(private servPortfolio: PortfolioService, private uiService: UiServiceService) {
    this.subscription = this.uiService.onToggleSession().subscribe( data =>
        this.showLogin = data   
      );
   }

  ngOnInit(): void {
    this.servPortfolio.obtenerDatos().subscribe(data =>{
      this.miPortfolio = data;      
    });
  }

  startLogin(){
    console.log("button click!");
  }

  toggleLogin(){
    this.uiService.toggleSession();
  }

}
