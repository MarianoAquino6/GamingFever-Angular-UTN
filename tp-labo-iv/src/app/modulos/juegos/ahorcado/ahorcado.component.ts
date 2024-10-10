import { Component } from '@angular/core';
import { Firestore, collection, query, where, orderBy, limit, collectionData, addDoc } from '@angular/fire/firestore';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable, Subscription } from 'rxjs';

interface Puntaje {
  usuario: string | null; 
  puntaje: number;
  fecha: string;
}

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
  derrota: boolean = false;
  puntaje: number = 0;
  letrasDescubiertas: string[] = [];
  jugador: string | null = null;
  sub!: Subscription;
  topPuntajes: Puntaje[] = []; 

  constructor(private firestore: Firestore, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.elegirPalabraRandom();
    this.precargarImagenes();
    this.auth.usuarioLogueado$.subscribe((usuario) => { this.jugador = usuario })
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
      img.src = imagen; 
    });
  }

  elegirPalabraRandom() {
    const randomIndex = Math.floor(Math.random() * this.palabrasDisponibles.length);
    this.palabraAAdivinar = this.palabrasDisponibles[randomIndex];
    console.log('Palabra a adivinar: ' + this.palabraAAdivinar);
    this.palabraAAdivinarDescompuesta = this.palabraAAdivinar.split('');

    this.palabraExhibida = this.palabraAAdivinarDescompuesta.map(() => '_').join(' ');
  }

  comprobarExistenciaLetra(letra: string) {
    if (!this.palabraAAdivinar.includes(letra)) {
      this.cantidadErrores++;

      this.verificarDerrota();
    }
    else {
      this.palabraExhibida = this.palabraAAdivinarDescompuesta.map((char, index) => {
        return char === letra ? letra : this.palabraExhibida.split(' ')[index];
      }).join(' ');

      if (!this.letrasDescubiertas.includes(letra)) {
        this.letrasDescubiertas.push(letra);
        this.puntaje++;
      }

      this.verificarVictoria();
    }

    if (this.derrota) {
      this.guardarPuntaje();
      this.obtenerTop5();
      this.mostrarMensajePuntajeGuardado();
    }
  }

  verificarVictoria() {
    if (this.palabraExhibida.replace(/\s+/g, '') === this.palabraAAdivinar) {
      this.victoria = true;
    }
  }

  verificarDerrota() {
    if (this.cantidadErrores === 6) {
      this.derrota = true;
    }
  }

  guardarPuntaje() {
    let col = collection(this.firestore, 'puntajes');
    let obj = {
      fecha: new Date(),
      "user": this.jugador,
      "juego": "Ahorcado",
      "puntaje": this.puntaje
    };
    addDoc(col, obj)
  }

  guardarPuntajeYSalir() {
    this.guardarPuntaje();

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1500);
  }

  mostrarMensajePuntajeGuardado() {
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

  obtenerTop5() {
    // Referencio la colección
    let col = collection(this.firestore, 'puntajes');

    // Armo la query sin el límite
    const filteredQuery = query(
      col,
      where('juego', '==', 'Ahorcado'),
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

  volverAIntentar(perdio: boolean) {
    this.cantidadErrores = 0;
    this.elegirPalabraRandom();
    this.victoria = false;
    this.derrota = false;
    this.letrasDescubiertas = [];

    if (perdio) {
      this.puntaje = 0;
    }
  }
}
