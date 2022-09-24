import { InMemoryDataService } from './../in-memory-data.service';
import { DashboardComponent } from './heroes/dashboard/dashboard.component';
import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';
import { MessagesComponent } from './heroes/messages/messages.component';
import { HttpClientModule } from '@angular/common/http'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HeroSearchComponent } from 'src/hero-search/hero-search.component';

@NgModule
  //  NgModule vinculação de dados bidirecional com a ngModeldiretiva.
  ({
    declarations: [
      AppComponent,
      DashboardComponent,
      HeroesComponent,
      HeroDetailComponent,
      MessagesComponent,
      HeroSearchComponent
      
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      HttpClientInMemoryWebApiModule.forRoot(
        InMemoryDataService, { dataEncapsulation: false }
      )
  

      // FormsModuleno AppModule para que o Angular reconheça e aplique a ngModel diretiva.
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
export class AppModule { }
