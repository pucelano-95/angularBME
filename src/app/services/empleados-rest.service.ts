import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { EmpleadosIntService } from './empleados-int.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../model/empleado';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosRestService implements EmpleadosIntService {

  private EMPLEADOS_SERVICE_URL = environment.empleadosServiceUrl;

  constructor(private http: HttpClient) { }

  getAllEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.EMPLEADOS_SERVICE_URL);
  }

  insertaEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<any>(this.EMPLEADOS_SERVICE_URL, empleado);
  }
  
  getEmpleado(cif: string): Observable<Empleado> {
    return this.http.get<Empleado>(this.EMPLEADOS_SERVICE_URL + cif);
  }

  updateEmpleado (updatedEmpleado: Empleado): Observable<void> {
    const url = `${this.EMPLEADOS_SERVICE_URL}/${updatedEmpleado.cif}`;
    return this.http.put(url, updatedEmpleado, { responseType: 'text'}).pipe(
      map(() => void 0)
    );
  }
}