import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/servicios/education.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { UiServiceService } from 'src/app/servicios/ui-service.service';

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
  
  idPersona = 1;
  formGroup: FormGroup;

  educationList: any;
  title: string = "";
  color: string ="";
  newEducation: boolean = false;
  educacion: Education = this.emptyEducation();
  editModes: boolean = false;   
  showLogin: boolean = false;  
  subscription? : Subscription;

  base64: string = ''
  fileSelected?: Blob;
  imageUrl?: string;
  sizeImage: boolean = false;

  constructor(private servPortfolio: EducationService, private formBuilder: FormBuilder, private uiService: UiServiceService, private sant: DomSanitizer) { 
    this.subscription = this.uiService.onToggleSession().subscribe( data =>
      this.showLogin = data
    );

    this.formGroup = this.formBuilder.group({
      school: ['',[]],
      title: ['',[]],
      image: [null,[Validators.maxLength(50000)]],
      career: ['',[]],
      score: ['',[]],
      start: ['',[]],
      end: ['',[]]
    })
  }

  ngOnInit(): void {
    this.getEducationList();
  }

  getEducationList(){    
    this.servPortfolio.getEducationPortfolio(this.idPersona).subscribe(data =>{       
      this.educationList = data;
    });
    console.log(this.educationList);
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
    this.formGroup.controls['school'].setValue(education.school);
    this.formGroup.controls['title'].setValue(education.title);
    this.formGroup.controls['career'].setValue(education.career);
    this.formGroup.controls['score'].setValue(education.score);
    this.formGroup.controls['start'].setValue(education.start);
    this.formGroup.controls['end'].setValue(education.end);

    this.title="Editar Educación";
    this.newEducation = false;   
    console.log("Set educacion: " , this.educacion); 
  }

  emptyEducation(): Education{
    this.newEducation = true;
    this.educacion =  {
      id: 0,
      school: "",
      title: "",
      image: "",
      career: "",
      score: "",
      start: "",
      end: ""
    }
    this.title="Nueva Educación";
    return this.educacion;
  }

  clearEducation(): Education{
    this.newEducation = true;
    this.educacion =  {
      id: 0,
      school: "",
      title: "",
      image: "",
      career: "",
      score: "",
      start: "",
      end: ""
    }
    this.formGroup.controls['school'].setValue('');
    this.formGroup.controls['title'].setValue('');
    this.formGroup.controls['career'].setValue('');
    this.formGroup.controls['score'].setValue('');
    this.formGroup.controls['start'].setValue('');
    this.formGroup.controls['end'].setValue('');

    this.title="Nueva Educación";
    return this.educacion;
  }

  onSubmit(education: Education){
    this.base64 = this.base64.length>0? this.base64: this.educacion.image;
    education= {
      id: education.id,
      school: this.formGroup.value.school,
      title: this.formGroup.value.title,
      image: this.base64,
      career: this.formGroup.value.career,
      score: this.formGroup.value.score,
      start: this.formGroup.value.start,
      end: this.formGroup.value.end
    }
    console.log(this.formGroup);
    console.log("education param: " , education);
    console.log("this educacion: " , this.educacion);
    this.newEducation ? this.onInsert(education): this.onUpdate(education)
    //console.log(this.newEducation);
  }
  
  onUpdate(education: Education){
    this.servPortfolio.updateEducation(education).subscribe(result=>{this.ngOnInit();});  
    this.getEducationList();
    this.base64="";
  }

  onInsert(education: Education){
    this.servPortfolio.insertEducationPersona(this.idPersona,education).subscribe((educacion)=>(
      //this.educationList.push(educacion)
      this.ngOnInit()
    ))
    this.base64="";
  }

  onDelete(educacion: Education){        
    console.log("Delete: " , educacion);
    this.onDeleteEducation.emit(educacion);
    this.servPortfolio.deleteEducation(educacion)
      .subscribe(data => {
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
    console.log("Imagen url: ", this.imageUrl);
    
    setTimeout(()=>{                         
      //this.educacion.image=this.base64;
      console.log("Imagen educacion length: ", this.educacion.image.length);
      this.bigImage();
    }, 500);    
  }

  get Image(){
    return this.formGroup.get('image');
  }

  bigImage(){
    this.sizeImage = (this.base64.length > 50000);
    console.log("Imagen base64 length: ", this.base64.length);
  }

  clearImage(educationImg: string){
    console.log("conservar: " , educationImg);
    this.base64=educationImg;
    this.bigImage();
  }  

}

