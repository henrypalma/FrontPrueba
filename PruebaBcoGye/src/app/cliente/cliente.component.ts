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
import { Cliente } from '../core/interfaces/cliente.interface';
import { ClienteService } from '../core/services/cliente.service';

import { MatDialog } from '@angular/material/dialog';
import { ClienteDialogComponent } from './../dialogs/cliente.dialog/cliente.dialog.component';
import { GeneralService } from '../core/shared/general.service';

@Component({
  selector: 'app-cliente',
  imports: [ MatCardModule, MatButtonModule, MatChipsModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatDividerModule, MatIconModule ],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {

  cliente: Cliente[] = [];
  clienteService = inject(ClienteService);
  private general = inject (GeneralService)

  displayedColumns: string[] = ['id', 'nombres', 'documentoIdentidad', 'estado', 'acciones'];
  dataSource: MatTableDataSource<Cliente> = new MatTableDataSource(undefined);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog) {
    this.consultar();

  }

  consultar(){
    this.clienteService.consultarClientes().subscribe({
      next: (clientes) => {
        this.cliente = clientes;
        this.dataSource = new MatTableDataSource(this.cliente);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: ({error}) => {
        console.log(error.mensaje);
      }
    })
  }

  abrirDialogo(): void {
    const dialogRef = this.dialog.open(ClienteDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result != undefined){
        if(result.nombres != ""){
          console.log('Datos ingresados:', result);
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
    this.general.mensajeConfirmación("¿Está seguro de eliminar el Cliente?")
    .then((respuesta) => {
      console.log(respuesta);
    if (respuesta) {
      this.clienteService.eliminar(row.id)
      .subscribe({
        next: (result) => {
          this.general.mensajeCorrecto("Cliente se eliminó correctamente");
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
