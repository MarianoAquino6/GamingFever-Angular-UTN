import { Component, EventEmitter, Output } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, collection, collectionData, Firestore, where, orderBy, limit, query, doc, setDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { AuthService } from '../../auth/auth.service';

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

  constructor(public auth: Auth, private router: Router, private firestore: Firestore, private authService: AuthService) 
  {

  }

  // Boton para autocompletar
  autocompletar()
  {
    this.usernameLogin = "marianaquino@hotmail.com";
    this.passLogin= "124Fasfdh!";
  }

  login() {
    signInWithEmailAndPassword(this.auth, this.usernameLogin, this.passLogin).then((res) => {
      //Hasta acá no hay errores
      this.mensajeError = "";

      // Si el email que ingreso no esta vacio
      if (res.user.email !== null) {
        // Me guardo el usuario logueado
        this.usuarioLogeado = res.user.email;

        // Muestro un cartel de bienvenido
        Toastify({
          text: `Bienvenido, ${this.usuarioLogeado}!`,
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          duration: 1500
        }).showToast();
      }
      
      // Le mando el nombre del usuario al metodo setUsuarioLogueado del AuthService
      this.authService.setUsuarioLogueado(res.user.email);

      // Guardo el login del usuario
      let col = collection(this.firestore, 'logins');
      let obj = { fecha: new Date(), "user": res.user.email};
      addDoc(col, obj)

      // Redirijo al usuario al home tras 1.5 segundos
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1500);
      
      // Si surgen errores los capto
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

      // Muestro el mensaje de error
      Toastify({
        text: this.mensajeError,
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        duration: 2000
      }).showToast();
    })
  }
}
