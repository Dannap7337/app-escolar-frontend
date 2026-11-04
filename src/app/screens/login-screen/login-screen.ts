import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS
  ],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.scss',
})
export class LoginScreen implements OnInit {
  // Definición de variable globales que se utilizaran en el componente
  public username: string = '';
  public password: string = '';
  public load: boolean = false;
  public errors: any = {};

  //Tipo de campo para la contraseña
  public typeInput: string = 'password';

  //Definir el router para la navegación entre pantallas
  private router: Router = inject(Router);
  constructor() {}
  
  ngOnInit(): void {}

  public login() {}
  public showPassword() {
    this.typeInput = this.typeInput === 'password' ? 'text' : 'password';
  }
  public registrar() {
    this.router.navigate(['registro-usuarios']);
  }
  public olvideContrasena() {}
}