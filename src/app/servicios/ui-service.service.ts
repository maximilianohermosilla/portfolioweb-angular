import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  private showLogin: boolean = true;
  private showAbout: boolean = true; 
  private showPortfolio: boolean = true;
  private showExperience: boolean = true; 
  private showEducation: boolean = true; 
  private showSkills: boolean = true; 
  private showProjects: boolean = true; 

  private editAbout: boolean = false; 
  private editExperience: boolean = false; 
  private editEducation: boolean = false; 
  private editSkills: boolean = false; 
  private editProjects: boolean = false; 

  private subject$ = new Subject<any>();
  private subjectPortfolio$ = new Subject<any>();
  private subjectAbout$ = new Subject<any>();
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

  toggleAbout(): void{
    this.showAbout = !this.showAbout;
    this.subjectAbout$.next(this.showPortfolio);
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


  toggleEditAbout(){
    this.editAbout = !this.editAbout;
  }

  toggleEditExperience(){
    this.editExperience = !this.editExperience;
  }

  toggleEditEducation(): void{
    this.editEducation = !this.editEducation;
  }

  toggleEditSkills(): void{
    this.editSkills = !this.editSkills;
  }

  toggleEditProjects(): void{
    this.editProjects = !this.editProjects;
  }



  public get getEditAbout(): boolean {
    return this.editAbout;
  }

  public get getEditExperience(): boolean {
    return this.editExperience;
  }

  public get getEditEducation(): boolean {
    return this.editEducation;
  }

  public get getEditSkills(): boolean {
    return this.editSkills;
  }

  public get getEditProjects(): boolean {
    return this.editProjects;
  }



  public get getShowAbout(): boolean {
    return this.showAbout;
  }

  public get getShowExperience(): boolean {
    return this.showExperience;
  }

  public get getShowEducation(): boolean {
    return this.showEducation;
  }

  public get getShowSkills(): boolean {
    return this.showSkills;
  }

  public get getShowProjects(): boolean {
    return this.showProjects;
  }
  
  


  onToggleSession(): Observable<any>{
    return this.subject$.asObservable();
  }

  onTogglePortfolio(): Observable<any>{
    return this.subjectPortfolio$.asObservable();
  }

  onToggleAbout(): Observable<any>{
    return this.subjectAbout$.asObservable();
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
