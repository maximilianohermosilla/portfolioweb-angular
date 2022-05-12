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

  idPersona = 1;
  formGroup: FormGroup;

  title="";
  color="";
  newExperience: boolean = false;
  experienceList: any;
  editModes: boolean= false;  
  showLogin: boolean = false;  
  subscription? : Subscription;
  
  experiencia: Experience = this.emptyExperience();

  
  base64: string = ''
  fileSelected?: Blob;
  imageUrl?: string;  
  sizeImage: boolean = false;

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
  }

  getExperienceList(){
    this.experienceServ.getExperienciaPortfolio(this.idPersona).subscribe(data =>{       
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
    //console.log("Set experience: " , this.experiencia);
  }

  emptyExperience(){
    this.newExperience = true;
    this.experiencia =  {      
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
    this.base64 = this.base64.length>0? this.base64: this.experiencia.img;
    experience = {
      id: experience.id,
      position: this.formGroup.value.position,
      company: this.formGroup.value.company,
      img: this.base64,
      mode: this.formGroup.value.mode,
      start: this.formGroup.value.start,
      end: this.formGroup.value.end,
      timeElapsed: this.formGroup.value.timeElapsed,
      ubication: this.formGroup.value.ubication
    }
    this.newExperience ? this.onInsert(experience): this.onUpdate(experience);
    //this.ngOnInit();    
  }

  onUpdate(experience: Experience){
    this.experienceServ.updateExperience(experience).subscribe(result=>{this.ngOnInit();});  
    this.getExperienceList();  
    this.base64="";   
    //this.onUpdateExperience.emit(experience);
  }

  onInsert(experience: Experience){
    this.experienceServ.insertExperience(this.idPersona, experience).subscribe((experience)=>(
      this.ngOnInit()
    ))
    this.base64="";
  }

  onDelete(experience: Experience){  
    this.onDeleteExperience.emit(experience);
    this.experienceServ.deleteExperience(experience)
      .subscribe(data => {
        this.ngOnInit();}
          );
        //})
  }

  

  onSelectNewFile(event: Event): void{
    const target= event.target as HTMLInputElement;
    this.fileSelected = (target.files as FileList)[0];
    this.imageUrl= this.sant.bypassSecurityTrustUrl( window.URL.createObjectURL(this.fileSelected)) as string;    
    this.base64="Base64...";
    this.formGroup.value.img=this.fileSelected;
    this.convertFileToBase64();

    
  }  

  convertFileToBase64(): void{
    let reader= new FileReader();
    reader.readAsDataURL(this.fileSelected as Blob);
    reader.onloadend=()=>{
      this.base64=reader.result as string;
    }    
    setTimeout(()=>{           
      this.bigImage();
    }, 500);    
  }

  get Image(){
    return this.formGroup.get('img');
  }

  bigImage(){
    this.sizeImage = (this.base64.length > 50000);
  }

  clearImage(experienceImg: string){
    this.base64=experienceImg;
    this.formGroup.value.img='';
    this.bigImage();
  }
}
