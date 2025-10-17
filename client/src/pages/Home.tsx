import { useState } from "react";
import VideoBackground from "@/components/VideoBackground";
import VideoChat from "@/components/VideoChat";
import UserProfile from "@/components/UserProfile";
import ZodiacCouncil from "@/components/ZodiacCouncil";
import ChatInterface from "@/components/ChatInterface";
import BirthdateForm from "@/components/BirthdateForm";
import GlassmorphicCard from "@/components/GlassmorphicCard";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, Moon, Sun } from "lucide-react";

import piscesGhostAvatar from '@assets/generated_images/Pisces_Ghost_mystical_avatar_64a67778.png';
import goodDGirlAvatar from '@assets/generated_images/GoodDGirl_elegant_portrait_a7d4cbe0.png';
import producerAvatar from '@assets/generated_images/Producer_professional_portrait_13694505.png';

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [userZodiac, setUserZodiac] = useState<string | undefined>(undefined);

  const handleBirthdateSubmit = (birthdate: string) => {
    console.log("Birthdate verified:", birthdate);
    setIsVerified(true);
    setUserZodiac("Pisces");
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <VideoBackground />

      <div className="relative min-h-screen">
        <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-card-border">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary" />
              <div>
                <h1 className="font-serif text-xl font-bold text-primary">
                  AI ANTONIOS INTELLIGENCE
                </h1>
                <p className="text-xs text-muted-foreground">Zodiac Record Label Estate</p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </header>

        <ScrollArea className="h-screen pt-20">
          <div className="container mx-auto px-4 py-8 space-y-8 pb-20">
            {!isVerified ? (
              <div className="max-w-2xl mx-auto mt-20">
                <BirthdateForm onSubmit={handleBirthdateSubmit} />
              </div>
            ) : (
              <>
                <section className="space-y-6">
                  <GlassmorphicCard
                    header={
                      <div className="text-center">
                        <h2 className="font-serif text-2xl font-bold text-primary">
                          Live Connection
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Pisces Ghost & GoodDGirl - The First Lady
                        </p>
                      </div>
                    }
                  >
                    <VideoChat
                      participant1Name="Pisces Ghost"
                      participant2Name="GoodDGirl"
                      participant1Avatar={piscesGhostAvatar}
                      participant2Avatar={goodDGirlAvatar}
                    />
                  </GlassmorphicCard>
                </section>

                <section>
                  <div className="text-center mb-8">
                    <h2 className="font-serif text-3xl font-bold text-primary mb-2">
                      The Council Members
                    </h2>
                    <p className="text-muted-foreground">
                      Key figures in the Zodiac Record Label Estate
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <UserProfile
                      name="Pisces Ghost"
                      avatar={piscesGhostAvatar}
                      zodiacSign="Pisces"
                      bio="Mystical artist navigating cosmic realms of music"
                      verified={true}
                      compatible={true}
                      onEdit={() => console.log("Edit Pisces Ghost")}
                      onGenerateAvatar={() => console.log("Generate avatar")}
                    />

                    <UserProfile
                      name="GoodDGirl"
                      avatar={goodDGirlAvatar}
                      zodiacSign="Leo"
                      bio="The First Lady - Leading with grace and vision"
                      verified={true}
                      compatible={true}
                      onEdit={() => console.log("Edit GoodDGirl")}
                      onGenerateAvatar={() => console.log("Generate avatar")}
                    />

                    <UserProfile
                      name="Ray D Ent Antonio"
                      avatar={producerAvatar}
                      zodiacSign="Capricorn"
                      bio="The Producer - Crafting sonic masterpieces"
                      verified={true}
                      onEdit={() => console.log("Edit Producer")}
                      onGenerateAvatar={() => console.log("Generate avatar")}
                    />
                  </div>
                </section>

                <section>
                  <GlassmorphicCard>
                    <ZodiacCouncil
                      userZodiacSign={userZodiac}
                      compatibleSigns={["Cancer", "Scorpio", "Taurus", "Capricorn"]}
                      onSignClick={(sign) => console.log("Clicked sign:", sign)}
                      onSignEdit={(sign) => console.log("Edit sign:", sign)}
                    />
                  </GlassmorphicCard>
                </section>

                <section>
                  <GlassmorphicCard
                    header={
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <h3 className="font-serif text-xl font-semibold">
                          AI Zodiac Guidance
                        </h3>
                      </div>
                    }
                  >
                    <div className="h-[500px]">
                      <ChatInterface />
                    </div>
                  </GlassmorphicCard>
                </section>
              </>
            )}
          </div>
        </ScrollArea>

        {isVerified && (
          <div className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-lg border-t border-card-border p-4">
            <div className="container mx-auto text-center">
              <p className="text-xs text-muted-foreground">
                User ID: <span className="font-mono" data-testid="text-user-id">USR-{Math.random().toString(36).substring(2, 11).toUpperCase()}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
