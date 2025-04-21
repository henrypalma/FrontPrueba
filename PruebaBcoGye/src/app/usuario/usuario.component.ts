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
import { Usuario } from '../core/interfaces/usuario.interface';
import { UsuarioService } from '../core/services/usuario.service';

import { MatDialog } from '@angular/material/dialog';
import { UsuarioDialogComponent } from './../dialogs/usuario.dialog/usuario.dialog.component';
import { GeneralService } from '../core/shared/general.service';


@Component({
  selector: 'app-usuario',
  imports: [ MatCardModule, MatButtonModule, MatChipsModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatDividerModule, MatIconModule ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements AfterViewInit {
    usuario: Usuario[] = [];
    usuarioService = inject(UsuarioService);
    private general = inject (GeneralService)

    displayedColumns: string[] = ['id', 'nombres', 'documentoIdentidad', 'estado', 'acciones'];
    dataSource: MatTableDataSource<Usuario> = new MatTableDataSource(undefined);

    @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator;
    @ViewChild(MatSort) sort: MatSort = new MatSort;

    constructor(private dialog: MatDialog) {
      this.consultar();

    }

    consultar(){
      this.usuarioService.consultarUsuarios().subscribe({
        next: (usuarios) => {
          this.usuario = usuarios;
          this.dataSource = new MatTableDataSource(this.usuario);
        },
        error: ({error}) => {
          console.log(error.mensaje);
        }
      })
    }



    abrirDialogo(): void {
        const dialogRef = this.dialog.open(UsuarioDialogComponent, {
          width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {

          if (result != undefined){
            if(result.nombres != ""){
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

      eliminar(row: any) {
        this.general.mensajeConfirmación("¿Está seguro de eliminar el Usuario?")
        .then((respuesta) => {
          console.log(respuesta);
        if (respuesta) {
          this.usuarioService.eliminar(row.id)
          .subscribe({
            next: (result) => {
              this.general.mensajeCorrecto("Usuario se eliminó correctamente");
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
