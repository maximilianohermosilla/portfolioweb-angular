import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Experience } from '../models/experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  
  private _refresh$ = new Subject<void>();

    private apiExperience = 'http://localhost:8080/experience'

  constructor(private http:HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  getExperiencia(): Observable<Experience[]>{
    //return this.http.get<Experience[]>(this.urlExperience);
    return this.http.get<Experience[]>(this.apiExperience).pipe(
      tap(() => {
         this._refresh$.next();       
      })
    )
  } 

  updateExperience(experience: Experience): Observable<Experience>{
    const updateUrl = `${this.apiExperience}/${experience.id}`
    return this.http.put<Experience>(updateUrl, experience, {responseType: "text" as "json"}).pipe(
      tap(() => {
         this.refresh$.next();       
      })
    );
  }

  insertExperience(experience: Experience): Observable<Experience>{
    return this.http.post<Experience>(this.apiExperience, experience);
  }

  deleteExperience(experience: Experience): Observable<any>{
    const deleteUrl = `${this.apiExperience}/${experience.id}`
    return this.http.delete<Experience>(deleteUrl, {responseType: "text" as "json"});
  }


}

