import { Component, OnInit } from '@angular/core';
import { BanderasService } from '../../../servicios/banderas.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-preguntados',
  standalone: false,
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {
  vidas: number = 3;
  puntaje: number = 0;
  contador: number = 10;
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

  constructor(private banderasService: BanderasService) { }

  ngOnInit() {
    this.obtenerPaises();
    this.iniciarContador();
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
    }

    if (this.vidas > 0) {
      this.seleccionarAleatoreamentePais();
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
    this.seleccionarAleatoreamentePais();
    this.generarOpciones();
    this.contador = 10;
  }
}
