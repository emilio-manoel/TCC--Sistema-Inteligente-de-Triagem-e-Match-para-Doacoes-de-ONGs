import { useEffect, useRef, type PropsWithChildren } from "react";

function ChatContainer({ children }: PropsWithChildren) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [children]);

  return (
    <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6">
      <div className="flex flex-col max-w-4xl mx-auto w-full min-h-full">
        <div className="mt-auto flex flex-col gap-4 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;

