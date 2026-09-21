import { Loader2, Bot } from "lucide-react"; // 1. Importação dos ícones do Lucide
import ChatInput from "../components/chat/ChatInput";
import ChatMessage from "../components/chat/ChatMessage";
import ChatContainer from "../components/chat/ChatContainer";
import MapLeaflet from "../utils/leaflet.tsx";
import { useChatHistory } from "../hooks/useChatHistory";

function DoadorChatPage() {
  const {
    messages,
    loading,
    mapData,
    sendMessage,
    isLastMessageBot,
  } = useChatHistory();


  return (
    <div className="flex flex-1 flex-col h-full min-h-0 overflow-hidden">
      <ChatContainer>
        <ChatMessage messages={messages} > 
           {mapData && (
          <MapLeaflet
            ongs={mapData.ongs}
            coordenadasUsuario={mapData.coordenadasUsuario}
          />
        )}

        </ChatMessage>

        {loading && (
          <div className="flex items-center gap-2 p-3 my-2 max-w-[70%] w-fit rounded-lg bg-card text-foreground border border-border text-xs md:text-sm shadow-sm">
            <Bot className="w-4 h-4 text-primary shrink-0" />
            <span className="text-muted-foreground">O assistente está digitando</span>
            <Loader2 className="w-3.5 h-3.5 animate-spin text-primary shrink-0" />
          </div>
        )}
      </ChatContainer>

      <ChatInput
        onSendMessage={sendMessage}
        disabled={!isLastMessageBot || loading}
      />
    </div>
  );
}

export default DoadorChatPage;