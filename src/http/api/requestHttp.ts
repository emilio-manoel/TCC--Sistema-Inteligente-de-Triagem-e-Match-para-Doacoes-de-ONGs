const API_BASE_URL = '/api';

interface Mensagem {
  role: "user" | "model";
  texto: string;
}

interface ONG {
  cnpj: string;
  razao_social: string;
  natureza_juridica: string;
  situacao_cadastral: string;
  endereco_completo: string;
  municipio: string;
  uf: string;
  areas_atuacao: string[];
  subareas_atuacao?: string[];
  numero_contato?: string[];
  redes_sociais?: string[];
  localizacao: {
    type: "Point";
    coordinates: [number, number];
  };
  necessidades?: Necessidade[]
}

export interface Necessidade{
  item: string;
  categoria?: string;
  urgencia: "baixa" | "media" | "alta";
}


export async function doadorMensagem(mensagem: Mensagem[]) {
  const response = await fetch(`${API_BASE_URL}/doador/nearby`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mensagem)
  });
  
  return await response.json();
}

export async function createOng(dados: ONG[]) {

  const response = await fetch(`${API_BASE_URL}/doador/ong/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });
  
  return await response.json();
}