import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Project } from 'src/app/models/project';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['../../../styles.css']
})
export class ProyectosComponent implements OnInit {
  @Input() editMode: boolean = false;
  @Output() onUpdateProject: EventEmitter<Project> = new EventEmitter();
  @Output() onInsertProject: EventEmitter<Project> = new EventEmitter();
  @Output() onDeleteProject: EventEmitter<Project> = new EventEmitter();


  formGroup: FormGroup;
  projectsList: any;
  projectItem: Project = this.clearProject();
  newProject: boolean = false;
  editModes: boolean = false;
  color: string = "";

  base64: string = 'Base64...";'
  fileSelected?: Blob;
  imageUrl?: string;

  constructor(private servPortfolio: PortfolioService, private formBuilder: FormBuilder, private sant: DomSanitizer) {    
    this.formGroup = this.formBuilder.group({
      name: ['',[]],
      start: ['',[]],
      description: ['',[]],
      url: ['',[]],
      img: ['',[]],
    })
   }

  ngOnInit(): void {
    this.servPortfolio.getProjects().subscribe(data =>{
      this.projectsList = data;
    });
  }

  toggleEditMode(){
    this.editMode = !this.editMode;
    this.editMode ?  this.color="#D4EFDF": this.color="green";
  }

  clearProject(): Project{
    this.projectItem = {
      id: 0,
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
      id: project.id,
      name: project.name,
      start: project.start,
      description: project.description,
      url: project.url,
      img: project.img
    }
    this.newProject = false;    
  }

  onUpdate(project: Project){
    this.servPortfolio.updateProject(project).subscribe();  
    this.projectsList = this.projectsList;
    this.ngOnInit();     
    //this.onUpdateExperience.emit(experience);
  }
  
  onInsert(project: Project){
    this.setProject(project);
    project.id=0;
    
    //this.onInsertExperience.emit(experience);
    this.servPortfolio.insertProject(project).subscribe((educacion)=>(
      this.projectsList.push(project)
    ))
  }

  onDelete(project: Project){  
    this.onDeleteProject.emit(project);
    this.servPortfolio.deleteProject(project)
      .subscribe(()=> {return (this.projectsList = this.projectsList.filter((t) => (t.id !== project.id))
          );
        })
  }

  onSubmit(project: Project){
    this.newProject ? this.onInsert(project): this.onUpdate(project)
    console.log(this.newProject);
  }


  onSelectNewFile(event: Event): void{
    const target= event.target as HTMLInputElement;
    this.fileSelected = (target.files as FileList)[0];
    this.imageUrl= this.sant.bypassSecurityTrustUrl( window.URL.createObjectURL(this.fileSelected)) as string;    
    this.base64="Base64...";
    this.convertFileToBase64();
    
  }  

  convertFileToBase64(): void{
    let reader= new FileReader();
    reader.readAsDataURL(this.fileSelected as Blob);
    reader.onloadend=()=>{
      this.base64=reader.result as string;
    }
    //console.log("Imagen: ", this.imageUrl);
    setTimeout(()=>{                         
      this.projectItem.img=this.base64;
    }, 500);    
  }


}
