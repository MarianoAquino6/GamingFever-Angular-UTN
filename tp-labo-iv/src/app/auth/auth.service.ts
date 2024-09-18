import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Almaceno el estado del usuario logueado en el BehaviorSubject
  private usuarioLogueadoSource = new BehaviorSubject<string | null>(null);
  
  // Observable al que los componentes se pueden suscribir para escuchar cambios (En este caso se suscribe el componente principal)
  usuarioLogueado$ = this.usuarioLogueadoSource.asObservable();

  constructor() { }

  //Recibo el user y lo meto en usuarioLogueadoSource
  setUsuarioLogueado(usuario: string | null) {
    this.usuarioLogueadoSource.next(usuario);
  }

  //Convierto usuarioLogueadoSource a null
  logout() {
    this.usuarioLogueadoSource.next(null);
  }
}