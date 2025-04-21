import { Usuario } from './../../core/interfaces/usuario.interface';
import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from '../../core/services/usuario.service';
import { GeneralService } from '../../core/shared/general.service';

@Component({
  selector: 'app-usuario.dialog',
  imports: [ MatFormFieldModule, MatInputModule, FormsModule, MatDialogActions, MatButtonModule ],
  templateUrl: './usuario.dialog.component.html',
  styleUrl: './usuario.dialog.component.css'
})
export class UsuarioDialogComponent {
  formData = {
    nombres: '',
    apellidos: '',
    documentoIdentidad: '',
    correo: '',
    telefono: '',
    direccion: '',
    usuario: '',
    contrasenia: ''
  };

  usuario: Usuario = {
      nombre: '',
      apellidos: '',
      documentoIdentidad: '',
      estado: 1,
      correo: undefined,
      telefono: undefined,
      direccion: undefined,
      fechaModificacion: undefined,
      id: 0,
      usuario: '',
      contrasenia: ''
    };

  usuarioService = inject(UsuarioService);
  general = inject(GeneralService);

  constructor(public dialogRef: MatDialogRef<UsuarioDialogComponent>) {}

  cerrar(): void {
    this.dialogRef.close(this.formData);
  }

  grabar(): void {
  this.usuario.nombre = this.formData.nombres;
  this.usuario.apellidos = this.formData.apellidos;
  this.usuario.documentoIdentidad = this.formData.documentoIdentidad;
  this.usuario.correo = this.formData.correo;
  this.usuario.direccion = this.formData.direccion;
  this.usuario.telefono = this.formData.telefono;
  this.usuario.usuario = this.formData.usuario;
  this.usuario.contrasenia = this.formData.contrasenia;

  this.usuarioService.grabar(this.usuario)
    .subscribe({
      next: (result) => {
        this.cerrar();
        this.general.mensajeCorrecto("Usuario se grabó correctamente");
      },
      error: ({ error }) => {
        this.general.mensajeError(error.mensaje);
      },
    });
  }

}
