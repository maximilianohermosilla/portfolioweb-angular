import { Component, OnInit, Output, EventEmitter, Input, NgIterable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Experience } from 'src/app/models/experience';
import { Portfolio } from 'src/app/models/portfolio';
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
  
  experiencia: Experience = this.clearExperience();

  constructor(private servPortfolio: PortfolioService, private formBuilder: FormBuilder, private uiService: UiServiceService) {
    this.subscription = this.uiService.onToggleSession().subscribe( data =>
        this.showLogin = data
      );
      
    this.formGroup = this.formBuilder.group({
      position : ['',[]],
      company : ['',[]],
      img : ['',[]],
      mode : ['',[]],
      start : ['',[]],
      end : ['',[]],
      timeElapsed : ['',[]],
      ubication : ['',[]]            
    })
   }

  ngOnInit(): void {
    /*this.servPortfolio.getPortfolio().subscribe(data =>{      
      this.experienceList = data.experience;
    });*/
    this.servPortfolio.getExperiencia().subscribe(data =>{       
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
    this.title="Editar Experiencia";
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
    this.title="Nueva Experiencia";
    return this.experiencia;
  }

  onUpdate(experience: Experience){
    this.servPortfolio.updateExperience(experience).subscribe();   
    this.experienceList = this.experienceList;
    this.ngOnInit();     
    //this.onUpdateExperience.emit(experience);
  }

  onInsert(experience: Experience){
    const newExperience = {
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
    experience.id=0;

    //this.onInsertExperience.emit(experience);
    this.servPortfolio.insertExperience(experience).subscribe((experience)=>(
      this.experienceList.push(experience)
    ))
  }

  onDelete(experience: Experience){    
    console.log("Delete");
    this.onDeleteExperience.emit(experience);
    this.servPortfolio.deleteExperience(experience)
      .subscribe(()=> {return (this.experienceList = this.experienceList.filter((t) => (t.id !== experience.id))
          );
        })
  }

  onSubmit(experience: Experience){
    this.newExperience ? this.onInsert(experience): this.onUpdate(experience)
    console.log(this.newExperience);
  }
}
