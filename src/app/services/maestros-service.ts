import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { ValidatorService } from './tools/validator-service';
import { ErrorsService } from './tools/errors-service';
import { DatosMaestro } from '../interfaces/usuarios.interfaces'
@Injectable({
  providedIn: 'root',
})
export class MaestrosService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private validatorService = inject(ValidatorService);
  private errorService = inject(ErrorsService);

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getSessionToken();
    return token
      ? new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
      : new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  public esquemaMaestro(): DatosMaestro {
    return {
      rol: '',
      id_trabajador: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmar_password: '',
      fecha_nacimiento: '',
      telefono: '',
      rfc: '',
      cubiculo: '',
      area_investigacion: '',
      materias:[]
    };
  }

  public validarMaestro(data: DatosMaestro, editar: boolean) {
    const error: any = {};

    // Validación de ID de trabajador
    if (!this.validatorService.required(data["id_trabajador"])) {
      error["id_trabajador"] = this.errorService.required;
    }

    // Validación de nombre
    if (!this.validatorService.required(data["first_name"])) {
      error["first_name"] = this.errorService.required;
    }

    // Validación de apellidos
    if (!this.validatorService.required(data["last_name"])) {
      error["last_name"] = this.errorService.required;
    }

    // Validación de correo
    if (!this.validatorService.required(data["email"])) {
      error["email"] = this.errorService.required;
    } else if (!this.validatorService.max(data["email"], 40)) {
      error["email"] = this.errorService.max(40);
    } else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }
    
    // Validación de contraseña y confirmar contraseña
    if (!editar) {
      if (!this.validatorService.required(data["password"])) {
        error["password"] = this.errorService.required;
      }

      if (!this.validatorService.required(data["confirmar_password"])) {
        error["confirmar_password"] = this.errorService.required;
      }
    }
  
    // Validación de fecha de nacimiento
    if (!this.validatorService.required(data["fecha_nacimiento"])) {
      error["fecha_nacimiento"] = this.errorService.required;
    } else if (!this.validatorService.date(data['fecha_nacimiento'])) {
      error["fecha_nacimiento"] = this.errorService.date;
    }

    // Validación de RFC
    if (!this.validatorService.required(data["rfc"])) {
      error["rfc"] = this.errorService.required;
    } else if (!this.validatorService.min(data["rfc"], 12)) {
      error["rfc"] = this.errorService.min(12);
    } else if (!this.validatorService.max(data["rfc"], 13)) {
      error["rfc"] = this.errorService.max(13);
    }

    // Validación de teléfono
    if (!this.validatorService.required(data["telefono"])) {
      error["telefono"] = this.errorService.required;
    }

    // Validación de cubículo
    if (!this.validatorService.required(data["cubiculo"])) {
      error["cubiculo"] = this.errorService.required;
    }

    // Validación de área de investigación
    if (!this.validatorService.required(data["area_investigacion"])) {
      error["area_investigacion"] = this.errorService.required;
    }

    // Validación de materias
    if (!data["materias"] || data["materias"].length === 0) {
      error["materias"] = this.errorService.required;
    }

    return error;
  }
}
