import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, where, orderBy, limit, query, doc, setDoc } from '@angular/fire/firestore';

import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  isChatOpen = false;
  message: string = '';
  usuarioLogueado: string | null = null;
  sub: Subscription | null = null;
  messages: { user: string; mensaje: string; fecha: Date }[] = [];

  constructor(private firestore: Firestore, private authService: AuthService) { }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  // Cuando el componente se inicializa:
  ngOnInit() {
    // Me suscribo al observable que setee en AuthService, para asignar el valor correspondiente a 'usuarioLogueadoGeneral'
    this.authService.usuarioLogueado$.subscribe((usuario) => {
      this.usuarioLogueado = usuario;
    });

    this.readMessages();
  }

  readMessages() {
    let col = collection(this.firestore, 'chat');

    const filteredQuery = query(
      col
      ,orderBy("fecha", "asc")
      ,limit(100)
    );

    const observable = collectionData(filteredQuery);

    this.sub = observable.subscribe((respuesta: any) => {
      //Actualizamos nuestro diccionario
      // this.messages = respuesta;

      this.messages = respuesta.map((msg: any) => ({
        ...msg,
        fecha: msg.fecha instanceof Date ? msg.fecha : new Date(msg.fecha.seconds * 1000) // Ajusta esto si 'fecha' viene como Timestamp
      }));
      
    })

  }

  sendMessage() {
    if (this.message.trim()) {
      let col = collection(this.firestore, 'chat');
      let obj = { "fecha": new Date(), "mensaje": this.message, "user": this.usuarioLogueado };
      addDoc(col, obj).then(() => {
        // Limpio el input después de enviar el mensaje
        this.message = '';
      });
    }
  }
}
