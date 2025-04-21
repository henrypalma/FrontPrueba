import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
//import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})

export class GeneralService {

  obtenerEndPoint(endPoint: string, obj: any = null) {

    if( obj == null ){
      return environment.API_URL + endPoint;
    }

    let parts = [];
    if(obj)
      for (const property in obj) {
        const value = obj[property];
        if (value != null && value != undefined && value != '')
          parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
      }

    return environment.API_URL + endPoint + '?' + parts.join('&');

  }

  mensajeError(sms: string){
    Swal.fire({
                title: '¡Error!',
                text: sms,
                icon: 'error',
                confirmButtonText: 'Ok',
              });
  }

  mensajeCorrecto(sms: string){
    Swal.fire({
                title: 'Éxito!',
                text: sms,
                icon: 'success',
                confirmButtonText: 'Ok',
              });
  }

}
