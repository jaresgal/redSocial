import { Routes } from '@angular/router';
import { ListadoUsuarios } from './module/listado-usuarios/listado-usuarios.component';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, // componente padre
    children: [
      { path: '', component: ListadoUsuarios }, // ruta hija
    ],
  },
];
