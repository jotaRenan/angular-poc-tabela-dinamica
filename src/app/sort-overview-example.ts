import {Component, Type} from '@angular/core';
import {Sort} from '@angular/material';
import {  CelulaTextoColoridaComponent} from './celula-texto-colorida/celula-texto-colorida.component';
import { ComponenteInjetavelComConteudo } from './componente-injetavel-com-conteudo';
import { CelulaTextoComponent } from './celula-texto/celula-texto.component';

export interface Dessert {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
  brands: { [qty: string]: number}[];
}

export interface ConfigColuna<K> {
  valorExibicao?: string;
  sortHeaderName?: string;
  componenteCelula?: Type<ComponenteInjetavelComConteudo>;
  funcaoAtribuicao?: (referenciaComponente: ComponenteInjetavelComConteudo, conteudo: K) => void,

}

export class Coluna<K> {
  public nome: string;
  public sortHeader: string;
  public componenteCelula: Type<ComponenteInjetavelComConteudo>;
  public funcaoAtribuicao: (referenciaComponente: ComponenteInjetavelComConteudo, conteudo: K) => void;

  constructor(
    nome: string, 
    {
      funcaoAtribuicao = (referenciaComponente: ComponenteInjetavelComConteudo, conteudo: K) => referenciaComponente.conteudoExibicao = conteudo,
      sortHeaderName = nome, 
      componenteCelula = <Type<ComponenteInjetavelComConteudo>>CelulaTextoColoridaComponent
    } = <ConfigColuna<K>>{}
  ) {
    this.nome = nome;
    this.sortHeader = sortHeaderName;
    this.funcaoAtribuicao = funcaoAtribuicao;
    this.componenteCelula = componenteCelula;
  }

}

/**
 * @title Sorting overview
 */
@Component({
  selector: 'sort-overview-example',
  templateUrl: 'sort-overview-example.html',
  styleUrls: ['sort-overview-example.css'],
})
export class SortOverviewExample {
  desserts: Dessert[] = //new Array(1000).fill({name: 'Frozen yogurt', calories: 159, fat: 6, carbs: 24, protein: 4});
    [
      {name: 'Frozen yogurt', calories: 159, fat: 6, carbs: 24, protein: 4, brands: [ {qty: 10}, {qty: 8}]},
      {name: 'Ice cream sandwich', calories: 237, fat: 9, carbs: 37, protein: 4, brands: [ {qty: 1}, {qty: 3}]},
      {name: 'Eclair', calories: 262, fat: 16, carbs: 24, protein: 6, brands: [ {qty: 7}, {qty: 8}]},
      {name: 'Cupcake', calories: 305, fat: 4, carbs: 67, protein: 4, brands: [ {qty: 3}, {qty: 11}]},
      {name: 'Gingerbread', calories: 356, fat: 16, carbs: 49, protein: 4, brands: [ {qty: 7}, {qty: 8}]},
    ];

  public nomesColunas = ['nome','calorias','gordura','carboidratos','proteinas',];

  public atributoExibicaoColuna = {
    nome: 'name',
    calorias: 'calories',
    gordura: 'fat',
    carboidratos: 'carbs',
    proteinas: 'protein',
  };
  
  public readonly colunas = this.atribuirColunas();

  sortedData: Dessert[];

  constructor() {
    this.sortedData = this.desserts.slice();
  }

  sortData(sort: Sort) {
    const data = this.desserts.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = [...data].sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      if (sort.active.includes('marca')) {
        const indice = Number(sort.active.replace(/marca/g,''));
        return compare(a.brands[indice].qty, b.brands[indice].qty, isAsc);
      }
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'calories': return compare(a.calories, b.calories, isAsc);
        case 'fat': return compare(a.fat, b.fat, isAsc);
        case 'carbs': return compare(a.carbs, b.carbs, isAsc);
        case 'protein': return compare(a.protein, b.protein, isAsc);
        default: return 0;
      }
    });
  }

  public atribuirColunas() {
    const obterComponenteCelula: () => Type<ComponenteInjetavelComConteudo> = () => Math.random() > 0.4 ? CelulaTextoComponent : CelulaTextoColoridaComponent;

    const quantidadeMarcas = 2;

    const colunas =  [
      new Coluna(this.nomesColunas[0], {componenteCelula: obterComponenteCelula()}),
      new Coluna(this.nomesColunas[1], {componenteCelula: obterComponenteCelula()}),
      new Coluna(this.nomesColunas[2], {componenteCelula: obterComponenteCelula()}),
      new Coluna(this.nomesColunas[3], {componenteCelula: obterComponenteCelula()}),
      new Coluna(this.nomesColunas[4], {componenteCelula: obterComponenteCelula()}),
      
    ];

    const colunasMarcas = new Array(quantidadeMarcas)
      .fill(undefined)
      .map( (_a, indice) => {
        
        return new Coluna(`Marca ${indice}`, {componenteCelula: obterComponenteCelula(), sortHeaderName: `marca${indice}`});
      });
    return [...colunas, ...colunasMarcas];
  }

}



function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */