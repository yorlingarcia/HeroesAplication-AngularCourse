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
  heroeSelccionado!: Heroe;

  constructor(private heroesService: HeroesService) {}

  buscando() {
    this.heroesService.getSugerencias(this.termino).subscribe((heroes) => {
      this.heroes = heroes;
    });
  }

  opcionSelecionada(event: MatAutocompleteSelectedEvent) {
    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;
    //this.heroeSelccionado = heroe;
    if (this.heroes.length < 1) {
      return;
    }
    this.heroesService
      .getHeroePorId(heroe.id!)
      .subscribe((heroe) => (this.heroeSelccionado = heroe));
  }
}
