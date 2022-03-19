import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/models/experience';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['../../../styles.css']
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

  onDelete(experience: Experience){
    console.log("Delete");
  }

  onUpdate(experience: Experience){
    console.log("Update");
  }
}
