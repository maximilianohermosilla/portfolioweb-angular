import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, Subject } from 'rxjs';
import { Education } from '../models/education';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private _refresh$ = new Subject<void>();

    private apiEducation = 'http://localhost:8080/education'

  constructor(private http:HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  getEducation(): Observable<Education[]>{
    //return this.http.get<Education[]>(this.urlEducation);
    return this.http.get<Education[]>(this.apiEducation).pipe(
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

  deleteEducation(education: Education): Observable<Education>{
    const deleteUrl = `${this.apiEducation}/${education.id}`
    return this.http.delete<Education>(deleteUrl, {responseType: "text" as "json"});
  }
  
}
