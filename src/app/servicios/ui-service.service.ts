import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  private showLogin: boolean = false;
  private showPortfolio: boolean = true;
  private showExperience: boolean = true; 
  private showEducation: boolean = true; 
  private showSkills: boolean = true; 
  private showProjects: boolean = true; 

  private subject$ = new Subject<any>();
  private subjectPortfolio$ = new Subject<any>();
  private subjectExperience$ = new Subject<any>();
  private subjectEducation$ = new Subject<any>();
  private subjectSkills$ = new Subject<any>();
  private subjectProjects$ = new Subject<any>();

  constructor() { }

  toggleSession(): void{
    this.showLogin = !this.showLogin;
    this.subject$.next(this.showLogin);
  }


  togglePortfolio(): void{
    this.showPortfolio = !this.showPortfolio;
    this.subjectPortfolio$.next(this.showPortfolio);
  }

  toggleExperience(): void{
    this.showExperience = !this.showExperience;
    this.subjectExperience$.next(this.showExperience);
  }

  toggleEducation(): void{
    this.showEducation = !this.showEducation;
    this.subjectEducation$.next(this.showEducation);
  }

  toggleSkills(): void{
    this.showSkills = !this.showSkills;
    this.subjectSkills$.next(this.showSkills);
  }

  toggleProjects(): void{
    this.showProjects = !this.showProjects;
    this.subjectProjects$.next(this.showProjects);
  }

  onToggleSession(): Observable<any>{
    return this.subject$.asObservable();
  }
  

  onTogglePortfolio(): Observable<any>{
    return this.subjectPortfolio$.asObservable();
  }

  onToggleExperience(): Observable<any>{
    return this.subjectExperience$.asObservable();
  }

  onToggleEducation(): Observable<any>{
    return this.subjectEducation$.asObservable();
  }

  onToggleSkills(): Observable<any>{
    return this.subjectSkills$.asObservable();
  }

  onToggleProjects(): Observable<any>{
    return this.subjectProjects$.asObservable();
  }

  
}
