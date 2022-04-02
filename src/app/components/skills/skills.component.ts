import { Component, OnDestroy, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { Skill } from 'src/app/models/skill';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { SkillsService } from 'src/app/servicios/skills.service';
import { UiServiceService } from 'src/app/servicios/ui-service.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit, OnDestroy {
  @Input() editMode: boolean = false;
  @Output() onUpdateSkilln: EventEmitter<Skill> = new EventEmitter();
  @Output() onInsertSkill: EventEmitter<Skill> = new EventEmitter();
  @Output() onDeleteSkill: EventEmitter<Skill> = new EventEmitter();

  idPersona = 1;
  formGroup: FormGroup;

  subscription: Subscription = new Subscription();
  title: string = "";
  color: string = "";
  editModes: boolean = false;
  showLogin: boolean = false;

  skillsList: Skill[] = [];
  skillItem: Skill = this.emptySkill();
  newSkill: boolean = true;
  charts: any[] = [];
  chartsFactory: any[] = [];
  nombre;
  _data;
  _options;


  constructor(private servPortfolio: SkillsService, private formBuilder: FormBuilder, private uiService: UiServiceService) {  
    this.subscription = this.uiService.onToggleSession().subscribe( data =>
      this.showLogin = data
    );

    this.formGroup = this.formBuilder.group({
      name: ['',[]],
      score: ['',[Validators.max(100)]],
      color: ['',[]],
    })
  }
  
  ngOnInit(): void { 
    this.getSkills();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  getSkills(){
    this.servPortfolio.getSkillsPortfolio(this.idPersona).subscribe(data =>{
      this.skillsList = data; 
    });
    setTimeout(()=>{                         
      this.getCharts();
    }, 500);
  }

  getCharts(){
    var i=0;
    this.servPortfolio.getSkills().subscribe(data =>{
      data.forEach(element => {
        this.charts.push(this.createChart(element.name, element.score, element.color, element.id));
        this._data = this.charts[i].data;
        this._options = this.charts[i].option;
        this.nombre="chart"+element.id;
        i++;
        this.chartFactory();          
      });        
    });
  }  

  createChart(name:string, score:number, color:string, id?:number): any{
    var data;
    var option;
    data = {
      labels: [name],
      datasets: [{
        label: name,
        data: [score, 100-score],
        backgroundColor: [
          color,
          'rgb(255, 255, 255,0)'
        ],
        hoverBackgroundColor: ["rgba(0,0,0,0.1)","rgba(0,0,0,0.1)"],
        hoverBorderColor: ["rgba(90,100,36,0.2)","rgba(255,255,255,0.2)"],
        hoverOffset: 2
      }]
    };
    option = {
      responsive: true,
    };    
    var nombre="chart"+id;   

    var datos = { data, option }
    return datos;
  }


  chartFactory(){
    const chart = new Chart(this.nombre, {
      type: "doughnut",
      options: this._options,
      data: this._data
    });
    this.chartsFactory.push(chart);
  }  
  
  toggleEditMode(){
    this.editMode = !this.editMode;
    this.editMode ?  this.color="#D4EFDF": this.color="green";
  }

  setSkill(skill: Skill){
    this.skillItem = skill;

    this.formGroup.controls['name'].setValue(skill.name);
    this.formGroup.controls['score'].setValue(skill.score);
    this.formGroup.controls['color'].setValue(skill.color);

    this.title="Editar Aptitud";
    this.newSkill = false;
  } 

  emptySkill(): Skill{
    this.skillItem = {
      id : 0,
      name: '',
      score: 0,
      color: ''
    }
    this.title="Nueva Aptitud";
    this.newSkill = true;
    return this.skillItem;
  }

  clearSkill(): Skill{
    this.skillItem = {
      id : 0,
      name: '',
      score: 0,
      color: ''
    }
    this.formGroup.controls['name'].setValue('');
    this.formGroup.controls['score'].setValue('');
    this.formGroup.controls['color'].setValue('');

    this.title="Nueva Aptitud";
    this.newSkill = true;
    return this.skillItem;
  }  

  onSubmit(skill: Skill){    
    skill = {
      id: skill.id,
      name: this.formGroup.value.name,
      score: this.formGroup.value.score,
      color: this.skillItem.color
    }

    console.log(this.formGroup);
    console.log("skill param: " , skill);
    console.log("this skillItem: ", this.skillItem);
    console.log("chartsFactory list: ", this.chartsFactory);
    console.log("charts list: ", this.charts);    
    console.log("chartsFactory list: ", this.chartsFactory);
    //this.chartsFactory=[];
    this.newSkill ? this.onInsert(skill): this.onUpdate(skill)
  }

  onInsert(skill: Skill){
    //this.setSkill(skill);
    this.servPortfolio.insertSkill(this.idPersona, skill).subscribe((element)=>(
      this.ngOnInit()
    ))  
    
    location.reload(); 
  }

  onUpdate(skill: Skill){
    //this.clearCharts();
    console.log(this.skillItem);
    console.log(this.formGroup);
    console.log(skill);
    this.servPortfolio.updateSkill(skill).subscribe(result=>{      
      console.log("deleted" , result);
      this.ngOnInit()}); 
    this.ngOnInit();  
    location.reload(); 
  }

  onDelete(skill: Skill){  
    console.log("Delete: " , skill);
    this.onDeleteSkill.emit(skill);
    this.servPortfolio.deleteSkill(skill)
    .subscribe(data => {
      console.log("deleted" , data);
      this.ngOnInit()
      });
      this.ngOnInit();
    location.reload(); 
  }


  clearCharts(){
    console.log("Initial list: ", this.chartsFactory);
    this.chartsFactory.forEach(element => {
        console.log(element);
        console.log(element.canvas.id);
        const elem = document.getElementById('canvas');
        console.log(elem);
        if (elem){
          console.log("not null");
          elem.remove(); 
        }    
        console.log(elem);
    });
    if (this.chartsFactory && this.chartsFactory.length > 0) this.chartsFactory.forEach(chart => chart.destroy());
    const elem = document.getElementById('canvas');
    this.chartsFactory=[];
    this.charts=[];
    console.log("Final list: ", this.chartsFactory);
    console.log("Final list: ", this.charts);
  }

  

  get Name(){
    return this.formGroup.get('name');
  }

  get Score(){
    return this.formGroup.get('score');
  }

  get Color(){
    return this.formGroup.get('color');
  }

}
