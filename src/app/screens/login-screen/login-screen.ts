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
  public router = inject(Router);

  public username: string = '';
  public password: string = '';
  public load: boolean = false;
  public errors: any = {};
  public typeInput: string = 'password';

  constructor() { }
  
  ngOnInit(): void {}

  public login() {}
  public showPassword() {
    this.typeInput = this.typeInput === 'password' ? 'text' : 'password';
  }
  public registrar() {}
  public olvideContrasena() {}
}