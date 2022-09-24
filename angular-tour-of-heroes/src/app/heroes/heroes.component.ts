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
  heroes: Hero[] = [];


  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }


  getHeroes(): void {
    //recuperar os heróis do serviço.
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
    //método para enviar uma mensagem quando os heróis são buscados.

  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}