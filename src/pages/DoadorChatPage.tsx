import { useState } from "react";
import ChatInput from "../components/chat/ChatInput";
import ChatMessage, { type MessageItem } from "../components/chat/ChatMessage";
import ChatContainer from "../components/chat/ChatContainer";
import { MsgInicial } from "../utils/mensagemInicial.ts";

function DoadorChatPage() {

  const [messages, setMessages] = useState<MessageItem[]>([MsgInicial]);

  const handleSendMessage = (text: string) => {
    const userMsg: MessageItem = {
      id: Date.now().toString(),
      content: text,
      sender: "user"
    };
    setMessages((prev) => [...prev, userMsg]);
  };

  return (
    <div className="flex flex-1 flex-col h-full min-h-0 overflow-hidden">
      <ChatContainer>
        <ChatMessage messages={messages} />
      </ChatContainer>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default DoadorChatPage;

