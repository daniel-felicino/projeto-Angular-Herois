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
      // A corrente HeroService.getHeroes()usa a função RxJS of()para retornar uma
      // matriz de heróis simulados como um arquivo Observable<Hero[]>.
      //Você trocou of()por http.get()e o aplicativo continua funcionando sem
      //nenhuma outra alteração porque ambas as funções retornam um arquivo Observable<Hero[]>.
      .pipe(
        tap(_ => this.log('heróis buscados')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
    //get significa : obtenha resposta
    //post significa : publica resposta
    // O handleError()método relata o erro e, em seguida,
    // retorna um resultado inócuo para que o aplicativo continue funcionando.
  }
  ;
  getHero(id: number): Observable<Hero> {
    //GET herói por id. Será erro 404 se o id não for encontrado
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
    .pipe(
      tap(_ => this.log(`heróis buscados id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  searchHeroes(term: string): Observable<Hero[]> {
    // GET heróis cujo nome contém o termo de pesquisa
    if (!term.trim()) {
      // se não for o termo de pesquisa, retorna o array hero vazio.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`heróis encontrados  "${term}"`) :
        this.log(`nenhum herói ${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
  addHero(hero: Hero): Observable<Hero> {
    // POST: adiciona um novo herói ao servidor
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  deleteHero(id: number): Observable<Hero> {
    // DELETE: exclua o herói do servidor

    const url = `${this.heroesUrl}/${id}`;
    // Constrói uma solicitação DELETE que interpreta o corpo como JSON e
    // retorna a resposta em um determinado tipo.
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  updateHero(hero: Hero): Observable<any> {
    // PUT: atualiza o herói no servidor
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
    .pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

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

// Você pode reescrever getHero()como um Http pedido real sem precisar alterar o
// HeroDetailComponen que o chama.

// Comunicação assíncrona é aquela que não acontece em tempo
// real. O emissor envia a mensagem e o receptor pode acessá-la
// e respondê-la quando desejar ou puder.

// Na comunicação síncrona, os participantes da conversa atuam
// simultaneamente, enviando e recebendo mensagens em tempo
//  real imediatamente. Já a assíncrona ocorre de acordo
//  com a disponibilidade do receptor de responder a
//  mensagem do emissor, com a compreensão dos envolvidos
//  que não será imediato.
