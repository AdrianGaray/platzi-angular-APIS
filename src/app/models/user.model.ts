export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

// creamos el DTO
// Le decimos que no queremos enviar un id.
export interface CreateUserDTO extends Omit<User, 'id'> {}
// al momento de crear un usuario se necesita un email y el password
