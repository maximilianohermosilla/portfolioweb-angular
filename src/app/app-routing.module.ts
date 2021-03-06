import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './servicios/guard.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [  
  {path: '', component:LoginComponent },
  {path: 'login', component:LoginComponent },
  {path: 'portfolio', component:PortfolioComponent, canActivate: [GuardGuard] }, 
  {path: '404', component:NotfoundComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,    
    //RouterModule.forRoot(routes, {enableTracing: true})
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
