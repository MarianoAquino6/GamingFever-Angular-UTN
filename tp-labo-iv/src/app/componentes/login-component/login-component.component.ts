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

  //BOTON PARA AUTOCOMPLETAR
  autocompletar()
  {
    this.usernameLogin = "marianaquino@hotmail.com";
    this.passLogin= "124Fasfdh!";
  }

  login() {
    signInWithEmailAndPassword(this.auth, this.usernameLogin, this.passLogin).then((res) => {
      //NO HAY ERRORES
      this.mensajeError = "";

      //MUESTRO UN CARTEL DE BIENVENIDO Y ME GUARDO EL USUARIO LOGUEADO
      if (res.user.email !== null) {
        this.usuarioLogeado = res.user.email;
        Toastify({
          text: `Bienvenido, ${this.usuarioLogeado}!`,
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          duration: 3000
        }).showToast();
      }

      //ENVIO EL DATO DEL USUARIO LOGUEADO AL COMPONENTE PRINCIPAL
      // console.log("Emitiendo usuario logueado:", this.usuarioLogeado);
      // this.onEnviarUserLogueado.emit(this.usuarioLogeado);
      
      // Le mando el nombre del usuario al metodo setUsuarioLogueado del AuthService
      this.authService.setUsuarioLogueado(res.user.email);

      //GUARDO EL LOGIN DEL USUARIO EN UN LOGGER
      let col = collection(this.firestore, 'logins');
      let obj = { fecha: new Date(), "user": res.user.email};
      addDoc(col, obj)

      //REDIRIJO EL USUARIO AL HOME TRAS 3 SEGUNDOS
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 3000);

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

      //LE MUESTRO EL MENSAJE DE ERROR
      Toastify({
        text: this.mensajeError,
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        duration: 3000
      }).showToast();
    })
  }
}
