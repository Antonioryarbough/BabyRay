import { Badge } from "@/components/ui/badge";
import { Check, Clock, AlertCircle, X } from "lucide-react";

interface StatusBadgeProps {
  status: "verified" | "pending" | "incompatible" | "rejected";
  text?: string;
  className?: string;
}

const statusConfig = {
  verified: {
    icon: Check,
    bg: "bg-chart-3",
    text: "Verified",
  },
  pending: {
    icon: Clock,
    bg: "bg-chart-4",
    text: "Pending Verification",
  },
  incompatible: {
    icon: AlertCircle,
    bg: "bg-destructive",
    text: "Incompatible",
  },
  rejected: {
    icon: X,
    bg: "bg-destructive",
    text: "Rejected",
  },
};

export default function StatusBadge({ status, text, className = "" }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge
      className={`${config.bg} text-white border-0 gap-1 ${className}`}
      data-testid={`status-badge-${status}`}
    >
      <Icon className="w-3 h-3" />
      {text || config.text}
    </Badge>
  );
}
