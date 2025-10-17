import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessageProps {
  message: string;
  sender: "user" | "ai";
  avatar?: string;
  senderName?: string;
  timestamp?: string;
}

export default function ChatMessage({
  message,
  sender,
  avatar,
  senderName,
  timestamp,
}: ChatMessageProps) {
  const isUser = sender === "user";

  return (
    <div
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} items-end`}
      data-testid={`chat-message-${sender}`}
    >
      <Avatar className="w-8 h-8 border-2 border-primary/50">
        <AvatarImage src={avatar} alt={senderName} />
        <AvatarFallback className="bg-primary/20 text-primary text-xs">
          {sender === "ai" ? "AI" : "U"}
        </AvatarFallback>
      </Avatar>

      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[80%]`}>
        {senderName && (
          <p className="text-xs text-muted-foreground mb-1 px-1">{senderName}</p>
        )}
        <div
          className={`rounded-lg px-4 py-2 ${
            isUser
              ? "bg-primary/80 text-primary-foreground rounded-br-none"
              : "bg-muted rounded-bl-none"
          }`}
        >
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
        {timestamp && (
          <p className="text-xs text-muted-foreground mt-1 px-1">{timestamp}</p>
        )}
      </div>
    </div>
  );
}
