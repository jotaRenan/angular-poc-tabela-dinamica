import { Component, OnInit } from '@angular/core';
import { ComponenteInjetavelComConteudo } from '../componente-injetavel-com-conteudo';

@Component({
  selector: 'app-celula-texto-colorida',
  templateUrl: './celula-texto-colorida.component.html',
  styleUrls: ['./celula-texto-colorida.component.css']
})
export class CelulaTextoColoridaComponent implements ComponenteInjetavelComConteudo, OnInit {
  conteudoExibicao: any;

  constructor() {
  }

  ngOnInit() {
  }

}