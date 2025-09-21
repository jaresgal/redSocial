import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Album, Photo, User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUsers = 'https://jsonplaceholder.typicode.com/users';
  private apiAlbums = 'https://jsonplaceholder.typicode.com/albums';
  private apiPhotos = 'https://jsonplaceholder.typicode.com/photos';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUsers);
  }
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUsers}/${id}`);
  }

  getAlbumsByUserId(userId: number): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.apiAlbums}?userId=${userId}`);
  }

  getPhotosByAlbumId(albumId: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.apiPhotos}?albumId=${albumId}`);
  }

  // Carga albums con su primera foto
  getAlbumsWithFirstPhoto(userId: number): Observable<Album[]> {
    return this.getAlbumsByUserId(userId).pipe(
      switchMap((albums) => {
        const requests = albums.map((album) =>
          this.getPhotosByAlbumId(album.id).pipe(
            map((photos) => {
              album.photos = photos.length ? [photos[0]] : [];
              return album;
            })
          )
        );
        return forkJoin(requests);
      })
    );
  }
}
