import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-redius: 5px;
      }
    `,
  ],
})
export class AgregarComponent implements OnInit {
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

  constructor(
    private heroesServices: HeroesService,
    private activateRouted: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (!this.router.url.includes('editar')) {
      return;
    }
    this.activateRouted.params
      .pipe(switchMap(({ id }) => this.heroesServices.getHeroePorId(id)))
      .subscribe((heroe) => (this.heroe = heroe));
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      //actualizar
      this.heroesServices
        .actualizarHeroe(this.heroe)
        .subscribe((heroe) => console.log('Actualizando', heroe));
    } else {
      //crear nuevo registro
      this.heroesServices
        .agregarHeroe(this.heroe)
        .subscribe((heroe) =>
          this.router.navigate(['/heroes/editar', heroe.id])
        );
    }
  }

  borrar() {
    this.heroesServices.eliminarHeroe(this.heroe.id!).subscribe((resp) => {
      this.router.navigate(['/heroes']);
    });
  }
}
