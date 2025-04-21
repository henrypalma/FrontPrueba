import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GeneralService } from '../shared/general.service';
import { Producto } from '../interfaces/producto.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductoService{
  constructor(){
  }

  private endpoint: string = '/producto';
  private http    = inject( HttpClient );
  private general = inject (GeneralService)

  consultarProductos():Observable<Producto[]>{
    const url = this.general.obtenerEndPoint(this.endpoint + "/consultar");
    return this.http.get<Producto[]>(url);
  }

  consultarProductoPorId():Observable<Producto>{
    const url = this.general.obtenerEndPoint(this.endpoint);
    return this.http.get<Producto>(url);
  }

  grabar(producto?: Producto): Observable<any>{
    const url = this.general.obtenerEndPoint(this.endpoint);
    const resp = this.http.post(url, producto);
    return resp
  }

  eliminar(id: number): Observable<any>{
    const url = this.general.obtenerEndPoint(this.endpoint + "/eliminar", { id });
    const resp = this.http.post(url, null);
    return resp
  }

}
