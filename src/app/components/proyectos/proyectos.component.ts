import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['../../../styles.css']
})
export class ProyectosComponent implements OnInit {
  projectsList: any;

  constructor(private servPortfolio: PortfolioService) { }

  ngOnInit(): void {
    this.servPortfolio.obtenerDatos().subscribe(data =>{
      //console.log(data.education);
      this.projectsList = data.projects;
    });
  }

  onDelete(projects: Project){
    console.log("Delete");
  }

  onUpdate(projects: Project){
    console.log("Update");
  }
}
