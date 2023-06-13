export interface Stations {
  station: Station
  address: Address
}

export interface Station {
  descricao: string
  statusFuncionamento: string
  nome: string
  horarioFuncionamento: string
  potencia: number
  idPosto: number
  cabo: boolean
  precoKwh: number
  tipoTomada: string
  idEndereco: number
}

export interface Address {
  latitude: number
  idEndereco: number
  estado: string
  endereco: string
  complemento: string
  cep: string
  comodidade: string
  longitude: number
  cidade: string
  numero: number
}
