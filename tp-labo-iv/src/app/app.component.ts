import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponentComponent } from './componentes/home-component/home-component.component';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { LoginComponentComponent } from "../../dist/tp-labo-iv/browser/app/componentes/login-component/login-component.component";
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponentComponent, RouterLink, RouterLinkActive, LoginComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tp-labo-iv';
  // usuarioLogueadoGeneral: string = "";
  usuarioLogueadoGeneral: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Suscribirse al observable del servicio para escuchar cambios en el usuario logueado
    this.authService.usuarioLogueado$.subscribe((usuario) => {
      this.usuarioLogueadoGeneral = usuario;
    });
  }

  // Puedes añadir una lógica de logout aquí también
  logout() {
    this.authService.logout();  // Llamar al método logout del servicio
  }

  // capturarUsuarioLogueado(usuario: string) {
  //   this.usuarioLogueadoGeneral = usuario;

  //   console.log("Usuario logueado recibido en el componente padre:", usuario);
  // }
}
