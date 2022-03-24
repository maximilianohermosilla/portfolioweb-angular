import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { LoginComponent } from './components/login/login.component';
import { PortfolioService } from './servicios/portfolio.service';
import { HttpClientModule } from '@angular/common/http'
import { Chart } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ButtonComponent } from './components/button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ModuloComponent } from './components/modulo/modulo.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModuloHeaderComponent } from './components/modulo-header/modulo-header.component';

const routes: Routes = [
  {path: '', component:HeaderComponent },
  //{path: 'login', component:LoginComponent },
  {path: 'portfolio', component:AppComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AcercaDeComponent,
    ExperienciaComponent,
    EducacionComponent,
    SkillsComponent,
    ProyectosComponent,
    LoginComponent,
    ButtonComponent,
    PortfolioComponent,
    ModuloComponent,
    FooterComponent,
    ModuloHeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgChartsModule,
    FormsModule,
    ColorPickerModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
