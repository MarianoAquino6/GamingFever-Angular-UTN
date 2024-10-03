import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mayor-o-menor',
  standalone: false,
  templateUrl: './mayor-o-menor.component.html',
  styleUrl: './mayor-o-menor.component.css'
})

export class MayorOMenorComponent {
  vidas: number = 3;
  puntaje: number = 0;
  deckId: string = ''; // ID del mazo que recibo de la API
  cartaActual: any;
  cartaAnterior: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerNuevoMazo();
  }

  obtenerNuevoMazo() {
    // Llamo a la API para obtener un mazo nuevo. Me da un observable al cual me suscribo
    this.http.get('https://deckofcardsapi.com/api/deck/new/shuffle/')
      .subscribe((response: any) => {
        // La API me da en la response el ID del mazo
        this.deckId = response.deck_id; // Guardo el ID del mazo para luego usarlo en dibujar carta
        this.dibujarCarta(); // Dibujo la primera carta
      });
  }

  dibujarCarta() {
    // Llamo a la API para dibujar una carta del mazo. Me da un observable al cual me suscribo
    this.http.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`)
      .subscribe((response: any) => {
        // La carta que estaba en la ronda anterior la asigno a la variable "cartaAnterior"
        this.cartaAnterior = this.cartaActual;
        // Reemplazo la carta que estaba en la ronda anterior con la carta que me da el maso
        this.cartaActual = response.cards[0];
      });
  }

  // Eleccion puede ser 0 (Menor) o 1 (Mayor)
  comprobarMayorOMenor(eleccion: number) {
    // Si no hay una carta anterior (primera ronda), no hay nada que comparar
    if (!this.cartaAnterior) {
      this.dibujarCarta(); // Solo dibuja la primera carta
      return;
    }

    let valorActual = this.obtenerValorNumerico(this.cartaActual.value);
    let valorAnterior = this.obtenerValorNumerico(this.cartaAnterior.value);

    if ((eleccion === 0 && valorActual < valorAnterior) || (eleccion === 1 && valorActual > valorAnterior)) {
      this.puntaje++;
    } else {
      this.vidas--;
    }

    if (this.vidas > 0) {
      this.dibujarCarta(); // Dibujo la siguiente carta
    }
  }

  obtenerValorNumerico(valor: string): number {
    // Convierto el valor de la carta a su equivalente numérico
    switch (valor) {
      case 'ACE': return 1;
      case 'JACK': return 11;
      case 'QUEEN': return 12;
      case 'KING': return 13;
      default: return parseInt(valor); // Para las cartas del 2 al 10
    }
  }

  volverAIntentar() {
    // Reseteo los valores del juego y obtengo un nuevo mazo
    this.vidas = 3;
    this.puntaje = 0;
    this.obtenerNuevoMazo();
  }
}
