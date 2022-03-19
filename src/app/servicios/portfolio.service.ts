import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';
import { Portfolio } from '../models/portfolio';
import { PORTFOLIOS } from '../models/mock-portfolio';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private apiUrl = 'http://localhost:5001/portfolio'
  portfolio: Portfolio = PORTFOLIOS[0];

  constructor(private http:HttpClient) { }

  obtenerDatos(): Observable<any>{
    return this.http.get(this.apiUrl);
  }

  getPortfolio(): Observable<Portfolio>{
    return this.http.get<Portfolio>(this.apiUrl);
  }
}
