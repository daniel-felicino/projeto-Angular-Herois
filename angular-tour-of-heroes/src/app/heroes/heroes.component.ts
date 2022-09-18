import { Component, OnInit } from '@angular/core';
import { Hero } from '../Herointerface';
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
 
hero = {
  id:1,
  name:"Windstorm"
}
  constructor() { }

  ngOnInit(): void {
    // ngOnInit: lógica de inicialização.
  }

}
