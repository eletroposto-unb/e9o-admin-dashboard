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
    cabo: any;
    potencia: number;
    // ENDEREÇO
    latitude?: number;
    longitude?: number;
    endereco: string;
    estado: string;
    cep: string;
    cidade: string;
    numero: number;
    complemento: string;
  };

  type Wallet = {
    cpf?: string;
    idCarteira: number;
    qtdCreditosSolicitados: number;
    qtdCreditos: number;
  };

  type UpdatedWallet = {
    aprovado: boolean;
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
    wallet: Wallet;
  };

  type History = {
    horarioEntrada: Date;
    horarioSaida: Date;
    valorTotal: number;
    idPosto: number;
    cpf: string;
  };

  type Result<T> = ResultSuccess<T> | ResultError;
}
