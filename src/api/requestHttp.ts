import type { DadosONG } from "../types/ongCreate";
import axios from 'axios';

// const rawBaseUrl = import.meta.env.VITE_BACKEND_URL || "/api";
// export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

export const api = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface Mensagem {
  role: "user" | "model";
  texto: string;
}

export async function doadorMensagem(mensagem: Mensagem[]) {
  const response = await api.post('/doador/nearby', mensagem);
  return response.data;
}

export async function createOng(dados: DadosONG) {
  const response = await api.post('/ong', dados);
  return response.data;
}