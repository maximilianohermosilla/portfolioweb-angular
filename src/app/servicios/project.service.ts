import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private _refresh$ = new Subject<void>();

  private urlProjects = 'http://localhost:8080/project'


  constructor(private http:HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  getProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(this.urlProjects).pipe(
      tap(() => {
         this._refresh$.next();       
      })
    )
  } 

  updateProject(project: Project): Observable<Project>{
    const updateUrlProjects = `${this.urlProjects}/${project.id}`
    return this.http.put<Project>(updateUrlProjects, project, {responseType: "text" as "json"}).pipe(
      tap(() => {
         this.refresh$.next();       
      })
    );
  }

  insertProject(project: Project): Observable<Project>{
    return this.http.post<Project>(this.urlProjects, project);
  }

  deleteProject(project: Project): Observable<Project>{
    const deleteUrl = `${this.urlProjects}/${project.id}`
    return this.http.delete<Project>(deleteUrl, {responseType: "text" as "json"});
  }
}
