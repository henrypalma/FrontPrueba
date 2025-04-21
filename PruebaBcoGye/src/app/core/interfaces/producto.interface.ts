export interface Producto {
  id: number; // Identificador único
  codigoProducto: string; // Código del producto
  descripcion: string; // Descripción del producto
  precio: number; // Precio del producto
  estado: number; // Estado del producto (activo/inactivo)
  fechaModificacion?: Date; // Fecha de modificación del producto
}
