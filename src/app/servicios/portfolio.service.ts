import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  myChart;
  chartsList;

  constructor(private http:HttpClient) { }

  obtenerDatos(): Observable<any>{
    //console.log("El servicio Portfolio esta corriendo");
    return this.http.get('./assets/data/data.json');
  }

  createChart(id:number, name:string, score:number, color:string): Chart{
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
    console.log(nombre);
    
    if (this.myChart) {
      this.myChart.destroy();
    }

    this.myChart = new Chart(nombre, {
      type: "doughnut",
      options: option,
      data: data
    });

    //console.log(this.myChart.data);

     return this.myChart;
  }
}
