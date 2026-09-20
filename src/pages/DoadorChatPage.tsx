import { useState } from "react";
import ChatInput from "../components/chat/ChatInput";
import ChatMessage, { type MessageItem } from "../components/chat/ChatMessage";
import ChatContainer from "../components/chat/ChatContainer";
import { MsgInicial } from "../utils/mensagemInicial.ts";
import { doadorMensagem } from "../api/requestHttp.ts";
import MapLeaflet from "../utils/leaflet.tsx";


function DoadorChatPage() {
  const [messages, setMessages] = useState<MessageItem[]>([MsgInicial]);
  const [loading, setLoading] = useState(false);
  const [mapData, setMapData] = useState<{ ongs: any[]; coordenadasUsuario: [number, number] } | null>(null);

  const handleSendMessage = async (text: string) => {
    const userMsg: MessageItem = {
      id: Date.now().toString(),
      content: text,
      sender: "user"
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);

    try {
      // Formata e ignora a mensagem inicial (índice 0)
      const apiMessages = newMessages.slice(1).map((msg) => ({
        role: msg.sender === "user" ? ("user" as const) : ("model" as const),
        texto: msg.content
      }));

      const res = await doadorMensagem(apiMessages);
      console.log(res)

      if (res.respostaMatch && res.ongs && res.coordenadasUsuario) {
        setMapData({
          ongs: res.ongs,
          coordenadasUsuario: [res.ongs[0].latitude, res.ongs[0].longitude]
        });
      }

      const botMsg: MessageItem = {
        id: (Date.now() + 1).toString(),
        content: res.pergunta || res.respostaMatch.mensagem_chat,
        sender: "bot"
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const errorMsg: MessageItem = {
        id: (Date.now() + 1).toString(),
        content: "Ocorreu um erro ao conectar com o servidor. Tente novamente em instantes.",
        sender: "bot"
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const isLastMessageBot =
    messages.length > 0 && messages[messages.length - 1].sender === "bot" && !loading;

  return (
    <div className="flex flex-1 flex-col h-full min-h-0 overflow-hidden">
      <ChatContainer>
        <ChatMessage messages={messages} />
        {mapData && (
          <MapLeaflet
            ongs={mapData.ongs}
            coordenadasUsuario={mapData.coordenadasUsuario}
          />
        )}
      </ChatContainer>
      <ChatInput onSendMessage={handleSendMessage} disabled={!isLastMessageBot} />
    </div>
  );
}

export default DoadorChatPage;


