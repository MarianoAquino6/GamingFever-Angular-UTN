import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {
  usuarioLogueadoGeneral: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.usuarioLogueado$.subscribe((usuario) => {
      this.usuarioLogueadoGeneral = usuario;
    });
  }
}
