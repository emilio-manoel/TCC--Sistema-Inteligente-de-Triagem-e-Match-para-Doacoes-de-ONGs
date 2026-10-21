import type { DadosONG } from "../types/ongCreate";
import axios from "axios";
import type { MessageProps } from "../types/chatAndMesssage";

// Em dev local sem VITE_BACKEND_URL, assume "/api" e passa pelo proxy do Vite
const rawBaseUrl: string = import.meta.env.VITE_BACKEND_URL || "/api";

export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function donorMessage(message: MessageProps[]) {
  const response = await api.post("/donor/nearby", message);
  return response.data;
}

export async function createOng(dados: DadosONG) {
  const response = await api.post("/ong", dados);
  return response.data;
}
