import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Portfolio } from 'src/app/models/portfolio';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { UiServiceService } from 'src/app/servicios/ui-service.service';
import { ButtonComponent } from '../button/button.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() btnToggleLogin = new EventEmitter();
  miPortfolio: Portfolio = {
    name: '',
    profilePhoto: '',
    image: '',
    position: '',
    ubication: '',
    about: '',
    company: {company:'', img:'', position:'', mode:'', start:'', end:'', timeElapsed:'', ubication:''},
    school: {school:'', image:'', title:'', career:'', score:'', start:'', end:'',},
    experience: [],
    education: [],
    skills: [],
    projects: []
  };
  showLogin: boolean = false;
  subscription? : Subscription;

  constructor(private servPortfolio: PortfolioService, private uiService: UiServiceService, private authService: AuthService) {
    this.subscription = this.uiService.onToggleSession().subscribe( data =>
        this.showLogin = data
      );
   }

  ngOnInit(): void {
    this.servPortfolio.getPortfolioFull().subscribe(data =>{
      this.miPortfolio = data;      
    });
  }

  toggleLogin(){    
    this.uiService.toggleSession();
    this.authService.login();
    this.btnToggleLogin.emit();
  }

  togglePortfolio(){    
    this.uiService.togglePortfolio();
  }

  toggleExperience(){    
    this.uiService.toggleExperience();
  }

  getSession(): boolean{
    return this.authService.logIn;
  }

}
