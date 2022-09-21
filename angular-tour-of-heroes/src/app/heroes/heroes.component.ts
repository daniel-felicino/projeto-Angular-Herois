import { MessageService } from './message.service';
import { HeroService } from './../../hero.service';
import { Hero } from 'src/app/Herointerface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes',
  // selector: 	O seletor de elemento CSS do componente, corresponde ao nome do elemento 
  // HTML que identifica esse componente no modelo de um componente pai.
  templateUrl: './heroes.component.html',
  //templateUrl: A localização do arquivo de modelo do componente.
  styleUrls: ['./heroes.component.css']
  //styleUrls: A localização dos estilos CSS privados do componente.
})
export class HeroesComponent implements OnInit {

  selectedHero?: Hero;

  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}