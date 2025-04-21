import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GeneralService } from '../shared/general.service';
import { Usuario } from '../interfaces/usuario.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService{
  constructor(){
  }
  private endpoint: string = '/usuario';
  private http    = inject( HttpClient );
  private general = inject (GeneralService)

  consultarUsuarios():Observable<Usuario[]>{
    const url = this.general.obtenerEndPoint(this.endpoint + "/consultar");
    return this.http.get<Usuario[]>(url);
  }

  consultarUsuarioPorId():Observable<Usuario>{
    const url = this.general.obtenerEndPoint(this.endpoint);
    return this.http.get<Usuario>(url);
  }

  grabar(usuario?: Usuario): Observable<any>{
    const url = this.general.obtenerEndPoint(this.endpoint);
    const resp = this.http.post(url, usuario);
    return resp
  }

  eliminar(id: number): Observable<any>{
    const url = this.general.obtenerEndPoint(this.endpoint + "/eliminar", { id });
    const resp = this.http.post(url, null);
    return resp
  }
}
