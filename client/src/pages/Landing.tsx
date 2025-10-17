import { Button } from "@/components/ui/button";
import VideoBackground from "@/components/VideoBackground";
import { Sparkles, Star, Heart, Zap } from "lucide-react";

export default function Landing() {
  return (
    <div className="relative min-h-screen">
      <VideoBackground />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center gap-4 mb-6">
              <Star className="w-12 h-12 text-primary animate-pulse" />
              <Sparkles className="w-12 h-12 text-primary" />
              <Star className="w-12 h-12 text-primary animate-pulse" />
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-primary drop-shadow-lg">
              AI ANTONIOS INTELLIGENCE
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground/90 font-medium">
              Zodiac Record Label Estate
            </p>
          </div>

          <div className="bg-card/80 backdrop-blur-xl rounded-lg p-8 max-w-2xl mx-auto border border-primary/30 shadow-2xl">
            <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
              Join the cosmic community where music meets mysticism. Experience zodiac-based
              compatibility matching, AI-powered guidance, and connect with fellow artists
              in perfect harmony.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col items-center gap-2 p-4">
                <Heart className="w-8 h-8 text-chart-3" />
                <p className="text-sm font-medium">Compatibility Matching</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4">
                <Sparkles className="w-8 h-8 text-chart-1" />
                <p className="text-sm font-medium">AI Zodiac Guide</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4">
                <Zap className="w-8 h-8 text-chart-4" />
                <p className="text-sm font-medium">Live Video Chat</p>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full md:w-auto px-12 text-lg h-12"
              onClick={() => {
                window.location.href = "/api/login";
              }}
              data-testid="button-login"
            >
              Enter the Zodiac Estate
            </Button>

            <p className="text-sm text-muted-foreground mt-4">
              Birthdate verification required for participant safety
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
