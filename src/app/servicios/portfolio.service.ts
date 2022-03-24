import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, } from 'rxjs';
import { Chart } from 'chart.js';
import { Portfolio } from '../models/portfolio';
import { PORTFOLIOS } from '../models/mock-portfolio';
import { Skill } from '../models/skill';
import { Experience } from '../models/experience';
import { tap } from 'rxjs/operators'
import { Education } from '../models/education';
import { Project } from '../models/project';

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

  private url= 'https:localhost:5001/'
  private apiUrl = 'http://localhost:5001/portfolio'
  private urlExperience = 'http://localhost:5001/experience'
  private urlEducation = 'http://localhost:5001/education'
  private urlSkills = 'http://localhost:5001/skills'
  private urlProjects = 'http://localhost:5001/projects'


  constructor(private http:HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  obtenerDatos(): Observable<any>{
    return this.http.get(this.apiUrl).pipe(
      tap(() => {
         this._refresh$.next();       
      })
    )
  }

  //---PORTFOLIO---//

  getPortfolio(): Observable<Portfolio>{
    return this.http.get<Portfolio>(this.apiUrl).pipe(
      tap(() => {
         this._refresh$.next();       
      })
    )
  }

  updatePortfolio(portfolio: Portfolio): Observable<Portfolio>{
    const url = `${this.apiUrl}/${portfolio.id}`
    return this.http.put<Portfolio>(this.apiUrl, portfolio, httpOptions);
  }

  //---EXPERIENCIA---//

  getExperiencia(): Observable<Experience[]>{
    return this.http.get<Experience[]>(this.urlExperience);
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

  //---EDUCATION---//


  getEducation(): Observable<Education[]>{
    return this.http.get<Education[]>(this.urlEducation);
  } 

  updateEducation(education: Education): Observable<Education>{
    const updateUrlEducation = `${this.urlEducation}/${education.id}`
    return this.http.put<Education>(updateUrlEducation, education, httpOptions);
  }

  insertEducation(education: Education): Observable<Education>{
    return this.http.post<Education>(this.urlEducation, education, httpOptions);
  }

  deleteEducation(education: Education): Observable<Education>{
    const deleteUrl = `${this.urlEducation}/${education.id}`
    return this.http.delete<Education>(deleteUrl);
  }


  //---SKILLS---//


  getSkills(): Observable<Skill[]>{
    return this.http.get<Skill[]>(this.urlSkills);
  }

  updateSkill(skill: Skill){
    const updateUrl = `${this.urlSkills}/${skill.id}`
    return this.http.put<Skill>(updateUrl, skill, httpOptions).pipe(
        tap(() => {
           this._refresh$.next();       
        })
      )
  }

  insertSkill(skill: Skill): Observable<Skill>{
    console.log("insert servicio", skill);
    return this.http.post<Skill>(this.urlSkills, skill, httpOptions);
  }

  deleteSkill(skill: Skill): Observable<Skill>{
    const deleteUrl = `${this.urlSkills}/${skill.id}`
    return this.http.delete<Skill>(deleteUrl);
  }


  //---PROJECTS---//


  getProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(this.urlProjects);
  } 

  updateProject(project: Project): Observable<Project>{
    const updateUrlProjects = `${this.urlProjects}/${project.id}`
    return this.http.put<Project>(updateUrlProjects, project, httpOptions);
  }

  insertProject(project: Project): Observable<Project>{
    return this.http.post<Project>(this.urlProjects, project, httpOptions);
  }

  deleteProject(project: Project): Observable<Project>{
    const deleteUrl = `${this.urlProjects}/${project.id}`
    return this.http.delete<Project>(deleteUrl);
  }


}
