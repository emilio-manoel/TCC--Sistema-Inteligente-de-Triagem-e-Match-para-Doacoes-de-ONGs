export interface DadosONG {
  cnpj: string;
  razao_social: string;
  natureza_juridica: string;
  endereco_completo: string;
  cep: string;
  cidade: string;
  uf: string;
  descricao: string;
  areas_atuacao: string[];
  subareas_atuacao?: string[];
  numero_contato?: string[];
  redes_sociais?: string[];
  necessidade?: Necessidade[];
}

export interface Necessidade {
  item?: string;
  categoria?: string;
  urgencia: "baixa" | "media" | "alta";
}