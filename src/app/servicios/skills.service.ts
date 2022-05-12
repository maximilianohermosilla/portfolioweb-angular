import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private _refresh$ = new Subject<void>();

  //private urlSkills = 'http://localhost:8080/skill'
  //private urlSkillsPersona = 'http://localhost:8080/skillPersona'

  private urlSkills = 'https://limitless-gorge-37634.herokuapp.com/skill'
  private urlSkillsPersona = 'https://limitless-gorge-37634.herokuapp.com/skillPersona'


  constructor(private http:HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  getSkills(): Observable<Skill[]>{
    return this.http.get<Skill[]>(this.urlSkills).pipe(
      tap(() => {
         this._refresh$.next();       
      })
    )
  } 

  getSkillsPortfolio(idPersona: Number): Observable<Skill[]>{
    return this.http.get<Skill[]>(this.urlSkillsPersona+"/"+idPersona).pipe(
      tap(() => {
         this._refresh$.next();       
      })
    )
  } 
  

  updateSkill(skill: Skill){
    const updateUrl = `${this.urlSkills}/${skill.id}`
    return this.http.put<Skill>(updateUrl, skill, {responseType: "text" as "json"}).pipe(
      tap(() => {
         this.refresh$.next();       
      })
    );
  }

  insertSkill(idPersona: number, skill: Skill): Observable<Skill>{
    //console.log("insert servicio", skill);
    return this.http.post<Skill>(this.urlSkillsPersona+"/"+idPersona, skill);
  }

  deleteSkill(skill: Skill): Observable<Skill>{
    const deleteUrl = `${this.urlSkills}/${skill.id}`
    return this.http.delete<Skill>(deleteUrl, {responseType: "text" as "json"});
  }

}
