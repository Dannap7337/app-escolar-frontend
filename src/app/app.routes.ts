import { Routes } from '@angular/router';
import { LoginScreen } from './screens/login-screen/login-screen';

export const routes: Routes = [
  { path: '', component: LoginScreen }, // <--- Que cargue el login al abrir la app
  // o { path: 'login', component: LoginScreen }
];