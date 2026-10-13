interface RespostaMatch {
  sucesso: boolean;
  mensagem_chat: string;
  ong_selecionada: OngSelecionada | null;
}

interface OngSelecionada {
  id: string;
  nome: string;
  endereco_completo: string;
}

export interface OngUpcoming {
  _id: string;
  razao_social: string;
  endereco_completo: string;
  latitude: number;
  longitude: number;
}

interface donorMessageIncompleto {
  status: "incompleto";
  pergunta: string;
}

interface donorMessageCompleto {
  status: "completo";
  coordenadasUsuario: Coordenadas;
  respostaMatch: RespostaMatch;
  ongs: OngUpcoming[];
}

export type donorMessageResponse =
  | donorMessageCompleto
  | donorMessageIncompleto;
