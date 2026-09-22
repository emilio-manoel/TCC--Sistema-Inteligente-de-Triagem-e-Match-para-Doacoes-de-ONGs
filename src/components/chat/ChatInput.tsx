import { Input } from "../ui/Input";
import { useState, type KeyboardEvent } from "react";

interface ChatInputProps {
  onSendMessage?: (text: string) => void;
  disabled?: boolean;
}

function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (disabled || !inputValue.trim()) return;
    if (onSendMessage) {
      onSendMessage(inputValue.trim());
    }
    setInputValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-background border-t border-border shrink-0 w-full">
      <div className="max-w-4xl mx-auto w-full">
        <Input
          placeholder="Digite o que deseja doar e onde mora..."
          suffix="Enviar"
          className="w-full"
          value={inputValue}
          disabled={disabled}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onClickSuffix={handleSend}
        />
      </div>
    </div>
  );
}

export default ChatInput;

