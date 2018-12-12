import { Component, OnInit } from '@angular/core';
import { ComponenteInjetavelComConteudo } from '../componente-injetavel-com-conteudo';
@Component({
  selector: 'app-celula-texto',
  templateUrl: './celula-texto.component.html',
  styleUrls: ['./celula-texto.component.css']
})
export class CelulaTextoComponent implements OnInit, ComponenteInjetavelComConteudo<string> {  
  public conteudoExibicao: string;
  constructor() {
  }

  ngOnInit() {
  }

}