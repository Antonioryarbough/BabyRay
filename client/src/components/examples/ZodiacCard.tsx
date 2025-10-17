import ZodiacCard from '../ZodiacCard';
import ariesImage from '@assets/generated_images/Aries_zodiac_symbol_2a07ffa5.png';
import leoImage from '@assets/generated_images/Leo_zodiac_symbol_a4061f84.png';

export default function ZodiacCardExample() {
  return (
    <div className="flex gap-4">
      <ZodiacCard
        sign="Aries"
        image={ariesImage}
        element="Fire"
        compatible={true}
        onEdit={() => console.log('Edit Aries')}
        onClick={() => console.log('Clicked Aries')}
      />
      <ZodiacCard
        sign="Leo"
        image={leoImage}
        element="Fire"
        onEdit={() => console.log('Edit Leo')}
        onClick={() => console.log('Clicked Leo')}
      />
    </div>
  );
}
