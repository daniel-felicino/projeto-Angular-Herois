import { preserveWhitespacesDefault } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  preserveWhitespaces: true
  // serve para dar espaço entre botoes 
})
export class AppComponent {
  title = 'Projeto Herois';
}
