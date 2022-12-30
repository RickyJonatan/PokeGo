import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/shared/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DetailComponent } from './detail/detail.component';
import { MyPokemonComponent } from './my-pokemon/my-pokemon.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PokedexComponent,
    DetailComponent,
    MyPokemonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
