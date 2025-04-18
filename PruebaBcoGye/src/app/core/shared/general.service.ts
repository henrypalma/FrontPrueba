import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/api';

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

  constructor(private messageService: MessageService) {}

  mensajeCorrecto(sms: string) {
    this.messageService.add({ severity: 'success', summary: 'Correcto', detail: sms });
  }

  mensajeInformativo(sms: string) {
      this.messageService.add({ severity: 'info', summary: 'Información', detail: sms });
  }

  mensajeWarning(sms: string) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: sms });
  }

  mensajeError(sms: string) {
      this.messageService.add({ severity: 'error', summary: 'Ups!', detail: sms });
  }

  mensajeContrast(sms: string) {
      this.messageService.add({ severity: 'contrast', summary: 'Error', detail: sms });
  }

  mensajeSecundario(sms: string) {
      this.messageService.add({ severity: 'secondary', summary: 'Secondary', detail: sms });
  }
}
