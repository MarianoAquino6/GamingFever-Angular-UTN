import { Component, EventEmitter, Output } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, collection, collectionData, Firestore, where, orderBy, limit, query, doc, setDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, RouterLink],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})
export class LoginComponentComponent {
  usernameLogin: string = "";
  passLogin: string = "";

  usuarioLogeado: string = "";
  mensajeError: string = "";

  @Output() onEnviarUserLogueado = new EventEmitter<string>();

  constructor(public auth: Auth, private router: Router, private firestore: Firestore, private authService: AuthService) {

  }

  autocompletar() {
    this.usernameLogin = "marianaquino@hotmail.com";
    this.passLogin = "124Fasfdh!";
  }

  login() {
    signInWithEmailAndPassword(this.auth, this.usernameLogin, this.passLogin).then((res) => {
      this.mensajeError = "";

      if (res.user.email !== null) {
        this.usuarioLogeado = res.user.email;

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Bienvenido',
          text: `¡Hola ${this.usuarioLogeado}!`,
          showConfirmButton: false,
          timer: 2000,
          background: '#333', 
          color: '#fff',
          iconColor: '##28a745', 
          customClass: {
            popup: 'colored-toast'
          }
        });
      }

      this.authService.setUsuarioLogueado(res.user.email);

      let col = collection(this.firestore, 'logins');
      let obj = { fecha: new Date(), "user": res.user.email };
      addDoc(col, obj)

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1500);

    }).catch((e) => {
      switch (e.code) {
        case "auth/invalid-email":
          this.mensajeError = "Email inválido";
          break;
        case "auth/invalid-credential":
          this.mensajeError = "Credenciales incorrectas";
          break;
        case "auth/network-request-failed":
          this.mensajeError = "Error de red. Intenta nuevamente.";
          break;
        default:
          this.mensajeError = "Error desconocido: " + e.message;
          break;
      }

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error', 
        title: 'Error',
        text: this.mensajeError,
        showConfirmButton: false,
        timer: 3000,
        background: '#333', 
        color: '#fff', 
        iconColor: '#ff5f6d',
        customClass: {
          popup: 'colored-toast'
        }
      });
    })
  }
}
