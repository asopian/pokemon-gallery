import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  // ---------- Remote URL
  // private pokeapiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
  // private pokeapiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20"';  // paging
  // private pokeapiUrl = 'https://pokeapi.co/api/v2/pokemon/1/';  // Pokemon detail

  // ---------- Local URL
  // private pokeapiUrl = 'assets/pokeapi_151.json';
  private pokeapiUrl = 'assets/pokeapi_949.json';

  constructor(private http: HttpClient) { }



  /** GET pokemons from the server */
  getPokemons(): Observable<Pokemon[]> {

    const convertToPokemonArray = map((value: any) => {
        var objList = value['results'];
        var pokemons = objList.map( (pokemon: {url: string, name: string}) => {
          return new Pokemon( pokemon.url, pokemon.name);
        });
        return pokemons;
      });

    return convertToPokemonArray(this.http.get<any>(this.pokeapiUrl)
      .pipe(
        catchError(this.handleError('getPokemons', []))
      ));
  }

  getImageUrlPrefix(): string {
    if (this.pokeapiUrl?.startsWith('http')) {
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
    } else if (this.pokeapiUrl?.startsWith('assets')) {
      return 'assets/images';
    } else {
      return 'unsupported_pokeapiUrl';
    }
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(operation + ': ' + error); // log to console

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
