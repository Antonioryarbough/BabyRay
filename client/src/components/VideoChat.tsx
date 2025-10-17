import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, VideoOff, Mic, MicOff, PhoneOff, Maximize2 } from "lucide-react";

interface VideoChatProps {
  participant1Name: string;
  participant2Name: string;
  participant1Avatar: string;
  participant2Avatar: string;
  className?: string;
}

export default function VideoChat({
  participant1Name,
  participant2Name,
  participant1Avatar,
  participant2Avatar,
  className = "",
}: VideoChatProps) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    };

    startVideo();

    return () => {
      if (localVideoRef.current?.srcObject) {
        const stream = localVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    console.log("Mute toggled:", !isMuted);
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    console.log("Video toggled:", !isVideoOff);
  };

  const endCall = () => {
    console.log("Call ended");
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    console.log("Fullscreen toggled:", !isFullscreen);
  };

  return (
    <Card
      className={`relative overflow-hidden bg-black border-2 border-primary/50 ${className}`}
      data-testid="video-chat"
    >
      <div className="relative aspect-video">
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${isVideoOff ? "hidden" : ""}`}
        />

        {isVideoOff && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-card to-background">
            <img
              src={participant1Avatar}
              alt={participant1Name}
              className="w-32 h-32 rounded-full border-4 border-primary"
            />
          </div>
        )}

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <p className="text-sm text-white font-medium">{participant1Name}</p>
        </div>

        <Card className="absolute bottom-4 right-4 w-32 h-24 overflow-hidden border-2 border-primary/50">
          <img
            src={participant2Avatar}
            alt={participant2Name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-1 left-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
            <p className="text-xs text-white">{participant2Name}</p>
          </div>
        </Card>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 bg-black/80 backdrop-blur-lg px-6 py-3 rounded-full">
        <Button
          variant={isMuted ? "destructive" : "secondary"}
          size="icon"
          onClick={toggleMute}
          className="rounded-full"
          data-testid="button-toggle-mute"
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </Button>

        <Button
          variant={isVideoOff ? "destructive" : "secondary"}
          size="icon"
          onClick={toggleVideo}
          className="rounded-full"
          data-testid="button-toggle-video"
        >
          {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
        </Button>

        <Button
          variant="destructive"
          size="icon"
          onClick={endCall}
          className="rounded-full"
          data-testid="button-end-call"
        >
          <PhoneOff className="w-5 h-5" />
        </Button>

        <Button
          variant="secondary"
          size="icon"
          onClick={toggleFullscreen}
          className="rounded-full"
          data-testid="button-toggle-fullscreen"
        >
          <Maximize2 className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  );
}
