import { Component, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/models/portfolio';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  miPortfolio: any;

  constructor(private servPortfolio: PortfolioService) { }

  ngOnInit(): void {
    this.servPortfolio.obtenerDatos().subscribe(data =>{
      this.miPortfolio = data;
    });
  }

  onUpdate(portfolio: Portfolio){
    console.log("Editando datos "+portfolio.id);
    return this.servPortfolio.updatePortfolio(portfolio);
    
  }

  
}
