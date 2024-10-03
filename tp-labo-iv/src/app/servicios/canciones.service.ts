// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { concatMap, from, map, of, switchMap } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CancionesService {
//   albums: string[] = ["Kill 'Em All (Remastered)", "Ride The Lightning (Remastered)", "Master Of Puppets (Remastered)", 
//                       "...And Justice For All (Remastered)", "Load", "Reload", "Garage Inc.", "St. Anger", "Death Magnetic", 
//                       "Metallica (Remastered 2021)" ,"72 Seasons"];

//   constructor(private http: HttpClient) { }

//   private getSpotifyToken() {
//     const client_id = 'd03a386f1fb548c8b484765b4593f255';
//     const client_secret = 'e5db683f5ea24bee868fab7281a69721';
//     const body = new HttpParams().set('grant_type', 'client_credentials');
    
//     const headers = new HttpHeaders({
//       Authorization: 'Basic ' + btoa(`${client_id}:${client_secret}`),
//       'Content-Type': 'application/x-www-form-urlencoded',
//     });

//     // Obtengo el token de acceso
//     return this.http.post<{ access_token: string }>('https://accounts.spotify.com/api/token', body.toString(), { headers });
//   }

//   getMetallicaSong() {
//     return this.getSpotifyToken().pipe(
//       switchMap(tokenResponse => {
//         const token = tokenResponse.access_token;

//         const headers = new HttpHeaders({
//           Authorization: `Bearer ${token}`
//         });

//         const limit = 50; // Limitar a 50 canciones
//         const randomOffset = Math.floor(Math.random() * 1000); // Offset aleatorio para obtener una selección aleatoria de canciones
        
//         return this.http.get<any>(`https://api.spotify.com/v1/search?q=metallica&type=track&offset=${randomOffset}&limit=${limit}`, { headers }).pipe(
//           map(response => {
//             // Filtrar las canciones para incluir solo las que pertenecen a los álbumes definidos
//             const filteredTracks = response.tracks.items.filter((track: any) => 
//               this.albums.includes(track.album.name)
//             );

//             // Retornar solo 40 canciones o menos si no hay tantas disponibles
//             return filteredTracks.slice(0, 40).map((track: any) => ({
//               titulo: track.name,
//               album: track.album.images[0]?.url, // Imagen del álbum
//               audio: track.preview_url // Vista previa del audio
//             }));
//           })
//         );
//       })
//     );
//   }
// }



import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, concatMap, from, map, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CancionesService {
  albums: string[] = ["Kill 'Em All (Remastered)", "Ride The Lightning (Remastered)", "Master Of Puppets (Remastered)", 
                      "...And Justice For All (Remastered)", "Load", "Reload", "Garage Inc.", "St. Anger", "Death Magnetic", 
                      "Metallica (Remastered 2021)" ,"72 Seasons"];
  constructor(private http: HttpClient) { }
  private getSpotifyToken() {
    const client_id = 'd03a386f1fb548c8b484765b4593f255';
    const client_secret = 'e5db683f5ea24bee868fab7281a69721';
    const body = new HttpParams().set('grant_type', 'client_credentials');
    
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${client_id}:${client_secret}`),
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    // Obtengo el token de acceso
    return this.http.post<{ access_token: string }>('https://accounts.spotify.com/api/token', body.toString(), { headers });
  }
  getMetallicaSong() {
    return this.getSpotifyToken().pipe(
      switchMap(tokenResponse => {
        const token = tokenResponse.access_token;
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        // Inicializar el array para almacenar todas las canciones
        const allTracks: any[] = [];
        let offset = 0; // Variable para paginación
        const limit = 50; // Número de resultados por llamada (máximo permitido)
        const fetchSongs = () => {
          return this.http.get<any>(`https://api.spotify.com/v1/search?q=metallica&type=track&offset=${offset}&limit=${limit}`, { headers }).pipe(
            map(response => {
              allTracks.push(...response.tracks.items); // Añadir canciones a la lista
              return response.tracks.total; // Retornar el total de canciones
            })
          );
        };
        // Usamos un loop para paginar a través de todas las canciones
        return from(fetchSongs()).pipe(
          concatMap(totalTracks => {
            const numCalls = Math.ceil(totalTracks / limit); // Calcula cuántas llamadas se necesitan
            const calls = Array.from({ length: numCalls }, (_, i) => {
              offset = i * limit; // Actualiza el offset
              return fetchSongs();
            });
            return concat(...calls); // Concatenar todas las llamadas
          }),
          map(() => {
            // Filtra las canciones para incluir solo las del álbum "Ride The Lightning (Remastered)"
            const filteredTracks = allTracks.filter((track: any) => 
              this.albums.includes(track.album.name)
            );
            // Retorna los temas filtrados
            return filteredTracks.map((track: any) => ({
              titulo: track.name,
              album: track.album.images[0]?.url, // Imagen del álbum
              audio: track.preview_url // Vista previa del audio
            }));
          })
        );
      })
    );
  }
}