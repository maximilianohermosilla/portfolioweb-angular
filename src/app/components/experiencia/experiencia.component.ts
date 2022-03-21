import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Experience } from 'src/app/models/experience';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['../../../styles.css']
})
export class ExperienciaComponent implements OnInit {
  @Output() onUpdateExperience: EventEmitter<Experience> = new EventEmitter();
  @Output() onInsertExperience: EventEmitter<Experience> = new EventEmitter();
  @Output() onDeleteExperience: EventEmitter<Experience> = new EventEmitter();

  title="";
  newExperience: boolean = false;
  experienceList: any;
  experiencia: Experience =  {
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

  constructor(private servPortfolio: PortfolioService, ) { }

  ngOnInit(): void {
    /*this.servPortfolio.getPortfolio().subscribe(data =>{      
      this.experienceList = data.experience;
    });*/
    this.servPortfolio.getExperiencia().subscribe(data =>{       
      this.experienceList = data;
    });
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
    console.log("Clear: ", this.experiencia);
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
}
