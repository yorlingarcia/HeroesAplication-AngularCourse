import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [],
})
export class BuscarComponent {
  termino: string = '';
  heroes: Heroe[] = [];
  heroeSelccionado: Heroe | undefined;

  constructor(private heroesService: HeroesService) {}

  buscando() {
    this.heroesService
      .getSugerencias(this.termino.trim())
      .subscribe((heroes) => {
        this.heroes = heroes;
      });
  }

  opcionSelecionada(event: MatAutocompleteSelectedEvent) {
    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;
    //this.heroeSelccionado = heroe;
    if (this.heroes.length < 1) {
      console.log('No hay ningun valor');
      this.heroeSelccionado = undefined;
      return;
    }
    this.heroesService
      .getHeroePorId(heroe.id!)
      .subscribe((heroe) => (this.heroeSelccionado = heroe));
  }
}
