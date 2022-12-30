import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../model/pokemon.model';
import { Observable } from 'rxjs';

const apiUrl = 'http://localhost:8080/api/poke';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  constructor(private http : HttpClient) { }

  getPokedex(index : any){
    return this.http.get<any>(`${baseUrl}/pokemon/${index}`);
  }
  
  savePokemon(data : any): Observable<any> {
    return this.http.post(apiUrl,data)
  }

  getAllMyPokemon():Observable<Pokemon[]>{
    return this.http.get<Pokemon[]>(apiUrl)
  }

  deleteMyPokemon(id : any):Observable<any>{
    return this.http.delete(`${apiUrl}/${id}`)
  }

  renameMyPokemon(id : any, data:any):Observable<any>{
    return this.http.put(`${apiUrl}/${id}`,data)
  }

  


}
