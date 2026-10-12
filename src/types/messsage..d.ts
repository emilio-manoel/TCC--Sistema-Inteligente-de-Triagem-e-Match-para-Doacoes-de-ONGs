export interface MessageItem {
  id: string;
  content: string;
  sender: "user" | "bot";
}

export interface MessageProps extends Omit<MessageItem, 'id'> {
  children?: React.ReactNode;
}

export interface ChatMessageProps {
  messages?: MessageItem[];
  children?: React.ReactNode;
}
