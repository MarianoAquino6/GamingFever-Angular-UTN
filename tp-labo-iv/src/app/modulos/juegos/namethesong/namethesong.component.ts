import { Component, OnInit } from '@angular/core';
import { CancionesService } from '../../../servicios/canciones.service';
import { Subscription } from 'rxjs';
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
  constructor(private cancionesService: CancionesService){}
  ngOnInit()
  {
    this.obtenerCanciones();
    this.iniciarContador();
  }
  obtenerCanciones()
  {
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
      this.puntaje = 0; // O reinicia el puntaje si lo deseas
      this.vidas = 3; // Reinicia las vidas
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
    }
    if (this.vidas > 0)
    {
      this.seleccionarAleatoreamenteCancion();
      this.generarOpciones();
      this.contador = 10;
    }
    else{
      this.contador = 0;
    }
  }
  volverAIntentar() {
    this.vidas = 3;
    this.puntaje = 0;
    this.seleccionarAleatoreamenteCancion();
    this.generarOpciones();
    this.contador = 10;
    this.cancionesSeleccionadas.clear(); // Reinicia las canciones seleccionadas
  }
}