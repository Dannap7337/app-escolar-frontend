import { Component, inject, Input, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { Location } from '@angular/common';
import { MaestrosService } from '../../services/maestros-service';

@Component({
  selector: 'app-registro-maestros',
  imports: [
    ...SHARED_IMPORTS
  ],
  templateUrl: './registro-maestros.html',
  styleUrl: './registro-maestros.scss',
})
export class RegistroMaestros implements OnInit{
  @Input() rol: string = '';
  @Input() datos_user: any = {};

  private Location = inject(Location);
  private maestrosService = inject(MaestrosService);

  public maestro: any = {}
  public errors: any = {}
  public editar: boolean = false;
  public idUser: number = 0;

  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  constructor() {}

  onMateriaChange(event: any, materia: string) {
    if (event.checked) {
      this.maestro.materias.push(materia);
    } else {
      const index = this.maestro.materias.indexOf(materia);
      if (index >= 0) {
        this.maestro.materias.splice(index, 1);
      }
    }
  }

  ngOnInit(): void {
    
    this.maestro = this.maestrosService.esquemaMaestro();
    console.log('Datos del maestro', this.maestro)
  }

  public regresar(): void {
    this.Location.back()
  }

  public showPassword(): void {
    if (this.inputType_1 === 'password') {
      this.inputType_1 = 'text';
      this.hide_1 = true;
    } else {
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  public showPwdConfirmar(): void {
    if (this.inputType_2 === 'password') {
      this.inputType_2 = 'text';
      this.hide_2 = true;
    } else {
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  public registrar() {
    this.errors = {};
    this.errors = this.maestrosService.validarMaestro(this.maestro, this.editar);

    console.log('Errores de validación:', this.errors);

    if (Object.keys(this.errors).length > 0) {
      return;
    }
    
    // TODO: Aqui se debe implementar la lógica para registrar o actualizar datos del administrador en el backend
  
  }

  public actualizar() {

  }

  public soloLetras(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);

    if (
      !(charCode >= 65 && charCode <= 90) &&
      !(charCode >= 97 && charCode <= 122) &&
      charCode !== 32
    ) {
      event.preventDefault();
    }
  }


}
