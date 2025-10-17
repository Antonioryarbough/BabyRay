import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Edit } from "lucide-react";

interface ZodiacCardProps {
  sign: string;
  image: string;
  element?: string;
  compatible?: boolean;
  onEdit?: () => void;
  onClick?: () => void;
}

export default function ZodiacCard({
  sign,
  image,
  element,
  compatible = false,
  onEdit,
  onClick,
}: ZodiacCardProps) {
  return (
    <Card
      className={`relative group hover-elevate active-elevate-2 cursor-pointer transition-all ${
        compatible ? "ring-2 ring-chart-3" : ""
      }`}
      onClick={onClick}
      data-testid={`zodiac-card-${sign.toLowerCase()}`}
    >
      <div className="p-4 flex flex-col items-center gap-3">
        <div className="relative">
          <img
            src={image}
            alt={sign}
            className="w-20 h-20 rounded-full object-cover border-2 border-primary/50"
          />
          {compatible && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-chart-3 rounded-full flex items-center justify-center">
              <Heart className="w-3 h-3 text-white fill-white" />
            </div>
          )}
        </div>

        <div className="text-center">
          <h3 className="font-serif font-semibold text-base" data-testid={`text-zodiac-${sign.toLowerCase()}`}>
            {sign}
          </h3>
          {element && (
            <Badge variant="secondary" className="mt-1 text-xs">
              {element}
            </Badge>
          )}
        </div>

        {onEdit && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            data-testid={`button-edit-${sign.toLowerCase()}`}
          >
            <Edit className="w-3 h-3" />
          </Button>
        )}
      </div>
    </Card>
  );
}
