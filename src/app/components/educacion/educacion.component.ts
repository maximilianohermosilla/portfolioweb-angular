import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Education } from 'src/app/models/education';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['../../../styles.css']
})
export class EducacionComponent implements OnInit {  
  @Input() editMode: boolean = false;
  @Output() onUpdateEducation: EventEmitter<Education> = new EventEmitter();
  @Output() onInsertEducation: EventEmitter<Education> = new EventEmitter();
  @Output() onDeleteEducation: EventEmitter<Education> = new EventEmitter();
  
  formGroup: FormGroup;

  educationList: any;
  title: string = "";
  color: string ="";
  newEducation: boolean = false;
  educacion: Education = this.clearEducation();
  editModes: boolean = false; 

  constructor(private servPortfolio: PortfolioService, private formBuilder: FormBuilder) { 
    this.formGroup = this.formBuilder.group({
      school: ['',[]],
      title: ['',[]],
      image: ['',[]],
      career: ['',[]],
      score: ['',[]],
      start: ['',[]],
      end: ['',[]]
    })
  }

  ngOnInit(): void {
    // this.servPortfolio.obtenerDatos().subscribe(data =>{      
    //   this.educationList = data.education;
    // });
    this.servPortfolio.getEducation().subscribe(data =>{       
      this.educationList = data;
    });
  }

  toggleEditMode(){
    this.editMode = !this.editMode;
    this.editMode ?  this.color="#D4EFDF": this.color="green";
  }

  setEducation(education: Education){ 
    this.educacion={
      id: education.id,
      school: education.school,
      title: education.title,
      image: education.image,
      career: education.career,
      score: education.score,
      start: education.start,
      end: education.end
    }  
    this.newEducation = false;    
  }

  clearEducation(): Education{
    this.educacion =  {
      id: 0,
      school: '',
      title: '',
      image: '',
      career: '',
      score: '',
      start: '',
      end: ''
    }
    this.newEducation = true;
    return this.educacion;
  }
  
  onUpdate(education: Education){
    this.servPortfolio.updateEducation(education).subscribe();  
    this.educationList = this.educationList;
    this.ngOnInit();     
    //this.onUpdateExperience.emit(experience);
  }

  onInsert(education: Education){
    this.setEducation(education);
    education.id=0;
    //this.onInsertExperience.emit(experience);
    this.servPortfolio.insertEducation(education).subscribe((educacion)=>(
      this.educationList.push(educacion)
    ))
  }

  onDelete(educacion: Education){  
    this.onDeleteEducation.emit(educacion);
    this.servPortfolio.deleteEducation(educacion)
      .subscribe(()=> {return (this.educationList = this.educationList.filter((t) => (t.id !== educacion.id))
          );
        })
  }

  onSubmit(educacion: Education){
    this.newEducation ? this.onInsert(educacion): this.onUpdate(educacion)
    console.log(this.newEducation);
  }
}
