import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['../../../styles.css']
})
export class ProyectosComponent implements OnInit {
  formGroup: FormGroup;
  projectsList: any;
  projectItem: Project = this.clearProject();
  newProject: boolean = false;
  editMode: boolean = false;
  color: string = "";

  constructor(private servPortfolio: PortfolioService, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      name: ['',[]],
      start: ['',[]],
      description: ['',[]],
      url: ['',[]],
      img: ['',[]],
    })
   }

  ngOnInit(): void {
    this.servPortfolio.obtenerDatos().subscribe(data =>{
      //console.log(data.education);
      this.projectsList = data.projects;
    });
  }

  toggleEditMode(){
    this.editMode = !this.editMode;
    this.editMode ?  this.color="#D4EFDF": this.color="green";
  }

  clearProject(): Project{
    this.projectItem = {
      name: '',
      start: '',
      description: '',
      url: '',
      img: ''
    }
    this.newProject = true;
    return this.projectItem;
  }

  setProject(project: Project){ 
    this.projectItem={
      name: project.name,
      start: project.start,
      description: project.description,
      url: project.url,
      img: project.img
    }  
    this.newProject = false;    
  }
  
  onDelete(project: Project){
    console.log("Delete");
  }

  onUpdate(project: Project){
    console.log("Update");
  }

  onSubmit(project: Project){

  }


}
