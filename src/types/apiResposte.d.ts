interface ResponseMatch {
  success: boolean;
  messageChat: string;
  ongSelected: ongSelected | null;
}

interface Coordenadas {
  lat: number;
  lng: number;
}

interface ongSelected {
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

interface DonorMessageIncompleto {
  status: "incompleto";
  question: string;
}

interface DonorMessageCompleto {
  status: "completo";
  userCoordinates: Coordenadas;
  responseMatch: ResponseMatch;
  ongs: OngUpcoming[];
}

export type donorMessageResponse =
  | DonorMessageCompleto
  | DonorMessageIncompleto;

export interface MapData {
  ongs: OngUpcoming[];
  userCoordinates: [number, number];
}
