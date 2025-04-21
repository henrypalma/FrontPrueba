import { Producto } from './../../core/interfaces/producto.interface';
import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ProductoService } from '../../core/services/producto.service';
import { GeneralService } from '../../core/shared/general.service';

@Component({
  selector: 'app-producto.dialog',
  imports: [ MatFormFieldModule, MatInputModule, FormsModule, MatDialogActions, MatButtonModule ],
  templateUrl: './producto.dialog.component.html',
  styleUrl: './producto.dialog.component.css'
})
export class ProductoDialogComponent {
  formData = {
    codigo: '',
    descripcion: '',
    precio: 0
  };

  producto: Producto = {
    codigoProducto: '',
    descripcion: '',
    precio: 0,
    estado: 1,
    fechaModificacion: undefined,
    id: 0
  };

  productoService = inject(ProductoService);
  general = inject(GeneralService);

  constructor(public dialogRef: MatDialogRef<ProductoDialogComponent>) {}

  cerrar(): void {
    this.dialogRef.close(this.formData);
  }

  grabar(): void {
    console.log(this.formData);
    this.producto.codigoProducto = this.formData.codigo;
    this.producto.descripcion = this.formData.descripcion;
    this.producto.precio = this.formData.precio;


    this.productoService.grabar(this.producto)
      .subscribe({
        next: (result) => {
          this.cerrar();
          this.general.mensajeCorrecto("Producto se grabó correctamente");
        },
        error: ({ error }) => {
          this.general.mensajeError(error.mensaje);
        },
      });
  }




}
