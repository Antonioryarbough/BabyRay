import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Calendar, Sparkles } from "lucide-react";

interface BirthdateFormProps {
  onSubmit?: (birthdate: string) => void;
  className?: string;
}

export default function BirthdateForm({ onSubmit, className = "" }: BirthdateFormProps) {
  const [birthdate, setBirthdate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthdate) return;

    setIsSubmitting(true);
    console.log("Submitting birthdate:", birthdate);
    
    setTimeout(() => {
      onSubmit?.(birthdate);
      setIsSubmitting(false);
    }, 1500);
  };

  const calculateZodiacSign = (date: string) => {
    if (!date) return null;
    
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const day = d.getDate();

    const zodiacMap = [
      { sign: "Capricorn", start: [12, 22], end: [1, 19] },
      { sign: "Aquarius", start: [1, 20], end: [2, 18] },
      { sign: "Pisces", start: [2, 19], end: [3, 20] },
      { sign: "Aries", start: [3, 21], end: [4, 19] },
      { sign: "Taurus", start: [4, 20], end: [5, 20] },
      { sign: "Gemini", start: [5, 21], end: [6, 20] },
      { sign: "Cancer", start: [6, 21], end: [7, 22] },
      { sign: "Leo", start: [7, 23], end: [8, 22] },
      { sign: "Virgo", start: [8, 23], end: [9, 22] },
      { sign: "Libra", start: [9, 23], end: [10, 22] },
      { sign: "Scorpio", start: [10, 23], end: [11, 21] },
      { sign: "Sagittarius", start: [11, 22], end: [12, 21] },
    ];

    for (const zodiac of zodiacMap) {
      const [startMonth, startDay] = zodiac.start;
      const [endMonth, endDay] = zodiac.end;

      if (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay)
      ) {
        return zodiac.sign;
      }
    }

    return null;
  };

  const predictedSign = calculateZodiacSign(birthdate);

  return (
    <Card className={`p-6 bg-card/80 backdrop-blur-lg border-primary/30 ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center mb-6">
          <Calendar className="w-12 h-12 text-primary mx-auto mb-3" />
          <h3 className="font-serif text-2xl font-bold mb-2">Verify Your Birthdate</h3>
          <p className="text-sm text-muted-foreground">
            Your birthdate determines your zodiac sign and compatibility matches
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthdate" className="text-base">
            Date of Birth
          </Label>
          <Input
            id="birthdate"
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            required
            className="bg-background/50"
            data-testid="input-birthdate"
          />
        </div>

        {predictedSign && (
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Your Zodiac Sign</p>
              <p className="font-serif text-lg font-bold text-primary" data-testid="text-predicted-sign">
                {predictedSign}
              </p>
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={!birthdate || isSubmitting}
          data-testid="button-submit-birthdate"
        >
          {isSubmitting ? "Verifying..." : "Verify & Continue"}
        </Button>
      </form>
    </Card>
  );
}
