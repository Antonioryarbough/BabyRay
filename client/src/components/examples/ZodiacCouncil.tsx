import ZodiacCouncil from '../ZodiacCouncil';

export default function ZodiacCouncilExample() {
  return (
    <ZodiacCouncil
      userZodiacSign="Pisces"
      compatibleSigns={["Cancer", "Scorpio", "Taurus"]}
      onSignClick={(sign) => console.log('Clicked sign:', sign)}
      onSignEdit={(sign) => console.log('Edit sign:', sign)}
    />
  );
}
