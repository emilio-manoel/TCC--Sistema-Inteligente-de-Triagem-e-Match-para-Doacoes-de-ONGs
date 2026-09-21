import type {DadosONG} from "../types/ongCreate"
import axios from 'axios';


//
const rawBaseUrl = import.meta.env.VITE_BACKEND_URL || "/api";
export const API_BASE_URL = rawBaseUrl.replace(/\/$/, "");

// Exemplo com Axios

export const api = axios.create({
  baseURL: API_BASE_URL,
});

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