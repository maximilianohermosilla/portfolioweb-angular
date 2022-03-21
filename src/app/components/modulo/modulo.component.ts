import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/models/experience';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.css']
})
export class ModuloComponent implements OnInit {

  constructor(private servPortfolio: PortfolioService) { }

  ngOnInit(): void {
  }

  

}
