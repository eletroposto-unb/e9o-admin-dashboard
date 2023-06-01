export {};

declare global {
  type postFormData = {
    // DADOS DO POSTO
    nome: string;
    descricao: string;
    horarioFuncionamento: string;
    tipoTomada: string;
    comodidade: string;
    statusFuncionamento: string;
    precoKwh: number;
    cabo: number;
    potencia: number;
    // ENDEREÇO
    latitude?: number;
    longitude?: number;
    endereco: string;
    estado: string;
    cep: string;
    cidade: string;
    complemento: string;
    numero: number;
  };

  type User = {
    name: string;
    surname: string;
    email: string;
    cpf: string;
    is_admin?: boolean;
    telefone?: string;
    status: string;
    firebase_uid?: string;
  };

  type Result<T> = ResultSuccess<T> | ResultError;
}
