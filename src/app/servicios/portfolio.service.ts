import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, } from 'rxjs';
import { Portfolio } from '../models/portfolio';
import { Experience } from '../models/experience';
import { map, tap } from 'rxjs/operators'
import { Education } from '../models/education';
import { LoginComponent } from '../components/login/login.component';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private _refresh$ = new Subject<void>();

  private apiPortfolio = 'http://localhost:8080/portfolio'
  private apiPortfolioFull = 'http://localhost:8080/portfolioFull/1'
  private apiPortfolioExperience = 'http://localhost:8080/portfolioExperience/1'
  private apiPortfolioEducation = 'http://localhost:8080/portfolioEducation/1'

  constructor(private http:HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  getPortfolio(): Observable<Portfolio>{
    return this.http.get<Portfolio>(this.apiPortfolio).pipe(
      tap(() => {
         this._refresh$.next();       
      })
    )
  } 

  getPortfolioFull(): Observable<Portfolio>{
    return this.http.get<Portfolio>(this.apiPortfolioFull).pipe(
      tap(() => {
         this._refresh$.next();       
      })
    )
  } 

  updatePortfolio(portfolio: Portfolio): Observable<Portfolio>{
    const url = `${this.apiPortfolio}/${portfolio.id}`
    return this.http.put<Portfolio>(url, portfolio, {responseType: "text" as "json"}).pipe(
      tap(() => {
         this.refresh$.next();       
      })
    );
  }

  updateSelect(portfolio: Portfolio, id_company: number, id_school: number): Observable<Portfolio>{
    const url = `${this.apiPortfolioFull}/${portfolio.id}`
    //let _params = new HttpParams().set('id_company', id_company).set('id_school', id_school);
    let _params = {'id_company': id_company, 'id_school': id_school};
    //_params = _params.append('id_company', id_company);
    //_params = _params.append('id_school', id_school);    
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
      params: { 'id_company': id_company, 'id_school': id_school}
  };

    console.log("params: ", httpOptions)
    return this.http.put<Portfolio>(this.apiPortfolioFull, httpOptions, {responseType: "text" as "json"}).pipe(
      tap(() => {
         this.refresh$.next();       
      })
    );
  }


  updateSchool(education: Education): Observable<Portfolio>{
    const url = `${this.apiPortfolioFull}/${education.idPersona}`
    return this.http.put<Portfolio>(this.apiPortfolioEducation, education, {responseType: "text" as "json"}).pipe(
      tap(() => {
         this.refresh$.next();       
      })
    );
  }

  updateCompany(experience: Experience): Observable<Portfolio>{
    const url = `${this.apiPortfolioFull}/${experience.id}`
    console.log("url: ", this.apiPortfolioExperience);
    console.log("guardar: ",experience);
    return this.http.put<Portfolio>(this.apiPortfolioExperience, experience.id, {responseType: "text" as "json"}).pipe(
      tap(() => {
         this.refresh$.next();       
      })
    );
  }

  /*updateSchool(education: Education): Observable<Portfolio>{
    const url = `${this.apiPortfolioFull}/${education.idPersona}`
    return this.http.put<Portfolio>(this.apiPortfolioFull, education, {responseType: "text" as "json"}).pipe(
      tap(() => {
         this.refresh$.next();       
      })
    );*/
  



}
