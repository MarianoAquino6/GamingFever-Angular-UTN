import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-quien-soy-component',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './quien-soy-component.component.html',
  styleUrl: './quien-soy-component.component.css'
})
export class QuienSoyComponentComponent {

}
