import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./ChatMessage";
import { Send, Sparkles } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "@shared/schema";

interface ChatInterfaceProps {
  className?: string;
}

export default function ChatInterface({ className = "" }: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch chat history
  const { data: chatHistory = [] } = useQuery<ChatMessageType[]>({
    queryKey: ['/api/chat/history'],
  });

  // Send chat message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      return await apiRequest('POST', '/api/chat', { message });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/chat/history'] });
      setInputValue("");
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    },
  });

  const handleSend = () => {
    if (!inputValue.trim() || sendMessageMutation.isPending) return;
    sendMessageMutation.mutate(inputValue);
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
          {chatHistory.length === 0 && !sendMessageMutation.isPending && (
            <div className="text-center text-muted-foreground py-8">
              <Sparkles className="w-12 h-12 mx-auto mb-3 text-primary/50" />
              <p>Ask me anything about zodiac compatibility, predictions, or cosmic guidance!</p>
            </div>
          )}
          
          {chatHistory.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg.message}
              sender={msg.sender as "user" | "ai"}
              timestamp={new Date(msg.timestamp!).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            />
          ))}

          {sendMessageMutation.isPending && (
            <div className="flex gap-3 items-end">
              <div className="w-8 h-8 border-2 border-primary/50 rounded-full" />
              <div className="bg-muted rounded-lg rounded-bl-none px-4 py-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
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
            disabled={sendMessageMutation.isPending}
            data-testid="input-chat-message"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!inputValue.trim() || sendMessageMutation.isPending}
            data-testid="button-send-message"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
