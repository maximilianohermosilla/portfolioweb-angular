import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Education } from 'src/app/models/education';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['../../../styles.css']
})
export class EducacionComponent implements OnInit {
  formGroup: FormGroup;
  educationList: any;
  title: string = "";
  newEducation: boolean = false;
  educacion: Education = this.clearEducation();
  editMode: boolean = false;
  color: string ="";

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
    this.servPortfolio.obtenerDatos().subscribe(data =>{      
      this.educationList = data.education;
    });
  }

  onSubmit(education: Education){

  }

  onDelete(education: Education){
    console.log("Delete");
  }

  setEducation(education: Education){ 
    this.educacion={
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

  toggleEditMode(){
    this.editMode = !this.editMode;
    this.editMode ?  this.color="#D4EFDF": this.color="green";
  }
}
