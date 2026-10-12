import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import  type { MessageItem } from "../types/messsage";
import { MsgInitial } from "../utils/messageInitial";
import { doadorMensagem } from "../api/requestHttp";
import type { DadosONG } from "../types/ongCreate";


export interface MapData {
  ongs: DadosONG[];
  coordenadasUsuario: [number, number];
}

export interface ChatSession {
  id: string;
  titulo: string;
  updatedAt: string;
  messages: MessageItem[];
  mapData: MapData | null;
}

const STORAGE_KEY = "@tcc-ong:all-chats";

// Helper exportado para a página de Histórico listar todas as conversas salvas
export function getSavedChats(): ChatSession[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Erro ao carregar lista de chats:", error);
    return [];
  }
}

export function deleteChatSession(chatId: string): void {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    const chats: ChatSession[] = JSON.parse(saved);
    const updatedChats = chats.filter((c) => c.id !== chatId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedChats));
  } catch (error) {
    console.error("Erro ao apagar conversa:", error);
  }
}

export function useChatHistory() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [currentChatId, setCurrentChatId] = useState<string>("");
  const [messages, setMessages] = useState<MessageItem[]>([MsgInitial]);
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [loading, setLoading] = useState(false);

  // 1. Sincroniza o chat atual com o ID vindo da rota /:id
  useEffect(() => {
    if (id) {
      // Tenta buscar o chat existente no localStorage
      const allChats = getSavedChats();
      const existing = allChats.find((c) => c.id === id);

      if (existing) {
        setCurrentChatId(existing.id);
        setMessages(existing.messages);
        setMapData(existing.mapData);
      } else {
        // Se acessou /:id e o ID não existe, inicia limpo
        setCurrentChatId(id);
        setMessages([MsgInitial]);
        setMapData(null);
      }
    } else {
      // Se acessou '/', gera um novo ID único e redireciona para /:novoId
      const newId = Date.now().toString();
      setCurrentChatId(newId);
      setMessages([MsgInitial]);
      setMapData(null);
      navigate(`/${newId}`, { replace: true });
    }
  }, [id, navigate]);

  // 2. Salva ou atualiza o chat atual no localStorage sempre que houver mensagens novas
  useEffect(() => {
    if (!currentChatId) return;

    // Não persiste se a conversa tiver apenas a mensagem inicial do robô
    if (messages.length <= 1) return;

    const allChats = getSavedChats();

    // Define o título da conversa com base na primeira mensagem do usuário
    const firstUserMsg = messages.find((m) => m.sender === "user");
    const titulo = firstUserMsg
      ? firstUserMsg.content.slice(0, 30) +
        (firstUserMsg.content.length > 30 ? "..." : "")
      : "Nova Conversa";

    const chatSession: ChatSession = {
      id: currentChatId,
      titulo,
      updatedAt: new Date().toISOString(),
      messages,
      mapData,
    };

    const index = allChats.findIndex((c) => c.id === currentChatId);
    if (index >= 0) {
      allChats[index] = chatSession;
    } else {
      allChats.unshift(chatSession); // Adiciona no início da lista
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(allChats));
  }, [messages, mapData, currentChatId]);

  // 3. Função para acionar o botão de Novo Chat
  const createNewChat = () => {
    const newId = Date.now().toString();
    navigate(`/${newId}`);
  };

  // 4. Envio de mensagens via API
  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: MessageItem = {
      id: Date.now().toString(),
      content: text,
      sender: "user",
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);

    try {
      const apiMessages = newMessages.slice(1).map((msg) => ({
        sender: msg.sender === "user" ? ("user" as const) : ("bot" as const),
        content: msg.content,
      }));

      const res = await doadorMensagem(apiMessages);

      if (res.respostaMatch && res.ongs && res.ongs.length > 0) {
        setMapData({
          ongs: res.ongs,
          coordenadasUsuario: [res.ongs[0].latitude, res.ongs[0].longitude],
        });
      }

      const botContent =
        res.pergunta ||
        res.respostaMatch?.mensagem_chat ||
        "Não foi possível obter uma resposta.";

      const botMsg: MessageItem = {
        id: (Date.now() + 1).toString(),
        content: botContent,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const errorMsg: MessageItem = {
        id: (Date.now() + 1).toString(),
        content:
          "Ocorreu um erro ao conectar com o servidor. Tente novamente em instantes.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const isLastMessageBot =
    messages.length > 0 &&
    messages[messages.length - 1].sender === "bot" &&
    !loading;

  return {
    messages,
    loading,
    mapData,
    sendMessage,
    createNewChat,
    isLastMessageBot,
  };
}
