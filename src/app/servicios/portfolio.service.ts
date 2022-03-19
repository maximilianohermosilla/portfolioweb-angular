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
  private apiUrl = 'http://localhost:5001/portfolio'

  constructor(private http:HttpClient) { }

  obtenerDatos(): Observable<any>{
    //console.log("El servicio Portfolio esta corriendo");
    //return this.http.get('./assets/data/data.json');
    return this.http.get(this.apiUrl);
  }
  
}
