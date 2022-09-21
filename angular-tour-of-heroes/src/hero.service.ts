import { Injectable } from '@angular/core';
import { Hero } from './app/Herointerface';
import { HEROES } from './app/mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './app/heroes/message.service';
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }
  getHeroes(): Observable<Hero[]>{
    const heroes = of(HEROES)
    this.messageService.add('HeroService: heróis buscados');
    return heroes
  }
}
