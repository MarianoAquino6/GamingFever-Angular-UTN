import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, orderBy, where, query } from '@angular/fire/firestore';
import { AuthService } from '../../../auth/auth.service';
import Swal from 'sweetalert2';
import { Observable, Subscription } from 'rxjs';

interface Puntaje {
  usuario: string | null;
  puntaje: number;
  fecha: string;
}

@Component({
  selector: 'app-mayor-o-menor',
  standalone: false,
  templateUrl: './mayor-o-menor.component.html',
  styleUrl: './mayor-o-menor.component.css'
})

export class MayorOMenorComponent {
  vidas: number = 3;
  puntaje: number = 0;
  deckId: string = '';
  cartaActual: any;
  cartaAnterior: any;
  jugador: string | null = null;
  derrota: boolean = false;
  sub!: Subscription;
  topPuntajes: Puntaje[] = [];

  constructor(private http: HttpClient, private firestore: Firestore, private auth: AuthService) {}

  ngOnInit() {
    this.obtenerNuevoMazo();
    this.auth.usuarioLogueado$.subscribe((usuario) => {this.jugador = usuario})
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
      this.verificarDerrota();
    }

    if (this.vidas > 0) {
      this.dibujarCarta(); // Dibujo la siguiente carta
    }

    if (this.derrota)
    {
      this.guardarPuntaje();
      this.mostrarMensajePuntajeGuardado();
      this.obtenerTop5();
    }
  }

  guardarPuntaje()
  {
    // Referencio la colección
    let col = collection(this.firestore, 'puntajes');
    // Referencio el futuro objeto que agregaré a la colección
    let obj = { 
      fecha: new Date(), 
      "user": this.jugador,
      "juego": "Mayor o Menor",
      "puntaje": this.puntaje
    };
    // Agrego el objeto a la colección
    addDoc(col, obj)
  }

  mostrarMensajePuntajeGuardado()
  {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Exitoso',
      text: `Su puntaje ha sido guardado!`,
      showConfirmButton: false,
      timer: 2500,
      background: '#333', 
      color: '#fff', 
      iconColor: '##28a745', 
      customClass: {
        popup: 'colored-toast'
      }
    });
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

  verificarDerrota() {
    if (this.vidas === 0) {
      this.derrota = true;
    }
  }

  obtenerTop5() {
    // Referencio la colección
    let col = collection(this.firestore, 'puntajes');

    // Armo la query sin el límite
    const filteredQuery = query(
      col,
      where('juego', '==', 'Mayor o Menor'),
      orderBy('puntaje', 'desc')
    );

    // Creo un observable para la respuesta de la query
    const observable: Observable<any[]> = collectionData(filteredQuery, { idField: 'id' });

    // Me suscribo al observable
    this.sub = observable.subscribe((respuesta: any[]) => {
      // Filtrar para obtener solo los primeros 10 elementos
      this.topPuntajes = respuesta.slice(0, 5).map(puntaje => ({
        usuario: puntaje.user,
        puntaje: puntaje.puntaje,
        fecha: this.formatFecha(puntaje.fecha.toDate())
      }));
    });

    console.log(this.topPuntajes);
  }

  formatFecha(fecha: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    return fecha.toLocaleString('es-ES', options);
  }

  volverAIntentar() {
    // Reseteo los valores del juego y obtengo un nuevo mazo
    this.derrota = false;
    this.vidas = 3;
    this.puntaje = 0;
    this.obtenerNuevoMazo();
  }
}
