import ChatMessage from '../ChatMessage';

export default function ChatMessageExample() {
  return (
    <div className="flex flex-col gap-4 p-4 bg-card rounded-lg max-w-2xl">
      <ChatMessage
        message="Hello! Can you tell me about my zodiac compatibility?"
        sender="user"
        senderName="You"
        timestamp="2:30 PM"
      />
      <ChatMessage
        message="Of course! Based on your Pisces sign, you have great compatibility with Cancer and Scorpio. Both are water signs that complement your intuitive and emotional nature."
        sender="ai"
        senderName="AI Assistant"
        timestamp="2:31 PM"
      />
      <ChatMessage
        message="That's fascinating! What about career guidance?"
        sender="user"
        senderName="You"
        timestamp="2:32 PM"
      />
    </div>
  );
}
