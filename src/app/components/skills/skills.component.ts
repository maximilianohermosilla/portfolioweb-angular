import { Component, OnInit, Output } from '@angular/core';
import { Chart } from 'chart.js';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skillsList: any;
  charts: any[] = [];
  myChart;
  nombre;
  _data;
  _options;
  htmlVariable;

  constructor(private servPortfolio: PortfolioService) {  }
  //htmlVariable: string ="";
  
  ngOnInit(): void {
    //this.getChartBarra();      
    //this.getSkills();    
    this.servPortfolio.obtenerDatos().subscribe(data =>{
      this.skillsList = data.skills; 
    });
    setTimeout(()=>{                         
      this.createContent();
  }, 500);
  }

  createContent(){
    var i=0;
    this.servPortfolio.obtenerDatos().subscribe(data =>{
      data.skills.forEach(element => {
        console.log("Creando chart " + element.id);
        this.charts.push(this.createChart(element.id, element.name, element.score, element.color));
        this._data = this.charts[i].data;
        this._options = this.charts[i].option;
        i++;

        console.log(this._data);

        this.nombre="chart"+element.id;        

        this.chartFactory();          
      });        
    });
    console.log(this.charts);
  }  

  createChart(id:number, name:string, score:number, color:string): any{
    var data;
    var option;
    data = {
      labels: [name],
      datasets: [{
        label: name,
        data: [score, 100-score],
        backgroundColor: [
          color,
          'rgb(255, 255, 255)'
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
    //console.log(nombre);
    
    if (this.myChart) {
      this.myChart.destroy();
    }

    var datos = { data, option };
    console.log(datos);
    return datos;
  }


  chartFactory(){
    if (this.myChart) {
      this.myChart.destroy();
    }
    console.log("nombre factory: " + this.nombre);
    //console.log(this._data);
    //console.log(this._options);
    new Chart(this.nombre, {
      type: "doughnut",
      options: this._options,
      data: this._data
    });

    console.log("Factory "+this.nombre+" ok");
  }


  
  








  getSkills(){
    var data1 = {
      labels: [".NET"],
      datasets: [{
        label: '.NET',
        data: [85, 15],
        backgroundColor: [
          'rgb(100, 80, 200)',
          'rgb(255, 255, 255)'
        ],
        hoverBackgroundColor: ["rgba(0,0,0,0.1)","rgba(0,0,0,0.1)"],
        hoverBorderColor: ["rgba(90,100,36,0.2)","rgba(255,255,255,0.2)"],
        hoverOffset: 2
      }]
    };
    var option1 = {
      responsive: true,
    };

    var data2 = {
      labels: ["Java"],
      datasets: [{
        label: 'Java',
        data: [78, 22],
        backgroundColor: [
          'rgb(30, 199, 30)',
          'rgb(255, 255, 255)'
        ],
        hoverBackgroundColor: ["rgba(0,0,0,0.1)","rgba(0,0,0,0.1)"],
        hoverBorderColor: ["rgba(90,100,36,0.2)","rgba(255,255,255,0.2)"],
        hoverOffset: 2
      }]
    };
    var option2 = {
      responsive: true,
    };

    var data3 = {
      labels: ["SQL"],
      datasets: [{
        label: 'SQL',
        data: [80, 20],
        backgroundColor: [
          'rgb(150, 150, 100)',
          'rgb(255, 255, 255)'
        ],
        hoverBackgroundColor: ["rgba(0,0,0,0.1)","rgba(0,0,0,0.1)"],
        hoverBorderColor: ["rgba(90,100,36,0.2)","rgba(255,255,255,0.2)"],
        hoverOffset: 2
      }]
    };
    var option3 = {
      responsive: true,
    };

    var data4 = {
      labels: ["Angular"],
      datasets: [{
        label: 'Angular',
        data: [45, 55],
        backgroundColor: [
          'rgb(100, 00, 10)',
          'rgb(255, 255, 255)'
        ],
        hoverBackgroundColor: ["rgba(0,0,0,0.1)","rgba(0,0,0,0.1)"],
        hoverBorderColor: ["rgba(90,100,36,0.2)","rgba(255,255,255,0.2)"],
        hoverOffset: 2
      }]
    };
    var option4 = {
      responsive: true,
    };
    
    
    

    new Chart("chart1", {
      type: "doughnut",
      options: option1,
      data: data1
    });
    
    new Chart("chart2", {
      type: "doughnut",
      options: option2,
      data: data2
    });

    new Chart("chart3", {
      type: "doughnut",
      options: option3,
      data: data3
    });

    new Chart("chart4", {
      type: "doughnut",
      options: option4,
      data: data4
    });

  }




  getChartBarra(){
    var data = {
      labels: [".NET", "Java", "HTML", "CSS", "JavaScript", "Angular", "SpringBoot"],
      datasets: [
        {
          label: "Lenguajes programación",
          backgroundColor: "rgba(90,218,36,100.2)",
          borderColor: "rgba(90,100,36,1.2)",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(90,100,36,0.2)",
          hoverBorderColor: "rgba(90,100,36,1.2)",
          data: [65, 59, 20, 81, 56, 55, 40]
        }
      ]
    };

    var option = {
      responsive: false,
      scales: {
        y: {
          stacked: true,
          grid: {
            display: true,
            color: "rgba(255,99,132,0.2)"
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    };

    new Chart("chart_0", {
      type: "bar",
      options: option,
      data: data
    });   
    
  }

  generateCharts(){
    //var ctx = document.getElementById('myChart').getContext('2d');
    return this.charts;
  
  }

}
