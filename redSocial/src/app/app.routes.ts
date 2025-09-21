import { Routes } from '@angular/router';
import { ListadoUsuarios } from './module/listado-usuarios/listado-usuarios.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { DetalleUsuarioComponent } from './module/detalle-usuario/detalle-usuario.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, // componente padre
    children: [
      { path: '', component: ListadoUsuarios }, // ruta hija
      { path: 'usuario/:id', component: DetalleUsuarioComponent }, // detalle
    ],
  },
];
