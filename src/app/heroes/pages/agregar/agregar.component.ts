import { Component } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [],
})
export class AgregarComponent {
  heroe: Heroe = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
  };

  publishers = [
    {
      id: 'DC Comics',
      desc: 'Dc - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  constructor(private heroesServices: HeroesService) {}

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    this.heroesServices
      .agregarHeroe(this.heroe)
      .subscribe((heroe) => console.log('Respuesta: ', heroe));
  }
}
