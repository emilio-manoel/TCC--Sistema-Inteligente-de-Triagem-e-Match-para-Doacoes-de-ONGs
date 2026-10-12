import Message from "../ui/Message";
import type { ChatMessageProps } from "../../types/messsage.";


export default function ChatMessage({ messages = [], children }: ChatMessageProps) {
  const lastBotMessageId = [...messages]
    .reverse()
    .find((msg) => msg.sender === "bot")?.id;

  return (
    <>
      {messages.map((msg) => (
        <Message key={msg.id} content={msg.content} sender={msg.sender}>
          {msg.id === lastBotMessageId ? children : null}
        </Message>
      ))}
    </>
  );
}
