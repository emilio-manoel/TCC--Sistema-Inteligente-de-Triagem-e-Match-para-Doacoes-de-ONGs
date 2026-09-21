import type {DadosONG} from "../types/ongCreate"


const API_BASE_URL = "/api" || import.meta.env.VITE_BACKEND_URL 


interface Mensagem {
  role: "user" | "model";
  texto: string;
}

export async function doadorMensagem(mensagem: Mensagem[]) {
  const response = await fetch(`${API_BASE_URL}/doador/nearby`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mensagem)
  });
  
  return await response.json();
}

export async function createOng(dados: DadosONG) {

  const response = await fetch(`${API_BASE_URL}/ong/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });
  
  return await response.json();
}