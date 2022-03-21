import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';
import { Portfolio } from '../models/portfolio';
import { PORTFOLIOS } from '../models/mock-portfolio';
import { Skill } from '../models/skill';
import { Experience } from '../models/experience';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private url= 'https:localhost:5001/'
  private apiUrl = 'http://localhost:5001/portfolio'
  private urlExperience = 'http://localhost:5001/experience'

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

  getExperiencia(): Observable<Experience[]>{
    return this.http.get<Experience[]>(this.urlExperience);
  }

  getSkills(): Observable<Skill[]>{
    return this.http.get<Skill[]>(this.url+'skills');
  }

  updateExperience(experience: Experience): Observable<Experience>{
    const updateUrl = `${this.urlExperience}/${experience.id}`
    return this.http.put<Experience>(updateUrl, experience, httpOptions);
  }

  insertExperience(experience: Experience): Observable<Experience>{
    return this.http.post<Experience>(this.urlExperience, experience, httpOptions);
  }

  deleteExperience(experience: Experience): Observable<Experience>{
    const deleteUrl = `${this.urlExperience}/${experience.id}`
    return this.http.delete<Experience>(deleteUrl);
  }
}
