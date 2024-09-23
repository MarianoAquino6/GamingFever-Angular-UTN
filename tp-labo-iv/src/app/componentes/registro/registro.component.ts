import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, collection, collectionData, Firestore, where, orderBy, limit, query, doc, setDoc  } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  nuevoUsername: string = "";
  nuevaPass: string = ""

  usuarioLogeado: string = "";
  mensajeError: string = "";

  mostrarContrasenia: boolean = false;

  constructor(public auth: Auth, private router: Router, private firestore: Firestore, private authService: AuthService) {

  }

  registrarUsuario() {
    createUserWithEmailAndPassword(this.auth, this.nuevoUsername, this.nuevaPass).then((res) => {
      //NO HAY ERROR
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
          this.mensajeError = "Email invalido";
          break;
        case "auth/email-already-in-use":
          this.mensajeError = "Email ya en uso";
          break;
        case "auth/missing-password":
          this.mensajeError = "Falta la contraseña";
          break;
        case "auth/weak-password":
          this.mensajeError = "La contraseña es debil";
          break;
        default:
          this.mensajeError = e.code
          break;
      }

      Toastify({
        text: this.mensajeError,
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        duration: 3000
      }).showToast();
    })
  }

  toggleMostrarContrasenia() {
    this.mostrarContrasenia = !this.mostrarContrasenia;
  }

}

