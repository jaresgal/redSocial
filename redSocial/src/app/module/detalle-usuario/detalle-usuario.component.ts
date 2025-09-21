import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User, Album, Photo } from '../../models/user.model';
import { ListadoTodosComponent } from '../listado-todos/listado-todos.component';

@Component({
  selector: 'app-detalle-usuario',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ListadoTodosComponent,
  ],
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss'],
})
export class DetalleUsuarioComponent implements OnInit {
  user?: User;
  isLoading = true;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    if (!userId) return;

    this.userService.getUserById(userId).subscribe((user) => {
      this.user = user;

      // Cargar albums con primera foto
      this.userService.getAlbumsWithFirstPhoto(userId).subscribe((albums) => {
        this.user!.albums = albums;
        this.isLoading = false;
      });
    });
  }

  // Getter seguro para la primera foto de un álbum
  getFirstPhoto(album: Album): Photo | undefined {
    return album.photos?.length ? album.photos[0] : undefined;
  }
}
