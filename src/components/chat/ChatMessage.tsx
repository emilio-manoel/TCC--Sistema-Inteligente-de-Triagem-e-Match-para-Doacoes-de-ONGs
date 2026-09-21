import Messagem from "../ui/Mensage";

export interface MessageItem {
  id: string;
  content: string;
  sender: "user" | "bot";
}

interface ChatMessageProps {
  messages?: MessageItem[];
  children?: React.ReactNode;
}

function ChatMessage({ messages = [], children }: ChatMessageProps) {
  const lastBotMessageId = [...messages]
    .reverse()
    .find((msg) => msg.sender === 'bot')?.id;

  return (
    <>
      {messages.map((msg) => (
        <Messagem key={msg.id} content={msg.content} sender={msg.sender}>
          {msg.id === lastBotMessageId ? children : null}
        </Messagem>
      ))}
    </>
  );
}


export default ChatMessage;


