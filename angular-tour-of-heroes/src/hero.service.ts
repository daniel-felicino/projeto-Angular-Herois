import { Injectable } from '@angular/core';
import { Hero } from './app/Herointerface';
import { HEROES } from './app/mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './app/heroes/message.service';
@Injectable({
  //Injectable símbolo Angular e anota a classe com o decorador. 
  //Isso marca a classe como uma que participa do sistema de injeção de dependência . 
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }


  getHeroes(): Observable<Hero[]>{
    //getHeroes método para retornar os heróis simulados .
    const heroes = of(HEROES)
    this.messageService.add('HeroService: heróis buscados');
    return heroes
  };
  getHero(id: number): Observable<Hero> {
 
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
}
//O HeroService pode obter dados de heróis de qualquer lugar, 
//como um serviço da Web, armazenamento local ou uma fonte de dados simulada.

// Como getHeroes(), getHero()tem uma assinatura assíncrona. Ele retorna um herói
//  simulado como um Observable, usando a função RxJS of().

// Você pode reescrever getHero()como um Httppedido real sem precisar alterar o 
// HeroDetailComponentque o chama.