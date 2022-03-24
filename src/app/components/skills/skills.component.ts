import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { Skill } from 'src/app/models/skill';
import { PortfolioService } from 'src/app/servicios/portfolio.service';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit, OnDestroy {
  @Output() onUpdateSkilln: EventEmitter<Skill> = new EventEmitter();
  @Output() onInsertSkill: EventEmitter<Skill> = new EventEmitter();
  @Output() onDeleteSkill: EventEmitter<Skill> = new EventEmitter();

  formGroup: FormGroup;
  subscription: Subscription = new Subscription();
  editMode: boolean = false;
  color: string = "";

  skillsList: Skill[] = [];
  skillItem: Skill = this.clearSkill();
  newSkill: boolean = true;
  charts: any[] = [];
  myChart;
  nombre;
  _data;
  _options;


  constructor(private servPortfolio: PortfolioService, private formBuilder: FormBuilder) {  
    this.formGroup = this.formBuilder.group({
      name: ['',[]],
      score: ['',[]],
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
    this.servPortfolio.getSkills().subscribe(data =>{
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
    if (this.myChart instanceof Chart) {
      this.myChart.destroy();
    }
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
    if (this.myChart) {
      this.myChart.destroy();
    }
    new Chart(this.nombre, {
      type: "doughnut",
      options: this._options,
      data: this._data
    });
  }  
  
  toggleEditMode(){
    this.editMode = !this.editMode;
    this.editMode ?  this.color="#D4EFDF": this.color="green";
  }

  clearSkill(): Skill{
    this.skillItem = {
      id : 0,
      name: '',
      score: 0,
      color: ''
    }
    this.newSkill = true;
    return this.skillItem;
  }

  setSkill(skill: Skill){
    this.skillItem = skill;
    this.newSkill = false;
  } 

  onInsert(skill: Skill){
    this.setSkill(skill);
    skill.id=0;
    //this.onInsertExperience.emit(experience);
    this.servPortfolio.insertSkill(skill).subscribe((element)=>(
      this.skillsList.push(element)
    ))
  }

  onUpdate(skill: Skill){
    this.servPortfolio.updateSkill(skill).subscribe();       
    this.ngOnInit();  
    window.location.reload(); 
  }

  onDelete(skill: Skill){  
    this.onDeleteSkill.emit(skill);
    this.servPortfolio.deleteSkill(skill)
      .subscribe(()=> {return (this.skillsList = this.skillsList.filter((t) => (t.id !== skill.id))
          );
        })
  }

  onSubmit(skill: Skill){
    this.newSkill ? this.onInsert(skill): this.onUpdate(skill)
    console.log(this.newSkill);
  }

  

}
