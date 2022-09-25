import { Hero } from 'src/app/Herointerface';
import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      // debounceTime(300)espera até que o fluxo de novos eventos de string seja pausado
      // por 300 milissegundos antes de passar a string mais recente.
      // As solicitações provavelmente não ocorrerão com mais frequência do que 300 ms.
      distinctUntilChanged(),
      // distinctUntilChanged()garante que uma solicitação seja enviada soment
      // se o texto do filtro for alterado.
      switchMap((term: string) => this.heroService.searchHeroes(term)),
      // switchMap()chama o serviço de pesquisa para cada termo de pesquisa que passa
      // por debounce()e distinctUntilChanged(). Ele cancela e descarta observáveis ​​de
      // pesquisa anteriores, retornando apenas o observável de serviço de pesquisa mais
      // recente
    );
  }
}
