import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './core/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './core/guards/is-not-authenticated.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './seguridad/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'home', component: DashboardComponent, canActivate: [isAuthenticatedGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }


  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   canActivate: [isAuthenticatedGuard],
  //   children: [
  //     {
  //         path: 'dashboard',
  //         component: DashboardComponent,
  //         title: 'dashboard'
  //     }
  //   ]
  // },
  // {
  //     path: 'login',
  //     component: LoginComponent,
  //     canActivate: [ isNotAuthenticatedGuard ],
  // },

];

// const appRoutes = [
//   { path: "", component: AppComponent, pathMatch: "full" },
//   { path: "login", component: LoginComponent, pathMatch: "full" },
//   // { path: "register", component: RegisterComponent, pathMatch: "full" },
// ];

// export const routing = RouterModule.forRoot(appRoutes);
