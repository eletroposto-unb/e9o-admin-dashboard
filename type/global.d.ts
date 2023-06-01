export {};

declare global {
  type postFormData = {
    name: string;
    description: string;
    horarioDeFuncionamento: string;
    tipoTomada: string;
    comodidade: string;
    status: string;
    custo: number;
    cabo: number;
    endereco: string;
    cep: string;
    cidade: string;
    bairro: string;
    numero: number;
  };
}
