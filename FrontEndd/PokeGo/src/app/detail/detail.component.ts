import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from '../model/pokemon.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  pokeState ={
    pokemonId: '',
    pokeName: '',
    pokeType: [],
    pokeImage: '',
    moves: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    baseExperience: '',
    height: '',
    weight: '',
    abilities: [],

  }

  pokemon: Pokemon = {
    id: '',
    number: 0,
    pokemonId: '',
    image: '',
    name: ''
  };


  ngOnInit(): void {
  }

  


  constructor(private pokemonService: PokemonService, private activatedRouter: ActivatedRoute) {
    this.activatedRouter.params.subscribe(
      params => {
        this.getPokemonDetail(params['id']);
      }
    );
  }

  getPokemonDetail(id:any){

    this.pokemonService.getPokedex(id).subscribe(
      res =>  {
          this.pokeState = res;
          this.pokeState.weight = res.weight;
          this.pokeState.height = res.height;
          this.pokeState.pokemonId = res.id;
          this.pokeState.abilities = res.abilities[0].ability.name;
          this.pokeState.hp = res.stats[0].base_stat;
          this.pokeState.attack = res.stats[1].base_stat;
          this.pokeState.defense = res.stats[2].base_stat;
          this.pokeState.pokeName = res.name;
          this.pokeState.pokeType = res.types.map((t: { type: { name: any; }; }) => t.type.name.toUpperCase());
          this.pokeState.pokeImage = res.sprites.front_default;
          this.pokeState.moves = res.moves[0].move.name;
          this.pokeState.baseExperience = res.base_experience;
          this.pokeState.weight = res.weight;
          this.pokeState.height = res.height;
          this.pokeState.speed = res.stats[3].base_stat;
          console.log(this.pokeState.pokeType);
      },
      err => {
        console.log(err);
      }

    );

  }

  saveToMyPokemon () : void{
    const data = {
      number: 0,
      pokemonId: this.pokeState.pokemonId,
      image: this.pokeState.pokeImage,
      name: this.pokeState.pokeName
    };

    let randomNumber =  Math.floor(Math.random()*2);
    if(randomNumber == 1){
      this.pokemonService.savePokemon(data).subscribe(
        res => {
          console.log('Success: ' + randomNumber)
        },
        err => {
          console.log(err);
        }


      );
      alert('Pokemon added successfuly')
      window.location.reload();
    }
    else{
      alert('Failed')
    }


    console.log(randomNumber);

  }

}
