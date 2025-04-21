import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GeneralService } from '../shared/general.service';
import { Cliente } from '../interfaces/cliente.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClienteService{
  constructor(){

  }

  private endpoint: string = '/cliente';
  private http    = inject( HttpClient );
  private general = inject (GeneralService)

  consultarClientes():Observable<Cliente[]>{
    const url = this.general.obtenerEndPoint(this.endpoint + "/consultar");
    return this.http.get<Cliente[]>(url);
  }

  consultarClientePorId():Observable<Cliente>{
    const url = this.general.obtenerEndPoint(this.endpoint);
    return this.http.get<Cliente>(url);
  }

  grabar(cliente?: Cliente): Observable<any>{
    const url = this.general.obtenerEndPoint(this.endpoint);
    const resp = this.http.post(url, cliente);
    return resp
  }
}
