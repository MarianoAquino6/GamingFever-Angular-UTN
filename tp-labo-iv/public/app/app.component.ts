import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponentComponent } from './componentes/home-component/home-component.component';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { LoginComponentComponent } from "../../dist/tp-labo-iv/browser/app/componentes/login-component/login-component.component";
import { AuthService } from './auth/auth.service';
import { ChatComponent } from "./componentes/chat/chat.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponentComponent, RouterLink, RouterLinkActive, LoginComponentComponent, ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tp-labo-iv';
  usuarioLogueadoGeneral: string | null = null;

  constructor(private authService: AuthService) {}

  // Cuando el componente se inicializa:
  ngOnInit() {
    // Me suscribo al observable que setee en AuthService, para asignar el valor correspondiente a 'usuarioLogueadoGeneral'
    this.authService.usuarioLogueado$.subscribe((usuario) => {
      this.usuarioLogueadoGeneral = usuario;
    });
  }

  // Llamo al metodo logout del AuthService para que cambie el valor del usuario logueado a null
  logout() {
    this.authService.logout();
  }
}
