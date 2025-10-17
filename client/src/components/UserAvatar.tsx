import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface UserAvatarProps {
  src: string;
  name: string;
  zodiacSign?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showZodiacBadge?: boolean;
  verified?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-20 h-20",
  lg: "w-32 h-32",
  xl: "w-40 h-40",
};

export default function UserAvatar({
  src,
  name,
  zodiacSign,
  size = "lg",
  showZodiacBadge = true,
  verified = false,
  className = "",
}: UserAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className={`relative inline-block ${className}`} data-testid="user-avatar">
      <Avatar className={`${sizeClasses[size]} border-4 border-primary shadow-xl`}>
        <AvatarImage src={src} alt={name} />
        <AvatarFallback className="bg-primary/20 text-primary font-serif text-2xl">
          {initials}
        </AvatarFallback>
      </Avatar>
      
      {showZodiacBadge && zodiacSign && (
        <Badge
          variant="secondary"
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-chart-1 text-white border-2 border-background font-serif text-xs whitespace-nowrap"
          data-testid="zodiac-badge"
        >
          {zodiacSign}
        </Badge>
      )}
      
      {verified && (
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-chart-3 rounded-full flex items-center justify-center border-2 border-background">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
}
