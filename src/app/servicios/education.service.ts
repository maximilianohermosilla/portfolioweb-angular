import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, Subject } from 'rxjs';
import { Education } from '../models/education';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private _refresh$ = new Subject<void>();

    // private apiEducation = 'http://localhost:8080/education'
    // private apiEducationFull = 'http://localhost:8080/educationFull'
    // private apiEducationPersona = 'http://localhost:8080/educationPersona'
    // private apiInsertEducation = 'http://localhost:8080/education/'

    private apiEducation = 'https://limitless-gorge-37634.herokuapp.com/education'
    private apiEducationFull = 'https://limitless-gorge-37634.herokuapp.com/educationFull'
    private apiEducationPersona = 'https://limitless-gorge-37634.herokuapp.com/educationPersona'
    private apiInsertEducation = 'https://limitless-gorge-37634.herokuapp.com/education/'

  constructor(private http:HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  getEducation(): Observable<Education[]>{
    return this.http.get<Education[]>(this.apiEducation).pipe(
      tap(() => {
         this._refresh$.next();       
      })
    )
  }   

  getEducationPortfolio(idPersona: Number): Observable<Education[]>{
    return this.http.get<Education[]>(this.apiEducationPersona+"/"+idPersona).pipe(
      tap(() => {
         this._refresh$.next();       
      })
    )
  } 

  getEducationFull(): Observable<Education[]>{
    //return this.http.get<Education[]>(this.urlEducation);
    return this.http.get<Education[]>(this.apiEducationFull).pipe(
      tap(() => {
         this._refresh$.next();       
      })
    )
  } 

  updateEducation(education: Education): Observable<Education>{
    const updateUrlEducation = `${this.apiEducation}/${education.id}`
    return this.http.put<Education>(updateUrlEducation, education, {responseType: "text" as "json"}).pipe(
      tap(() => {
         this.refresh$.next();       
      })
    );
  }

  insertEducation(education: Education): Observable<Education>{
    return this.http.post<Education>(this.apiEducation, education);
  }

  insertEducationPersona(idPersona: number, education: Education): Observable<Education>{
    return this.http.post<Education>(this.apiEducationPersona+"/"+idPersona, education);
  }

  deleteEducation(education: Education): Observable<Education>{
    const deleteUrl = `${this.apiEducation}/${education.id}`
    return this.http.delete<Education>(deleteUrl, {responseType: "text" as "json"});
  }
  
}
