import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserAvatar from "./UserAvatar";
import StatusBadge from "./StatusBadge";
import { Edit, Sparkles } from "lucide-react";

interface UserProfileProps {
  name: string;
  avatar: string;
  zodiacSign: string;
  bio?: string;
  verified?: boolean;
  compatible?: boolean;
  onEdit?: () => void;
  onGenerateAvatar?: () => void;
  className?: string;
}

export default function UserProfile({
  name,
  avatar,
  zodiacSign,
  bio,
  verified = false,
  compatible = false,
  onEdit,
  onGenerateAvatar,
  className = "",
}: UserProfileProps) {
  return (
    <Card className={`p-6 bg-card/70 backdrop-blur-lg ${className}`}>
      <div className="flex flex-col items-center gap-4">
        <UserAvatar
          src={avatar}
          name={name}
          zodiacSign={zodiacSign}
          size="xl"
          verified={verified}
        />

        <div className="text-center">
          <h3 className="font-serif text-2xl font-bold mb-1" data-testid="text-user-name">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Zodiac Sign: {zodiacSign}
          </p>

          <div className="flex gap-2 justify-center">
            {verified && <StatusBadge status="verified" />}
            {compatible && <StatusBadge status="verified" text="Compatible" />}
          </div>
        </div>

        {bio && (
          <p className="text-sm text-center text-muted-foreground max-w-xs">
            {bio}
          </p>
        )}

        <div className="flex gap-2 w-full">
          {onGenerateAvatar && (
            <Button
              variant="outline"
              className="flex-1"
              onClick={onGenerateAvatar}
              data-testid="button-generate-avatar"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              New Look
            </Button>
          )}
          {onEdit && (
            <Button
              variant="outline"
              className="flex-1"
              onClick={onEdit}
              data-testid="button-edit-profile"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
