import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, from, map, of, switchMap } from 'rxjs';

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

        const limit = 50; // Limitar a 50 canciones
        const randomOffset = Math.floor(Math.random() * 1000); // Offset aleatorio para obtener una selección aleatoria de canciones
        
        return this.http.get<any>(`https://api.spotify.com/v1/search?q=metallica&type=track&offset=${randomOffset}&limit=${limit}`, { headers }).pipe(
          map(response => {
            // Filtrar las canciones para incluir solo las que pertenecen a los álbumes definidos
            const filteredTracks = response.tracks.items.filter((track: any) => 
              this.albums.includes(track.album.name)
            );

            // Retornar solo 40 canciones o menos si no hay tantas disponibles
            return filteredTracks.slice(0, 40).map((track: any) => ({
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