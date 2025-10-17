import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useToast } from "@/hooks/use-toast";
import VideoBackground from "@/components/VideoBackground";
import VideoChat from "@/components/VideoChat";
import UserProfile from "@/components/UserProfile";
import ZodiacCouncil from "@/components/ZodiacCouncil";
import ChatInterface from "@/components/ChatInterface";
import BirthdateForm from "@/components/BirthdateForm";
import GlassmorphicCard from "@/components/GlassmorphicCard";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, LogOut } from "lucide-react";

import piscesGhostAvatar from '@assets/generated_images/Pisces_Ghost_mystical_avatar_64a67778.png';
import goodDGirlAvatar from '@assets/generated_images/GoodDGirl_elegant_portrait_a7d4cbe0.png';
import producerAvatar from '@assets/generated_images/Producer_professional_portrait_13694505.png';

export default function HomePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch compatible signs
  const { data: compatibility } = useQuery<{
    sign: string;
    compatibleSigns: string[];
    element?: string;
  }>({
    queryKey: ['/api/zodiac/compatible'],
    enabled: !!user?.isVerified,
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: { birthdate: string; bio?: string }) => {
      return await apiRequest('POST', '/api/user/profile', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/auth/user'] });
      toast({
        title: "Profile Updated",
        description: "Your zodiac profile has been verified!",
      });
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
        description: "Failed to update profile",
        variant: "destructive",
      });
    },
  });

  // Generate avatar mutation
  const generateAvatarMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest('POST', '/api/avatar/generate');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/auth/user'] });
      toast({
        title: "Avatar Generated",
        description: "Your cosmic avatar has been created!",
      });
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
        description: "Failed to generate avatar",
        variant: "destructive",
      });
    },
  });

  const handleBirthdateSubmit = (birthdate: string) => {
    updateProfileMutation.mutate({ birthdate });
  };

  const handleGenerateAvatar = () => {
    generateAvatarMutation.mutate();
  };

  const userAvatar = user?.generatedAvatarUrl || user?.profileImageUrl || piscesGhostAvatar;
  const userName = user?.firstName && user?.lastName 
    ? `${user.firstName} ${user.lastName}`
    : user?.firstName || "User";

  return (
    <div className="dark">
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
              size="sm"
              onClick={() => {
                window.location.href = "/api/logout";
              }}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </header>

        <ScrollArea className="h-screen pt-20">
          <div className="container mx-auto px-4 py-8 space-y-8 pb-20">
            {!user?.isVerified ? (
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
                      name={userName}
                      avatar={userAvatar}
                      zodiacSign={user?.zodiacSign || "Unknown"}
                      bio={user?.bio ?? "A cosmic soul in the zodiac estate"}
                      verified={user?.isVerified}
                      compatible={true}
                      onGenerateAvatar={handleGenerateAvatar}
                    />

                    <UserProfile
                      name="GoodDGirl"
                      avatar={goodDGirlAvatar}
                      zodiacSign="Leo"
                      bio="The First Lady - Leading with grace and vision"
                      verified={true}
                      compatible={compatibility?.compatibleSigns?.includes("Leo")}
                    />

                    <UserProfile
                      name="Ray D Ent Antonio"
                      avatar={producerAvatar}
                      zodiacSign="Capricorn"
                      bio="The Producer - Crafting sonic masterpieces"
                      verified={true}
                      compatible={compatibility?.compatibleSigns?.includes("Capricorn")}
                    />
                  </div>
                </section>

                <section>
                  <GlassmorphicCard>
                    <ZodiacCouncil
                      userZodiacSign={user?.zodiacSign ?? undefined}
                      compatibleSigns={compatibility?.compatibleSigns ?? []}
                      onSignClick={(sign) => console.log("Clicked sign:", sign)}
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

        {user?.isVerified && (
          <div className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-lg border-t border-card-border p-4">
            <div className="container mx-auto text-center">
              <p className="text-xs text-muted-foreground">
                User ID: <span className="font-mono" data-testid="text-user-id">{user?.id || "N/A"}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
