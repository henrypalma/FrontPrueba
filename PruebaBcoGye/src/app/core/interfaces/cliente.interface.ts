export interface Cliente {
  id: number;
  nombres: string;
  apellidos: string;
  documentoIdentidad: string;
  correo?: string;
  telefono?: string;
  direccion?: string;
  estado: number;
  fechaModificacion?: Date;
}


