import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, collection, collectionData, Firestore, where, orderBy, limit, query, doc, setDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Bienvenido',
          text: `¡Hola ${this.usuarioLogeado}!`,
          showConfirmButton: false,
          timer: 2000,
          background: '#333', // Fondo oscuro
          color: '#fff', // Texto blanco
          iconColor: '##28a745', // Color del icono, verde en este caso
          customClass: {
            popup: 'colored-toast'
          }
        });
      }

      // Le mando el nombre del usuario al metodo setUsuarioLogueado del AuthService
      this.authService.setUsuarioLogueado(res.user.email);

      //GUARDO EL LOGIN DEL USUARIO EN UN LOGGER
      let col = collection(this.firestore, 'logins');
      let obj = { fecha: new Date(), "user": res.user.email };
      addDoc(col, obj)

      //REDIRIJO EL USUARIO AL HOME TRAS 3 SEGUNDOS

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1500);

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

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error', // Utiliza el icono de error
        title: 'Error',
        text: this.mensajeError,
        showConfirmButton: false,
        timer: 3000, // Muestra el mensaje por 3 segundos
        background: '#333', // Fondo oscuro
        color: '#fff', // Texto blanco
        iconColor: '#ff5f6d', // Color del icono, un rojo claro
        customClass: {
          popup: 'colored-toast'
        }
      });
    })
  }

  toggleMostrarContrasenia() {
    this.mostrarContrasenia = !this.mostrarContrasenia;
  }
}