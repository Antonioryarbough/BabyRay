import ZodiacCard from "./ZodiacCard";
import ariesImage from '@assets/generated_images/Aries_zodiac_symbol_2a07ffa5.png';
import taurusImage from '@assets/generated_images/Taurus_zodiac_symbol_d238e49e.png';
import geminiImage from '@assets/generated_images/Gemini_zodiac_symbol_d7b2f75a.png';
import cancerImage from '@assets/generated_images/Cancer_zodiac_symbol_971aad70.png';
import leoImage from '@assets/generated_images/Leo_zodiac_symbol_a4061f84.png';
import virgoImage from '@assets/generated_images/Virgo_zodiac_symbol_e895543d.png';
import libraImage from '@assets/generated_images/Libra_zodiac_symbol_709ae804.png';
import scorpioImage from '@assets/generated_images/Scorpio_zodiac_symbol_2939a4db.png';
import sagittariusImage from '@assets/generated_images/Sagittarius_zodiac_symbol_e59dc20a.png';
import capricornImage from '@assets/generated_images/Capricorn_zodiac_symbol_1ef126d7.png';
import aquariusImage from '@assets/generated_images/Aquarius_zodiac_symbol_2905fcf2.png';
import piscesImage from '@assets/generated_images/Pisces_zodiac_symbol_4a0db3bb.png';

const zodiacSigns = [
  { sign: "Aries", image: ariesImage, element: "Fire" },
  { sign: "Taurus", image: taurusImage, element: "Earth" },
  { sign: "Gemini", image: geminiImage, element: "Air" },
  { sign: "Cancer", image: cancerImage, element: "Water" },
  { sign: "Leo", image: leoImage, element: "Fire" },
  { sign: "Virgo", image: virgoImage, element: "Earth" },
  { sign: "Libra", image: libraImage, element: "Air" },
  { sign: "Scorpio", image: scorpioImage, element: "Water" },
  { sign: "Sagittarius", image: sagittariusImage, element: "Fire" },
  { sign: "Capricorn", image: capricornImage, element: "Earth" },
  { sign: "Aquarius", image: aquariusImage, element: "Air" },
  { sign: "Pisces", image: piscesImage, element: "Water" },
];

interface ZodiacCouncilProps {
  userZodiacSign?: string;
  compatibleSigns?: string[];
  onSignClick?: (sign: string) => void;
  onSignEdit?: (sign: string) => void;
}

export default function ZodiacCouncil({
  userZodiacSign,
  compatibleSigns = [],
  onSignClick,
  onSignEdit,
}: ZodiacCouncilProps) {
  return (
    <div className="space-y-4" data-testid="zodiac-council">
      <div className="text-center">
        <h2 className="font-serif text-3xl font-bold text-primary mb-2">
          The Zodiac Council
        </h2>
        <p className="text-muted-foreground">
          {userZodiacSign
            ? `Your compatible signs as ${userZodiacSign}`
            : "Discover your cosmic connections"}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {zodiacSigns.map((zodiac) => (
          <ZodiacCard
            key={zodiac.sign}
            sign={zodiac.sign}
            image={zodiac.image}
            element={zodiac.element}
            compatible={compatibleSigns.includes(zodiac.sign)}
            onClick={() => onSignClick?.(zodiac.sign)}
            onEdit={() => onSignEdit?.(zodiac.sign)}
          />
        ))}
      </div>
    </div>
  );
}
