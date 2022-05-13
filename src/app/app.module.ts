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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgChartsModule } from 'ng2-charts';
import { ButtonComponent } from './components/button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ModuloComponent } from './components/modulo/modulo.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModuloHeaderComponent } from './components/modulo-header/modulo-header.component';
import { InterceptorService } from './servicios/interceptor.service';
import { AboutComponent } from './components/about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerService } from './servicios/spinner.service';


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
    AboutComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgChartsModule,
    FormsModule,
    ColorPickerModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [PortfolioService, 
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}, 
  //{ provide: HTTP_INTERCEPTORS, useClass: SpinnerService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
