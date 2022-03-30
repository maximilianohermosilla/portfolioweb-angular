import { Component, OnInit, Output, EventEmitter, Input, NgIterable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Experience } from 'src/app/models/experience';
import { ExperienceService } from 'src/app/servicios/experience.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { UiServiceService } from 'src/app/servicios/ui-service.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['../../../styles.css']
})
export class ExperienciaComponent implements OnInit {
  @Input() editMode: boolean = false;
  @Output() onUpdateExperience: EventEmitter<Experience> = new EventEmitter();
  @Output() onInsertExperience: EventEmitter<Experience> = new EventEmitter();
  @Output() onDeleteExperience: EventEmitter<Experience> = new EventEmitter();

  formGroup: FormGroup;

  title="";
  color="";
  newExperience: boolean = false;
  experienceList: any;
  editModes: boolean= false;  
  showLogin: boolean = false;  
  subscription? : Subscription;
  
  experiencia: Experience = this.emptyExperience();

  
  base64: string = 'Base64...";'
  fileSelected?: Blob;
  imageUrl?: string;

  constructor(private servPortfolio: PortfolioService, private formBuilder: FormBuilder, private uiService: UiServiceService, private experienceServ: ExperienceService, private sant: DomSanitizer) { 
    this.subscription = this.uiService.onToggleSession().subscribe( data =>
        this.showLogin = data
      );
      
    this.formGroup = this.formBuilder.group({
      position : ['',[]],
      company : ['',[]],
      img : [null,[]],
      mode : ['',[]],
      start : ['',[]],
      end : ['',[]],
      timeElapsed : ['',[]],
      ubication : ['',[]]            
    })
   }

  ngOnInit(): void {
    this.getExperienceList();
    /*this.experienceServ.refresh$.subscribe(response => {
      this.getExperienceList();
    })*/
  }

  getExperienceList(){
    this.experienceServ.getExperiencia().subscribe(data =>{       
      this.experienceList = data;
    });
  }

  toggleEditMode(){
    this.editMode=!this.editMode;
    this.editMode ?  this.color="#D4EFDF": this.color="green";
  }

  setExperience(experience: Experience){
    this.newExperience = false;
    this.experiencia = {
      id: experience.id,
      position: experience.position,
      company: experience.company,
      img: experience.img,
      mode: experience.mode,
      start: experience.start,
      end: experience.end,
      timeElapsed: experience.timeElapsed,
      ubication: experience.ubication
    }
    this.formGroup.controls['position'].setValue(experience.position);
    this.formGroup.controls['company'].setValue(experience.company);
    this.formGroup.controls['mode'].setValue(experience.mode);
    this.formGroup.controls['start'].setValue(experience.start);
    this.formGroup.controls['end'].setValue(experience.end);
    this.formGroup.controls['timeElapsed'].setValue(experience.timeElapsed);
    this.formGroup.controls['ubication'].setValue(experience.ubication)

    this.title="Editar Experiencia";
    console.log("Set experience: " , this.experiencia);
  }

  emptyExperience(){
    this.newExperience = true;
    this.experiencia =  {
      id:0,
      position:"",
      company:"",
      img:"",
      mode:"",
      start:"",
      end:"",
      timeElapsed:"",
      ubication:""
    }
    this.title="Nueva Experiencia";
    return this.experiencia;
  }

  clearExperience(){
    this.newExperience = true;
    this.experiencia =  {
      id:0,
      position:"",
      company:"",
      img:"",
      mode:"",
      start:"",
      end:"",
      timeElapsed:"",
      ubication:""
    }
    this.formGroup.controls['position'].setValue('');
    this.formGroup.controls['company'].setValue('');
    this.formGroup.controls['mode'].setValue('');
    this.formGroup.controls['start'].setValue('');
    this.formGroup.controls['end'].setValue('');
    this.formGroup.controls['timeElapsed'].setValue('');
    this.formGroup.controls['ubication'].setValue('');
    this.title="Nueva Experiencia";
    return this.experiencia;
  }


  onSubmit(experience: Experience){
    experience = {
      id: experience.id,
      position: this.formGroup.value.position,
      company: this.formGroup.value.company,
      img: this.experiencia.img,
      mode: this.formGroup.value.mode,
      start: this.formGroup.value.start,
      end: this.formGroup.value.end,
      timeElapsed: this.formGroup.value.timeElapsed,
      ubication: this.formGroup.value.ubication
    }
    //console.log(this.newExperience);
    console.log(this.formGroup);
    console.log("Experience param: " , experience);
    console.log("this experiencia: " , this.experiencia);
    //this.setExperience(experience);
    this.newExperience ? this.onInsert(experience): this.onUpdate(experience);
    //this.ngOnInit();    
  }

  onUpdate(experience: Experience){
    this.experienceServ.updateExperience(experience).subscribe(result=>{this.ngOnInit();});  
    //this.experienceList = this.experienceList;
    this.getExperienceList();     
    //this.onUpdateExperience.emit(experience);
  }

  onInsert(experience: Experience){
    //this.onInsertExperience.emit(experience);
    console.log(experience);
    console.log(this.experiencia);
    this.experienceServ.insertExperience(experience).subscribe((experience)=>(
      this.experienceList.push(experience)
    ))
  }

  onDelete(experience: Experience){    
    console.log("Delete: " , experience);
    this.onDeleteExperience.emit(experience);
    this.experienceServ.deleteExperience(experience)
      .subscribe(data => {console.log("deleted", data); // {return (this.experienceList = this.experienceList.filter((t) => (t.id !== experience.id))
        this.ngOnInit();}
          );
        //})
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
      this.experiencia.img=this.base64;
    }, 500);    
  }
}
