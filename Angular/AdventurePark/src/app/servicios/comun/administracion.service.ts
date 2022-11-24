import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdministradorModel } from 'src/app/modelos/administrador.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {

  constructor(
    private http: HttpClient,
    private servicioSeguridad: SeguridadService
  ) { }

  ConsultarAdministradores():Observable<AdministradorModel[]>{
    return this.http.get<AdministradorModel[]>(`${this.servicioSeguridad.url}/administradores`);
  }
}
