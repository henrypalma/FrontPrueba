import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';


import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';


import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Producto } from '../core/interfaces/producto.interface';
import { ProductoService } from '../core/services/producto.service';

import { ProductoDialogComponent } from '../dialogs/producto.dialog/producto.dialog.component';

import { MatDialog } from '@angular/material/dialog';
import { GeneralService } from '../core/shared/general.service';

@Component({
  selector: 'app-producto',
  imports: [ MatCardModule, MatButtonModule, MatChipsModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatDividerModule, MatIconModule ],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {

  producto: Producto[] = [];
  productoService = inject(ProductoService);
  private general = inject (GeneralService)

  displayedColumns: string[] = ['id', 'codigo', 'descripcion', 'precio', 'acciones'];
  dataSource: MatTableDataSource<Producto> = new MatTableDataSource(undefined);

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  constructor(private dialog: MatDialog) {
    this.consultar();

  }

  consultar(){
    this.productoService.consultarProductos().subscribe({
      next: (productos) => {
        this.producto = productos;
        this.dataSource = new MatTableDataSource(this.producto);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: ({error}) => {
        console.log(error.mensaje);
      }
    })
  }

  abrirDialogo(): void {
    const dialogRef = this.dialog.open(ProductoDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result != undefined){
        if(result.codigo != ""){
          this.consultar();
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminar(row: any) {
    this.general.mensajeConfirmación("¿Está seguro de eliminar el Producto?")
    .then((respuesta) => {
      console.log(respuesta);
    if (respuesta) {
      this.productoService.eliminar(row.id)
      .subscribe({
        next: (result) => {
          this.general.mensajeCorrecto("Producto se eliminó correctamente");
          this.consultar();
        },
        error: ({ error }) => {
          this.general.mensajeError(error.mensaje);
        },
      })
    } else {
      return;
    }
  });





  }

}
