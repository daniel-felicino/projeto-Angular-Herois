import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from './../../../hero.service';
import { Hero } from 'src/app/Herointerface';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);



    // A route.snapshot é uma imagem estática das informações da rota logo após 
    // a criação do componente.

    // O paramMap é um dicionário de valores de parâmetros de rota extraídos da URL. 
    // A "id"chave retorna o id do herói para buscar.

    // Os parâmetros de rota são sempre strings. A função JavaScript Number converte a 
    // string em um número, que é o que um herói id deve ser.
  }

  goBack():void{

this.location.back()

    //função voltar
  }
  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
}


// O ActivatedRoute contém informações sobre a rota para esta instância do 
// HeroDetailComponent. Este componente está interessado nos parâmetros da 
// rota extraídos da URL. O parâmetro "id" é o id do herói a ser exibido.

// O HeroService obtém dados de herói do servidor remoto e esse componente os 
// usa para obter o herói para exibição.

// O locationé um serviço Angular para interagir com o navegador. 
// Este serviço permite navegar de volta para a visualização anterior.

