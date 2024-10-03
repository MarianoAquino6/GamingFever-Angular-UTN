import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BanderasService {
  // COMO ESTOY USANDO HTTP EN UN SERVICIO, TUVE QUE IMPORTAR EL provideHttpClient EN EL CONFIG.

  // Inyecto el HttpClient
  constructor(private http: HttpClient) { }

  // Esta función obtiene un OBSERVABLE que contiene las banderas y nombres de todos los paises del mundo.
  getPaises(){
    //Le pego al endpoint. Uso el operador PIPE para poder aplicar funciones de transformacion sobre el observable obtenido
    return this.http.get<any[]>('https://restcountries.com/v3.1/all').pipe(
      // Uso la funcion de transformación map para transformar los datos obtenidos en el observable
      map( 
        // Declaro que el array que obtuve al pegarle a la API y ahora tengo dentro del observable se llama 'paises'
        // Uso la función de transformación map aplicandolo al array de paises que obtuve para que impacte sobre sus elementos
        (paises) => paises.map(
          // Declaro que dentro del array de paises, tengo varios elementos 'pais'
          (pais) => (
            {
              // A cada elemento 'pais' lo transformo en un objeto que posee nombre y bandera
              nombre: pais.translations?.spa?.common || pais.name.common, //Agarro los paises en español
              bandera: pais.flags.png
            }
          )
        )
      )
    )
  }
}
