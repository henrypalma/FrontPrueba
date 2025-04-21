import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './core/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './core/guards/is-not-authenticated.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './seguridad/login/login.component';
import { ClienteComponent } from './cliente/cliente.component';
import LayoutComponent from './layout/layout.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProductoComponent } from './producto/producto.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [isAuthenticatedGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'dashboard'
      },
      {
        path: "cliente",
        component: ClienteComponent,
        title: "Cliente"
      },
      {
        path: "usuario",
        component: UsuarioComponent,
        title: "Usuario"
      },
      {
        path: "producto",
        component: ProductoComponent,
        title: "Producto"
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ isNotAuthenticatedGuard ],
  },

];

