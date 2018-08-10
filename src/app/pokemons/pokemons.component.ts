import { Component, OnInit } from '@angular/core';

import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {

  pokemonsFull: Pokemon[];
  pokemonsFiltered: Pokemon[];
  pokemonsDisplayed: Pokemon[];

  currentSearch: string;
  currentPage: number;
  totalPages: number;
  ITEMS_PER_PAGE = 20;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.currentSearch = "";
    this.currentPage = 1;
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemons()
      .subscribe(pokemons => {
        this.pokemonsFull = pokemons;
        this.updateFilteredPokemons();
      });
  }

  updateFilteredPokemons(): void {
    this.pokemonsFiltered =
      this.pokemonsFull
        .filter((pokemon) => pokemon.name.match(new RegExp(this.currentSearch, 'i')));

    this.updateDisplayedPokemons();
  }

  updateDisplayedPokemons(): void {
    this.totalPages = Math.ceil(this.pokemonsFiltered.length / this.ITEMS_PER_PAGE);

    if (this.currentPage < 1) this.currentPage = 1;
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;

    this.pokemonsDisplayed =
      this.pokemonsFiltered
        .slice((this.currentPage-1) * this.ITEMS_PER_PAGE)
        .slice(0, this.ITEMS_PER_PAGE);
  }

  nextPage(): void {
    this.currentPage = this.currentPage + 1;
    this.updateDisplayedPokemons();
  }

  previousPage(): void {
    this.currentPage = this.currentPage - 1;
    this.updateDisplayedPokemons();
  }

  search(keyword: string) {
    this.currentSearch = keyword;
    this.updateFilteredPokemons();
  }

}
