import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { ValidatorService } from './tools/validator-service';
import { ErrorsService } from './tools/errors-service';
import { DatosAlumno } from '../interfaces/usuarios.interfaces';
@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private validatorService = inject(ValidatorService);
  private errorService = inject(ErrorsService);

  // Método para los headers de autenticación que sirven para enviar el token de sesión en las solicitudes HTTP
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getSessionToken();
    return token
      ? new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
      : new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  public esquemaAlumno(): DatosAlumno {
    return {
      rol: '',
      matricula: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmar_password:'',
      fecha_nacimiento: '',
      curp: '',
      rfc: '',
      edad: 0,
      telefono: '',
      ocupacion:''
    };
  }

  public validarAlumno(data: DatosAlumno, editar: boolean){
    const error: any = {};

    // Validación de matricula
    if(!this.validatorService.required(data["matricula"])){
      error["matricula"] = this.errorService.required;
    }

    // Validación de nombre
    if(!this.validatorService.required(data["first_name"])){
      error["first_name"] = this.errorService.required
    }

    // Validación de apellidos
    if(!this.validatorService.required(data["last_name"])){
      error["last_name"] = this.errorService.required;
    }

    // Validación de correo
    if(!this.validatorService.required(data["email"])){
      error["email"] = this.errorService.required;
    }else if(!this.validatorService.max(data["email"], 40)){
      error["email"] = this.errorService.max(40);
    }else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }
    
    // Validación de contraseña y confirmar contraseña
    if(!editar){
      if(!this.validatorService.required(data["password"])){
        error["password"] = this.errorService.required;
      }

      if(!this.validatorService.required(data["confirmar_password"])){
        error["confirmar_password"] = this.errorService.required;
      }
    }
  
    // Validación de fecha de nacimiento
    if(!this.validatorService.required(data["fecha_nacimiento"])){
      error["fecha_nacimiento"] = this.errorService.required;
    } else if(!this.validatorService.date(data['fecha_nacimiento'])){
      error["fecha_nacimiento"] = this.errorService.date;
    }

    // Validación de CURP
    if(!this.validatorService.required(data["curp"])){
      error["curp"] = this.errorService.required;
    } else if(!this.validatorService.min(data["curp"], 18) || !this.validatorService.max(data["curp"], 18)){
      error["curp"] = "Debe tener exactamente 18 caracteres";
    }

    // Validación de RFC
    if(!this.validatorService.required(data["rfc"])){
      error["rfc"] = this.errorService.required;
    }else if(!this.validatorService.min(data["rfc"], 12)){
      error["rfc"] = this.errorService.min(12);
    }else if(!this.validatorService.max(data["rfc"], 13)){
      error["rfc"] = this.errorService.max(13);
    }

    // Validación de edad
    if(!this.validatorService.required(data["edad"])){
      error["edad"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["edad"])){
      error["edad"] = "El formato es solo números";
    }else if(data["edad"]<18){
      error["edad"] = "La edad debe ser mayor o igual a 18";
    }

    // Validación de telefono
    if(!this.validatorService.required(data["telefono"])){
      error["telefono"] = this.errorService.required;
    }

    // Validación de ocupación
    if(!this.validatorService.required(data["ocupacion"])){
      error["ocupacion"] = this.errorService.required;
    }

    return error;
    
  }
}
