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

  constructor(private servPortfolio: PortfolioService) {  }
  
  ngOnInit(): void { 
    this.servPortfolio.obtenerDatos().subscribe(data =>{
      this.skillsList = data.skills; 
    });
    setTimeout(()=>{                         
      this.getCharts();
    }, 500);
  }

  getCharts(){
    var i=0;
    this.servPortfolio.obtenerDatos().subscribe(data =>{
      data.skills.forEach(element => {
        this.charts.push(this.createChart(element.id, element.name, element.score, element.color));
        this._data = this.charts[i].data;
        this._options = this.charts[i].option;
        this.nombre="chart"+element.id;
        i++;

        this.chartFactory();          
      });        
    });
    //console.log(this.charts);
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

    if (this.myChart) {
      this.myChart.destroy();
    }

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

}
