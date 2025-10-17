import GlassmorphicCard from '../GlassmorphicCard';
import { Sparkles } from 'lucide-react';

export default function GlassmorphicCardExample() {
  return (
    <div className="max-w-2xl">
      <GlassmorphicCard
        header={
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="font-serif text-xl font-semibold">Card Header</h3>
          </div>
        }
        footer={
          <p className="text-sm text-muted-foreground">Card Footer Content</p>
        }
      >
        <p className="text-base">
          This is a glassmorphic card with a frosted glass effect. Perfect for
          overlaying on video backgrounds and creating depth in the UI.
        </p>
      </GlassmorphicCard>
    </div>
  );
}
