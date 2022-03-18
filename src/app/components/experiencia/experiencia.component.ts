import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  experienceList: any;

  constructor(private servPortfolio: PortfolioService) { }

  ngOnInit(): void {
    this.servPortfolio.obtenerDatos().subscribe(data =>{
      //console.log(data.education);
      this.experienceList = data.experience;
    });
  }
}
