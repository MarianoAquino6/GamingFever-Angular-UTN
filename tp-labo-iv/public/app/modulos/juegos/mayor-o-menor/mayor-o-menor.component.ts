import { Component } from '@angular/core';

@Component({
  selector: 'app-mayor-o-menor',
  standalone: false,
  templateUrl: './mayor-o-menor.component.html',
  styleUrl: './mayor-o-menor.component.css'
})
export class MayorOMenorComponent {
  ronda: number = 1;
  vidas: number = 3;
  puntaje: number = 0;
  cartasOrdenadasRandom!: number[];
  resultado!: boolean;

  constructor() { }

  ngOnInit() {
    this.generarCartasOrdenadasRandom();
  }

  generarCartasOrdenadasRandom() {
    this.cartasOrdenadasRandom = Array.from({ length: 10 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    console.log("ORDEN: " + this.cartasOrdenadasRandom);
  }

  comprobarMayorOMenor(mayorOMenor: number): boolean {
    this.resultado = false;

    switch (mayorOMenor) {
      case 0:
        if (this.cartasOrdenadasRandom[this.ronda] < this.cartasOrdenadasRandom[this.ronda-1]) {
          this.resultado = true;
        }

        break;
      case 1:
        if (this.cartasOrdenadasRandom[this.ronda] > this.cartasOrdenadasRandom[this.ronda-1]) {
          this.resultado = true;
        }

        break;
    }

    if (!this.resultado) {
      this.vidas--;
    }
    else {
      this.puntaje++;
    }

    this.ronda++;

    return this.resultado;
  }

  volverAIntentar() {
    this.ronda = 1;
    this.vidas = 3;
    this.puntaje = 0;
    this.generarCartasOrdenadasRandom();
  }
}
