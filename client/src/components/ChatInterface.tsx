import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./ChatMessage";
import { Send, Sparkles } from "lucide-react";

interface Message {
  id: string;
  message: string;
  sender: "user" | "ai";
  timestamp: string;
}

interface ChatInterfaceProps {
  className?: string;
}

export default function ChatInterface({ className = "" }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      message: "Welcome to AI ANTONIOS INTELLIGENCE! I'm your zodiac guide. How can I help you today?",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      message: inputValue,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        message: "I understand your question about zodiac compatibility. Let me provide insights based on astrological wisdom...",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className={`flex flex-col h-full bg-card/50 backdrop-blur-lg rounded-lg border border-card-border ${className}`}>
      <div className="p-4 border-b border-card-border bg-card/80 backdrop-blur-sm rounded-t-lg">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-serif font-semibold text-lg">AI Zodiac Chat</h3>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" data-testid="chat-messages">
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg.message}
              sender={msg.sender}
              timestamp={msg.timestamp}
            />
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-card-border bg-card/80 backdrop-blur-sm rounded-b-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about zodiac compatibility, predictions..."
            className="flex-1 bg-background/50"
            data-testid="input-chat-message"
          />
          <Button type="submit" size="icon" data-testid="button-send-message">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
