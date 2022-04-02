import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, } from 'rxjs';
import { Portfolio } from '../models/portfolio';
import { Experience } from '../models/experience';
import { map, tap } from 'rxjs/operators'
import { Education } from '../models/education';

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



}
