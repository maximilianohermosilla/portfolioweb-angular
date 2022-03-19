import { Component, OnInit } from '@angular/core';
import { Education } from 'src/app/models/education';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['../../../styles.css']
})
export class EducacionComponent implements OnInit {
  educationList: any;

  constructor(private servPortfolio: PortfolioService) { }

  ngOnInit(): void {
    this.servPortfolio.obtenerDatos().subscribe(data =>{      
      this.educationList = data.education;
    });
  }

  onDelete(education: Education){
    console.log("Delete");
  }

  onUpdate(education: Education){
    console.log("Update");
  }
}
