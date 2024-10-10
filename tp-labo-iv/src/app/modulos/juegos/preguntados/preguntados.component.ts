import { Component, OnInit } from '@angular/core';
import { BanderasService } from '../../../servicios/banderas.service';
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
  selector: 'app-preguntados',
  standalone: false,
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {
  vidas: number = 3;
  puntaje: number = 0;
  intervalo: any;
  paises!: any[];
  subscripcion!: Subscription;
  opciones!: string[];
  numeroRandom!: number;
  posicionPaisSeleccionado!: number;
  primeraOpcion!: string;
  segundaOpcion!: string;
  terceraOpcion!: string;
  cuartaOpcion!: string;
  banderaPaisSeleccionado!: string;
  jugador: string | null = null;
  derrota: boolean = false;
  sub!: Subscription;
  topPuntajes: Puntaje[] = [];

  constructor(private banderasService: BanderasService, private firestore: Firestore, private auth: AuthService) { }

  ngOnInit() {
    this.obtenerPaises();
    this.auth.usuarioLogueado$.subscribe((usuario) => {this.jugador = usuario})
  }

  ngOnDestroy() {
    if (this.subscripcion) {
      this.subscripcion.unsubscribe();
    }
    clearInterval(this.intervalo);
  }

  obtenerPaises() {
    // Como el método getPaises me devuelve un observable, me tengo que suscribir a este
    this.subscripcion = this.banderasService.getPaises().subscribe(
      // Aprovecho para guardar los paises que obtuve en la variable 'paises'
      (paises) => {
        this.paises = paises;

        // Ahora que tengo los países, selecciono uno aleatoriamente
        // Lo pongo acá porque necesito esperar que primero se recolecte toda la información y se asigne
        // a la variable 'paises'. Si llamo a un metodo y quiero acceder a los valores de la variable 'paises'
        // y esta todavia se encuentra en el proceso de recolectar toda la data, me va a tirar error
        this.seleccionarAleatoreamentePais();
        this.generarOpciones();
      }
    );
  }

  seleccionarAleatoreamentePais() {
    const indiceAleatorio = Math.floor(Math.random() * this.paises.length);
    this.posicionPaisSeleccionado = indiceAleatorio;
    this.banderaPaisSeleccionado = this.paises[this.posicionPaisSeleccionado].bandera;

    console.log("El país elegido es " + this.paises[this.posicionPaisSeleccionado].nombre);
  }

  generarOpciones() {
    const listaTresIndicesAleatorios = new Set<number>();

    while (listaTresIndicesAleatorios.size < 3) {
      const indiceAleatorio = Math.floor(Math.random() * this.paises.length);
      listaTresIndicesAleatorios.add(indiceAleatorio);
    }

    const indicesArray = Array.from(listaTresIndicesAleatorios);
    indicesArray.push(this.posicionPaisSeleccionado);
    this.shuffleArray(indicesArray);

    this.primeraOpcion = this.paises[indicesArray[0]].nombre;
    this.segundaOpcion = this.paises[indicesArray[1]].nombre;
    this.terceraOpcion = this.paises[indicesArray[2]].nombre;
    this.cuartaOpcion = this.paises[indicesArray[3]].nombre;
  }

  // Método para mezclar un array (Fisher-Yates Shuffle)
  shuffleArray(array: number[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  verificarRespuesta(eleccion: string) {
    console.log("La respuesta es: " + eleccion + " y la correcta es " + this.paises[this.posicionPaisSeleccionado].nombre)

    if (eleccion == this.paises[this.posicionPaisSeleccionado].nombre) {
      this.puntaje++;
    }
    else {
      this.vidas--;
      this.verificarDerrota();
    }

    if (this.vidas > 0) {
      this.seleccionarAleatoreamentePais();
      this.generarOpciones();
    }

    if (this.derrota)
    {
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

  guardarPuntaje()
  {
    // Referencio la colección
    let col = collection(this.firestore, 'puntajes');
    // Referencio el futuro objeto que agregaré a la colección
    let obj = { 
      fecha: new Date(), 
      "user": this.jugador,
      "juego": "Preguntados",
      "puntaje": this.puntaje
    };
    // Agrego el objeto a la colección
    addDoc(col, obj)
  }

  obtenerTop5() {
    // Referencio la colección
    let col = collection(this.firestore, 'puntajes');

    // Armo la query sin el límite
    const filteredQuery = query(
      col,
      where('juego', '==', 'Preguntados'),
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

  volverAIntentar() {
    this.vidas = 3;
    this.puntaje = 0;
    this.derrota = false;
    this.seleccionarAleatoreamentePais();
    this.generarOpciones();
  }
}
