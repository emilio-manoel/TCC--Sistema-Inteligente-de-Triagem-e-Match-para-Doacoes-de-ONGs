import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Trash2 } from "lucide-react";
import { getSavedChats, deleteChatSession } from "../hooks/useChatHistory";
import type { ChatSession } from "../types/chatAndMesssage";

export default function History() {
  const [chats, setChats] = useState<ChatSession[]>(() => getSavedChats());

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    deleteChatSession(id);
    setChats((prev) => prev.filter((chat) => chat.id !== id));
  };

  return (
    <div className="flex-1 w-full h-full overflow-y-auto p-4 sm:p-6 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Histórico de Conversas</h1>

      {chats.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          Nenhuma conversa salva ainda.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {chats.map((chat) => (
            <Link
              key={chat.id}
              to={`/${chat.id}`}
              className="flex items-start justify-between p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors group shadow-sm"
            >
              <div className="flex items-start gap-3 overflow-hidden mr-2 min-w-0">
                <MessageSquare className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="overflow-hidden min-w-0">
                  <p className="font-medium text-sm truncate">{chat.title}</p>
                  <span className="text-xs text-muted-foreground">
                    {new Date(chat.updatedAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              <button
                onClick={(e) => handleDelete(e, chat.id)}
                title="Apagar conversa"
                className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors cursor-pointer shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
