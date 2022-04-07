import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [  
  {path: 'login', component:LoginComponent },
  {path: 'portfolio', component:PortfolioComponent },
  {path: '', component:LoginComponent },
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
