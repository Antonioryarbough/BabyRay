import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface GlassmorphicCardProps {
  children: ReactNode;
  className?: string;
  header?: ReactNode;
  footer?: ReactNode;
}

export default function GlassmorphicCard({
  children,
  className = "",
  header,
  footer,
}: GlassmorphicCardProps) {
  return (
    <Card className={`bg-card/60 backdrop-blur-xl border-card-border/50 ${className}`}>
      {header && (
        <div className="p-6 border-b border-card-border/50 bg-card/40">
          {header}
        </div>
      )}
      
      <div className="p-6">{children}</div>
      
      {footer && (
        <div className="p-6 border-t border-card-border/50 bg-card/40">
          {footer}
        </div>
      )}
    </Card>
  );
}
