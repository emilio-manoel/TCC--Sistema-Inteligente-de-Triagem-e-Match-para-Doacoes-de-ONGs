import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { MessageItem } from "../types/chatAndMesssage";
import { MsgInitial } from "../utils/messageInitial";
import { donorMessage } from "../api/requestHttp";
import type { ChatSession } from "../types/chatAndMesssage";
import type { donorMessageResponse, OngUpcoming } from "../types/apiResposte";

export interface MapData {
  ongs: OngUpcoming[];
  coordenadasUsuario: [number, number];
}

const STORAGE_KEY = "@tcc-ong:all-chats";

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

  useEffect(() => {
    if (id) {
      const allChats = getSavedChats();
      const existing = allChats.find((c) => c.id === id);

      if (existing) {
        setCurrentChatId(existing.id);
        setMessages(existing.messages);
        setMapData(existing.mapData);
      } else {
        setCurrentChatId(id);
        setMessages([MsgInitial]);
        setMapData(null);
      }
    } else {
      const newId = Date.now().toString();
      setCurrentChatId(newId);
      setMessages([MsgInitial]);
      setMapData(null);
      navigate(`/${newId}`, { replace: true });
    }
  }, [id, navigate]);

  useEffect(() => {
    if (!currentChatId) return;
    if (messages.length <= 1) return;

    const allChats = getSavedChats();
    const firstUserMsg = messages.find((m) => m.sender === "user");
    const titulo = firstUserMsg ? 
        firstUserMsg.content.slice(0, 30) +
        (firstUserMsg.content.length > 30 ? "..." :  "") 
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
      allChats.unshift(chatSession);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(allChats));
  }, [messages, mapData, currentChatId]);

  const createNewChat = () => {
    const newId = Date.now().toString();
    navigate(`/${newId}`);
  };

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

      const res: donorMessageResponse = await donorMessage(apiMessages);

      if (res.status === "completo") {
        if (res.respostaMatch && res.ongs && res.ongs.length > 0) {
          setMapData({
            ongs: res.ongs,
            coordenadasUsuario: [res.ongs[0].latitude, res.ongs[0].longitude],
          });
        }
      }
      const botContent =
        (res.status === "incompleto" && res.pergunta) ||
        (res.status === "completo" && res.respostaMatch.mensagem_chat) ||
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
