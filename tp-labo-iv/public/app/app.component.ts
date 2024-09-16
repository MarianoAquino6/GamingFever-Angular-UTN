import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponentComponent } from './componentes/home-component/home-component.component';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { LoginComponentComponent } from "../../dist/tp-labo-iv/browser/app/componentes/login-component/login-component.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponentComponent, RouterLink, RouterLinkActive, LoginComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tp-labo-iv';
  usuarioLogueadoGeneral: string = "";

  capturarUsuarioLogueado(usuario: string) {
    this.usuarioLogueadoGeneral = usuario;

    console.log("Usuario logueado recibido en el componente padre:", usuario);
  }
}
