import ReactMarkdown from "react-markdown";
import type { MessageProps } from "../../types/messsage.";

export default function Message({ content, sender, children }: MessageProps) {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} w-full mb-2`}
    >
      <div className={`text-base md:text-sm max-w-[70%] ${
          isUser ? "bg-primary text-background" : "bg-card text-foreground"
        } p-3 rounded-lg wrap-break-word`}
      >
        {isUser ? (
          <span className="whitespace-pre-line">{content}</span>
        ) : (
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc ml-4 mb-2 space-y-1">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal ml-4 mb-2 space-y-1">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="leading-snug">{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold">{children}</strong>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        )}
        {children}
      </div>
    </div>
  );
}
