import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/models/experience';
import { Portfolio } from 'src/app/models/portfolio';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

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


  editMode: boolean= false;
  color="";

  constructor(private servPortfolio: PortfolioService) { }

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
      console.log(this.experienceList);
    }, 500);
  }
}
