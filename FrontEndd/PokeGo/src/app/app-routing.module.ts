import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { DetailComponent } from './detail/detail.component';
import { MyPokemonComponent } from './my-pokemon/my-pokemon.component';

const routes: Routes = [
  {
    path: 'home', component : PokedexComponent
  },
  {
    path: 'pokemondetail/:id', component: DetailComponent
  },
  {
    path : 'mypokemon', component : MyPokemonComponent
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'home'
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'home'
  }


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
