import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { CancionesService } from '../../../servicios/canciones.service';
import { Observable, Subscription } from 'rxjs';
import { addDoc, collection, collectionData, Firestore, orderBy, where, query } from '@angular/fire/firestore';
import { AuthService } from '../../../auth/auth.service';
import Swal from 'sweetalert2';

interface Puntaje {
  usuario: string | null; 
  puntaje: number;
  fecha: string;
}

@Component({
  selector: 'app-namethesong',
  standalone: false,
  templateUrl: './namethesong.component.html',
  styleUrl: './namethesong.component.css'
})
export class NamethesongComponent {
  vidas: number = 3;
  puntaje: number = 0;
  contador: number = 10;
  intervalo: any;
  cancionesMetallica: any[] = [];
  posicionCancionSeleccionada!: number;
  subscripcion!: Subscription;
  opciones!: string[];
  numeroRandom!: number;
  primeraOpcion!: string;
  segundaOpcion!: string;
  terceraOpcion!: string;
  cuartaOpcion!: string;
  imagenAlbumCancionSeleccionada!: string;
  tituloCancionSeleccionada!: string;
  audioCancionSeleccionada!: string;
  cancionesSeleccionadas: Set<number> = new Set();
  @ViewChild('audioRef') audioElement!: ElementRef<HTMLAudioElement>;
  juegoterminado: boolean = false;
  jugador: string | null = null;
  derrota: boolean = false;
  sub!: Subscription;
  topPuntajes: Puntaje[] = [];

  constructor(private cancionesService: CancionesService, private firestore: Firestore, private auth: AuthService) { }

  ngOnInit() {
    this.obtenerCanciones();
    this.iniciarContador();
    this.auth.usuarioLogueado$.subscribe((usuario) => { this.jugador = usuario })
  }

  ngAfterViewInit() {
    this.audioElement.nativeElement.volume = 0.4;
  }

  obtenerCanciones() {
    // Como el método getMetallicaSong me devuelve un observable, me tengo que suscribir a este
    this.subscripcion = this.cancionesService.getMetallicaSong().subscribe(
      // Aprovecho para guardar las canciones que obtuve en la variable 'cancionesMetallica'
      (canciones) => {
        this.cancionesMetallica = canciones;
        // Ahora que tengo las canciones, selecciono una aleatoriamente
        // Lo pongo acá porque necesito esperar que primero se recolecte toda la información y se asigne
        // a la variable 'cancionesMetallica'. Si llamo a un metodo y quiero acceder a los valores de la variable 'cancionesMetallica'
        // y esta todavia se encuentra en el proceso de recolectar toda la data, me va a tirar error
        this.seleccionarAleatoreamenteCancion();
        this.generarOpciones();
      }
    );
  }

  ngOnDestroy() {
    if (this.subscripcion) {
      this.subscripcion.unsubscribe();
    }
    clearInterval(this.intervalo);
  }

  iniciarContador() {
    this.intervalo = setInterval(() => {
      if (this.contador > 0) {
        this.contador--;
      } else {
        clearInterval(this.intervalo); // Detengo el intervalo si llega a 0
      }
    }, 1000); // Cada 1 segundo
  }

  seleccionarAleatoreamenteCancion() {
    if (this.cancionesSeleccionadas.size >= this.cancionesMetallica.length) {
      this.cancionesSeleccionadas.clear(); // Reinicia las seleccionadas
      this.juegoterminado = true;
      this.audioElement.nativeElement.pause();

      this.guardarPuntaje();
      this.mostrarMensajePuntajeGuardado();
      this.obtenerTop5();
    }

    let indiceAleatorio: number;
    do {
      indiceAleatorio = Math.floor(Math.random() * this.cancionesMetallica.length);
    } while (this.cancionesSeleccionadas.has(indiceAleatorio));
    this.cancionesSeleccionadas.add(indiceAleatorio); // Añade la canción seleccionada
    this.posicionCancionSeleccionada = indiceAleatorio;
    this.imagenAlbumCancionSeleccionada = this.cancionesMetallica[this.posicionCancionSeleccionada].album;
    this.tituloCancionSeleccionada = this.cancionesMetallica[this.posicionCancionSeleccionada].titulo;
    this.audioCancionSeleccionada = this.cancionesMetallica[this.posicionCancionSeleccionada].audio;
    console.log("La canción elegida es " + this.cancionesMetallica[this.posicionCancionSeleccionada].titulo);
  }

  generarOpciones() {
    const listaTresIndicesAleatorios = new Set<number>();
    while (listaTresIndicesAleatorios.size < 3) {
      const indiceAleatorio = Math.floor(Math.random() * this.cancionesMetallica.length);
      // Evito que el índice seleccionado ya esté en la lista o que sea la canción correcta
      if (indiceAleatorio !== this.posicionCancionSeleccionada && !listaTresIndicesAleatorios.has(indiceAleatorio)) {
        listaTresIndicesAleatorios.add(indiceAleatorio);
      }
    }
    const indicesArray = Array.from(listaTresIndicesAleatorios);
    indicesArray.push(this.posicionCancionSeleccionada);
    this.shuffleArray(indicesArray);
    this.primeraOpcion = this.cancionesMetallica[indicesArray[0]].titulo;
    this.segundaOpcion = this.cancionesMetallica[indicesArray[1]].titulo;
    this.terceraOpcion = this.cancionesMetallica[indicesArray[2]].titulo;
    this.cuartaOpcion = this.cancionesMetallica[indicesArray[3]].titulo;
  }

  // Método para mezclar un array (Fisher-Yates Shuffle)
  shuffleArray(array: number[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  verificarRespuesta(eleccion: string) {
    console.log("La respuesta es: " + eleccion + " y la correcta es " + this.cancionesMetallica[this.posicionCancionSeleccionada].titulo)

    if (eleccion == this.cancionesMetallica[this.posicionCancionSeleccionada].titulo) {
      this.puntaje++;
    }
    else {
      this.vidas--;
      this.verificarDerrota();
    }
    if (this.vidas > 0) {
      this.seleccionarAleatoreamenteCancion();
      this.generarOpciones();
      this.contador = 10;
    }
    else {
      this.contador = 0;
      this.audioElement.nativeElement.pause();
    }

    if (this.derrota) {
      this.guardarPuntaje();
      this.mostrarMensajePuntajeGuardado();
      this.obtenerTop5();
    }
  }

  verificarDerrota() {
    if (this.vidas === 0) {
      this.derrota = true;
    }
  }

  guardarPuntaje() {
    // Referencio la colección
    let col = collection(this.firestore, 'puntajes');
    // Referencio el futuro objeto que agregaré a la colección
    let obj = {
      fecha: new Date(),
      "user": this.jugador,
      "juego": "Name the Metallica Song",
      "puntaje": this.puntaje
    };
    // Agrego el objeto a la colección
    addDoc(col, obj)
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
      where('juego', '==', 'Name the Metallica Song'),
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
    this.vidas = 3;
    this.puntaje = 0;
    this.derrota = false;
    this.seleccionarAleatoreamenteCancion();
    this.generarOpciones();
    this.contador = 10;
    this.cancionesSeleccionadas.clear(); // Reinicia las canciones seleccionadas
  }
}