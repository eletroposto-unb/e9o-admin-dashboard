export {};

declare global {
  type postFormData = {
    // DADOS DO POSTO
    name: string;
    description: string;
    horarioDeFuncionamento: string;
    tipoTomada: string;
    comodidade: string;
    status: string;
    custo: number;
    cabo: number;
    // ENDEREÇO
    lat?: number;
    lng?: number;
    endereco: string;
    cep: string;
    cidade: string;
    bairro: string;
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
