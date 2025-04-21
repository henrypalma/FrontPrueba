export interface Usuario {
  id: number;
  nombre: string;
  apellidos: string;
  documentoIdentidad: string;
  correo?: string;
  telefono?: string;
  direccion?: string;
  usuario?: string;
  contrasenia?: string;
  estado: number;
  fechaModificacion?: Date;
}
