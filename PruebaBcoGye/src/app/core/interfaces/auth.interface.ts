export interface Usuario {
  idFuncionario:  number;
  login:          string;
  token:          string;
}

export enum AuthStatus {
  checking         = 'checking',
  authenticated    = 'authenticated',
  notAuthenticated = 'notAuthenticated',
}

export interface LoginResponse {
  idFuncionario:  number;
  login:          string;
  token:          string;
  empresa:        string;
  idEmpresa:      string;

}
