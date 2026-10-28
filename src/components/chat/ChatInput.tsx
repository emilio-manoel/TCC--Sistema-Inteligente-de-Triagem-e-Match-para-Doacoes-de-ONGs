import { Input } from "../ui/Input";
import { useState, type KeyboardEvent } from "react";

interface ChatInputProps {
  onSendMessage?: (text: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");

  function handleSend() {
    if (disabled || !inputValue.trim()) return;
    if (onSendMessage) {
      onSendMessage(inputValue.trim());
    }
    setInputValue("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="p-3 sm:p-4 safe-area-bottom bg-background border-t border-border shrink-0 w-full z-10">
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
