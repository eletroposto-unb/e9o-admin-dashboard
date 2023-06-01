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
}
