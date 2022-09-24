import { MessageService } from './app/heroes/message.service';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './app/Herointerface';
@Injectable({
  //Injectable símbolo Angular e anota a classe com o decorador. 
  //Isso marca a classe como uma que participa do sistema de injeção de dependência . 
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  // Essa chamada específica para HttpClient.get()retorna
  // um Observable<Hero[]>, que é um observável de
  // matrizes de heróis . Na prática, ele retorna 
  // apenas um único array de heróis.

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('heróis buscados')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );


  }
  ;
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
//O HeroService pode obter dados de heróis de qualquer lugar,
//como um serviço da Web, armazenamento local ou uma fonte de dados simulada.

// Como getHeroes(), getHero()tem uma assinatura assíncrona. Ele retorna um herói
//  simulado como um Observable, usando a função RxJS of().

// Você pode reescrever getHero()como um Httppedido real sem precisar alterar o 
// HeroDetailComponentque o chama.

// Comunicação assíncrona é aquela que não acontece em tempo
// real. O emissor envia a mensagem e o receptor pode acessá-la
// e respondê-la quando desejar ou puder.

// Na comunicação síncrona, os participantes da conversa atuam
// simultaneamente, enviando e recebendo mensagens em tempo
//  real imediatamente. Já a assíncrona ocorre de acordo 
//  com a disponibilidade do receptor de responder a 
//  mensagem do emissor, com a compreensão dos envolvidos 
//  que não será imediato.