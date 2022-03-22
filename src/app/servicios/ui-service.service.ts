import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  private showLogin: boolean = false;
  private subject$ = new Subject<any>();

  constructor() { }

  toggleSession(): void{
    this.showLogin = !this.showLogin;
    this.subject$.next(this.showLogin);
  }

  onToggleSession(): Observable<any>{
    return this.subject$.asObservable();
  }
}
