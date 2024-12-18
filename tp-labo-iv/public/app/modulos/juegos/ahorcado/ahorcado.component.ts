import { Component } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  standalone: false,
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {
  palabrasDisponibles: string[] = [
    'VERANO', 'OTOÑO', 'INVIERNO', 'PRIMAVERA',
    'SOL', 'LUNA', 'ESTRELLA', 'GALAXIA',
    'MONTANA', 'RIO', 'MAR', 'OCEANO',
    'ARBOL', 'FLOR', 'PLANTA', 'JARDIN',
    'ANIMAL', 'PERRO', 'GATO', 'PAJARO',
    'FELIZ', 'TRISTE', 'SONRISA', 'RISA',
    'AMIGO', 'FAMILIA', 'CIELO', 'TIERRA',
    'AGUA', 'FUEGO', 'VIENTO', 'NIEVE',
    'CARNIVAL', 'FIESTA', 'BAILE', 'CANCION',
    'LIBRO', 'PELICULA', 'JUEGO', 'DIVERSION',
    'DIA', 'NOCHE', 'TIEMPO', 'HORA',
    'HOGAR', 'CAMA', 'COMIDA', 'BEBIDA',
    'MUSICA', 'ARTE', 'CULTURA', 'HISTORIA',
    'RUTA', 'CAMINO', 'AVION', 'TREN',
    'COSTUMBRES', 'TRADICIONES', 'VACACIONES', 'RECUERDOS'
  ];
  palabraAAdivinar!: string;
  palabraAAdivinarDescompuesta!: string[];
  cantidadErrores: number = 0;
  letras: string[] = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
  palabraExhibida!: string;
  victoria: boolean = false;
  puntaje: number = 0;
  letrasDescubiertas: string[] = [];

  constructor() { }

  ngOnInit() {
    this.elegirPalabraRandom();
    this.precargarImagenes();
  }

  precargarImagenes() {
    const imagenesAhorcado = [
      '/assets/img/ahorcado0.png',
      '/assets/img/ahorcado1.png',
      '/assets/img/ahorcado2.png',
      '/assets/img/ahorcado3.png',
      '/assets/img/ahorcado4.png',
      '/assets/img/ahorcado5.png',
      '/assets/img/ahorcado6.png',
    ];
  
    imagenesAhorcado.forEach((imagen) => {
      const img = new Image();
      img.src = imagen; // Esto hace que el navegador cargue la imagen sin mostrarla
    });
  }

  elegirPalabraRandom() {
    const randomIndex = Math.floor(Math.random() * this.palabrasDisponibles.length);
    this.palabraAAdivinar = this.palabrasDisponibles[randomIndex];
    console.log('Palabra a adivinar: ' + this.palabraAAdivinar);
    this.palabraAAdivinarDescompuesta = this.palabraAAdivinar.split('');

    // Creo una cadena con un guion bajo y un espacio por cada letra en la palabra a adivinar
    this.palabraExhibida = this.palabraAAdivinarDescompuesta.map(() => '_').join(' ');
  }

  comprobarExistenciaLetra(letra: string) {
    //Me fijo si la letra elegida esta en la palabra a adivinar
    if (!this.palabraAAdivinar.includes(letra)) {
      this.cantidadErrores++;
    }
    else {
      // Reemplazo la letra en palabraExhibida donde corresponda
      this.palabraExhibida = this.palabraAAdivinarDescompuesta.map((char, index) => {
        return char === letra ? letra : this.palabraExhibida.split(' ')[index];
      }).join(' ');

      if (!this.letrasDescubiertas.includes(letra))
      {
        this.letrasDescubiertas.push(letra);
        this.puntaje++;
      }

      //Compruebo la victoria
      this.verificarVictoria();
    }
  }

  verificarVictoria() {
    if (this.palabraExhibida.replace(/\s+/g, '') === this.palabraAAdivinar) {
      this.victoria = true;
    }
  }

  volverAIntentar(perdio: boolean) {
    this.cantidadErrores = 0;
    this.elegirPalabraRandom();
    this.victoria = false;
    this.letrasDescubiertas = [];

    if (perdio)
    {
      this.puntaje = 0;
    }
  }
}
