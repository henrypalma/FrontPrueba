import { Cliente } from './../../core/interfaces/cliente.interface';
import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ClienteService } from '../../core/services/cliente.service';
import { GeneralService } from '../../core/shared/general.service';

@Component({
  selector: 'app-cliente.dialog',
  imports: [ MatFormFieldModule, MatInputModule, FormsModule, MatDialogActions, MatButtonModule ],
  templateUrl: './cliente.dialog.component.html',
  styleUrl: './cliente.dialog.component.css'
})
export class ClienteDialogComponent {
  formData = {
    nombres: '',
    apellidos: '',
    documentoIdentidad: '',
    correo: '',
    telefono: '',
    direccion: ''
  };

  cliente: Cliente = {
    nombres: '',
    apellidos: '',
    documentoIdentidad: '',
    estado: 1,
    correo: undefined,
    telefono: undefined,
    direccion: undefined,
    fechaModificacion: undefined,
    id: 0
  };
  clienteService = inject(ClienteService);
  general = inject(GeneralService);

  constructor(public dialogRef: MatDialogRef<ClienteDialogComponent>) {}

  cerrar(): void {
    this.dialogRef.close(this.formData);
  }

  grabar(): void {
    console.log(this.formData);
    this.cliente.nombres = this.formData.nombres;
    this.cliente.apellidos = this.formData.apellidos;
    this.cliente.documentoIdentidad = this.formData.documentoIdentidad;
    this.cliente.correo = this.formData.correo;
    this.cliente.direccion = this.formData.direccion;
    this.cliente.telefono = this.formData.telefono;

    this.clienteService.grabar(this.cliente)
      .subscribe({
        next: (result) => {
          this.cerrar();
          this.general.mensajeCorrecto("Cliente se grabó correctamente");
        },
        error: ({ error }) => {
          this.general.mensajeError(error.mensaje);
        },
      });
  }

}
