import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';
import { Portfolio } from '../models/portfolio';
import { PORTFOLIOS } from '../models/mock-portfolio';
import { Skill } from '../models/skill';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private apiUrl = 'http://localhost:5001/portfolio'

  constructor(private http:HttpClient) { }

  obtenerDatos(): Observable<any>{
    return this.http.get(this.apiUrl);
  }

  getPortfolio(): Observable<Portfolio>{
    return this.http.get<Portfolio>(this.apiUrl);
  }

  updatePortfolio(portfolio: Portfolio): Observable<Portfolio>{
    //const url = `${this.apiUrl}/${portfolio.id}`
    return this.http.post<Portfolio>(this.apiUrl, portfolio, httpOptions);
  }
}
