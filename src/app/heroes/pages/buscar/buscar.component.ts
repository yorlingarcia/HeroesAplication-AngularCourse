import { Component } from '@angular/core';
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

  constructor(private heroesService: HeroesService) {}

  buscando() {
    this.heroesService
      .getSugerencias(this.termino)
      .subscribe((heroes) => (this.heroes = heroes));
  }
}
