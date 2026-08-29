import Messagem from "../ui/mensage";

export interface MessageItem {
  id: string;
  content: string;
  sender: "user" | "bot";
}

interface ChatMessageProps {
  messages?: MessageItem[];
}

function ChatMessage({ messages = [] }: ChatMessageProps) {
  return (
    <>
      {messages.map((msg) => (
        <Messagem key={msg.id} content={msg.content} sender={msg.sender} />
      ))}
    </>
  );
}

export default ChatMessage;


