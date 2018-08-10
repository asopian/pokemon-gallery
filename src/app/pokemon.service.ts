import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokeapiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  constructor(private http: HttpClient) { }



  /** GET pokemons from the server */
  getPokemons (): Observable<Pokemon[]> {

    const convertToPokemonArray = map((value: Object) => {
        var objList = value['results'];
        var pokemons = objList.map( (pokemon, index) => {
          return new Pokemon( pokemon.url, pokemon.name, index+1 );
        });
        return pokemons;
      });

    return convertToPokemonArray(this.http.get<Object>(this.pokeapiUrl)
      .pipe(
        catchError(this.handleError('getPokemons', []))
      ));
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
