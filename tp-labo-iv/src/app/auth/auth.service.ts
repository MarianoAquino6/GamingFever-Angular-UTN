import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Hace que este servicio esté disponible en toda la aplicación
})
export class AuthService {
  // BehaviorSubject almacena el estado del usuario logueado
  private usuarioLogueadoSource = new BehaviorSubject<string | null>(null);
  
  // Observable al que los componentes se pueden suscribir para escuchar cambios
  usuarioLogueado$ = this.usuarioLogueadoSource.asObservable();

  constructor() { }

  // Método actualizado para aceptar string | null
  setUsuarioLogueado(usuario: string | null) {
    this.usuarioLogueadoSource.next(usuario);
  }

  // Método para desloguear al usuario
  logout() {
    this.usuarioLogueadoSource.next(null);
  }
}