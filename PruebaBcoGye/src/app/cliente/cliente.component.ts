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

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}


@Component({
  selector: 'app-cliente',
  imports: [ MatCardModule, MatButtonModule, MatChipsModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatDividerModule, MatIconModule ],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements AfterViewInit {

  cliente: Cliente[] = [];
  clienteService = inject(ClienteService);

  displayedColumns: string[] = ['id', 'nombres', 'documentoIdentidad', 'estado'];
  dataSource: MatTableDataSource<Cliente> = new MatTableDataSource(undefined);

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  constructor(private dialog: MatDialog) {
    this.consultar();

  }

  consultar(){
    this.clienteService.consultarClientes().subscribe({
      next: (clientes) => {
        this.cliente = clientes;
        this.dataSource = new MatTableDataSource(this.cliente);
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

// function createNewUser(id: number): UserData {
//   const name =
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
//     ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
//     '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
//   };
// }
