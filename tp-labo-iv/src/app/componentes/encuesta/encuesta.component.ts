import { AuthService } from './../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css'
})
export class EncuestaComponent {
  encuestaForm!: FormGroup;
  usuarioLogueado: string | null = null;

  constructor(private auth: AuthService, private firestore: Firestore, private router: Router) { }

  ngOnInit(): void {
    this.encuestaForm = new FormGroup(
      {
        nombreApellido: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
        edad: new FormControl('', [Validators.required, Validators.min(18), Validators.max(99)]),
        telefono: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(10)]),
        mejora: new FormControl('', Validators.required),
        juegoFavorito: new FormControl('', Validators.required),
        muyDificil: new FormControl(false),
        intermedio: new FormControl(false),
        facil: new FormControl(false),
        musicaFavorita: new FormControl('', Validators.required),
      },
      {
        validators: this.verificarRequiredCheckbox()
      }
    );

    this.auth.usuarioLogueado$.subscribe((usuario) => {
      this.usuarioLogueado = usuario;
    });
  }

  onSubmit(): void {
    if (this.encuestaForm.valid) {
      this.registrarRespuesta()
    } else {
      this.mostrarError('El formulario es inválido')
    }
  }

  async registrarRespuesta() {
    try {
      let col = collection(this.firestore, 'encuestas');

      const dificultad = this.determinarDificultad();

      let obj = {
        username: this.usuarioLogueado,
        fecha: new Date(),
        respuestaEncuesta: {
          dificultad: dificultad,
          nombreApellido: this.encuestaForm.get('nombreApellido')?.value,
          edad: this.encuestaForm.get('edad')?.value,
          telefono: this.encuestaForm.get('telefono')?.value,
          mejora: this.encuestaForm.get('mejora')?.value,
          juegoFavorito: this.encuestaForm.get('juegoFavorito')?.value,
          musicaFavorita: this.encuestaForm.get('musicaFavorita')?.value,
        }
      };

      await addDoc(col, obj); 
      this.mostrarSuccess(); 

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1500);
    }
    catch (e: unknown) {
      let errorMessage: string;

      if (e instanceof Error) {
        errorMessage = e.message; 
      } else {
        errorMessage = 'Error desconocido'; 
      }

      this.mostrarError(errorMessage); 
    }
  }

  determinarDificultad() {
    let dificultad = '';
    if (this.encuestaForm.get('muyDificil')?.value) {
      dificultad = 'muy difícil';
    } else if (this.encuestaForm.get('intermedio')?.value) {
      dificultad = 'intermedio';
    } else if (this.encuestaForm.get('facil')?.value) {
      dificultad = 'fácil';
    }

    return dificultad;
  }

  mostrarSuccess() {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Exitoso',
      text: `Respuesta enviada!`,
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

  mostrarError(error: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error', 
      title: 'Error',
      text: error,
      showConfirmButton: false,
      timer: 3000, 
      background: '#333', 
      color: '#fff', 
      iconColor: '#ff5f6d', 
      customClass: {
        popup: 'colored-toast'
      }
    });
  }

  verificarRequiredCheckbox(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const muyDificil = control.get('muyDificil')?.value;
      const intermedio = control.get('intermedio')?.value;
      const facil = control.get('facil')?.value;

      if (!muyDificil && !intermedio && !facil) {
        return { requerido: 'Al menos una opción debe ser seleccionada' };
      }

      return null; 
    };
  };

  onCheckboxChange(selected: string) {
    const controls = this.encuestaForm.controls;

    controls['muyDificil'].setValue(false);
    controls['intermedio'].setValue(false);
    controls['facil'].setValue(false);

    controls[selected].setValue(true);
  }

  get nombreApellido() {
    return this.encuestaForm.get('nombreApellido');
  }

  get edad() {
    return this.encuestaForm.get('edad');
  }

  get telefono() {
    return this.encuestaForm.get('telefono');
  }

  get mejora() {
    return this.encuestaForm.get('mejora');
  }

  get juegoFavorito() {
    return this.encuestaForm.get('juego-favorito');
  }

  get musicaFavorita() {
    return this.encuestaForm.get('musica-favorita');
  }
}
