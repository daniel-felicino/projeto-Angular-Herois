import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeroesComponent } from './app/heroes/heroes.component';
import { DashboardComponent } from './app/heroes/dashboard/dashboard.component';
import { HeroDetailComponent } from './app/heroes/hero-detail/hero-detail.component';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent }
  //path	Uma string que corresponde ao URL na barra de endereço do navegador.
  //corresponda a um caminho para o arquivo
  //	O componente que o roteador deve criar ao navegar para esta rota.
  //O : caractere de dois pontos no path indica que :id é um espaço reservado 
  //para um herói específico id.

]
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  // O método é chamado forRoot()porque você configura o roteador no nível raiz do aplicativo. 
  // O forRoot()método fornece os provedores de serviço e as diretivas necessárias para o 
  // roteamento e realiza a navegação inicial com base na URL do navegador atual.



  exports: [RouterModule]
})
export class AppRoutingModule { }


//Primeiro, o app-routing.module.ts arquivo importa RouterModulee Routes,
// portanto, o aplicativo pode ter capacidade de roteamento. 
//  A próxima importação, HeroesComponent, dá ao roteador um lugar para ir 
//  depois de configurar as rotas.

// Rotas
// A próxima parte do arquivo (const routes: Routes) é onde você configura suas rotas.
// As rotas informam ao roteador qual visualização exibir quando 
// um usuário clica em um link ou cola um URL na barra de endereços do navegador.