import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { ProjectService } from 'src/app/servicios/project.service';
import { UiServiceService } from 'src/app/servicios/ui-service.service';

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

  idPersona = 1;
  formGroup: FormGroup;

  projectsList: any;
  title: string = "";
  color: string = "";
  projectItem: Project = this.emptyProject();
  newProject: boolean = false;
  editModes: boolean = false;
  showLogin: boolean = false;
  subscription? : Subscription;

  base64: string = 'Base64...";'
  fileSelected?: Blob;
  imageUrl?: string;
  sizeImage: boolean = false;

  constructor(private servPortfolio: ProjectService, private formBuilder: FormBuilder, private sant: DomSanitizer, private uiService: UiServiceService) {    
    this.subscription = this.uiService.onToggleSession().subscribe( data =>
      this.showLogin = data
    );

    this.formGroup = this.formBuilder.group({
      name: ['',[]],
      start: ['',[]],
      description: ['',[]],
      url: ['',[]],
      img: [null,[]],
    })
   }

  ngOnInit(): void {
    this.getProjectList();
  }

  getProjectList(){
    this.servPortfolio.getProjectPortfolio(this.idPersona).subscribe(data =>{
      this.projectsList = data;
    });
  }

  toggleEditMode(){
    this.editMode = !this.editMode;
    this.editMode ?  this.color="#D4EFDF": this.color="green";
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
    this.base64 = project.img;
    this.formGroup.controls['name'].setValue(project.name);
    this.formGroup.controls['start'].setValue(project.start);
    this.formGroup.controls['description'].setValue(project.description);
    this.formGroup.controls['url'].setValue(project.url);
    
    this.title="Editar Proyecto";
    this.newProject = false;    
    //console.log("Set project: ", this.projectItem);
  }

  emptyProject(): Project{
    this.projectItem = {
      id: 0,
      name: '',
      start: '',
      description: '',
      url: '',
      img: ''
    }
    this.title="Nuevo Proyecto";
    this.newProject = true;
    return this.projectItem;
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
    this.formGroup.controls['name'].setValue('');
    this.formGroup.controls['start'].setValue('');
    this.formGroup.controls['description'].setValue('');
    this.formGroup.controls['url'].setValue('');
    this.newProject = true;

    this.title="Nuevo Proyecto";
    return this.projectItem;
  }

  onSubmit(project: Project){
    this.base64 = this.base64.length>0? this.base64: this.projectItem.img;
    project = {
      id : project.id,
      name : this.formGroup.value.name,
      start : this.formGroup.value.start,
      img : this.base64,
      description : this.formGroup.value.description,
      url : this.formGroup.value.url,
    }

    /*console.log(this.formGroup);
    console.log("project param: ", project);
    console.log("this projectItem: ", this.projectItem);*/
    this.newProject ? this.onInsert(project): this.onUpdate(project)    
  }

  onUpdate(project: Project){
    this.servPortfolio.updateProject(project).subscribe(result=>{this.ngOnInit();}); 
    this.getProjectList();
    this.base64='';    
  }
  
  onInsert(project: Project){
    this.servPortfolio.insertProject(this.idPersona, project).subscribe((project)=>(
      this.ngOnInit()
    ))
    this.base64="";
  }

  onDelete(project: Project){  
    //.log("Delete: " , project);
    this.onDeleteProject.emit(project);
    this.servPortfolio.deleteProject(project)
      .subscribe(data => {
        //console.log("deleted" , data);
        this.ngOnInit();
        });        
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
    //console.log("Imagen url: ", this.imageUrl);

    setTimeout(()=>{                         
      this.bigImage();
    }, 500);    
  }

  get Image(){
    return this.formGroup.get('img');
  }

  bigImage(){
    this.sizeImage = (this.base64.length > 50000);
    //console.log("Imagen base64 length: ", this.base64.length);
  }

  clearImage(educationImg: string){
    //console.log("conservar: " , educationImg);
    this.base64=educationImg;
    this.bigImage();
  }


}
