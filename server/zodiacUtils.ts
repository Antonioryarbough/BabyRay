export function calculateZodiacSign(birthdate: string): string {
  // Parse date string manually to avoid UTC conversion issues
  // Expected format: YYYY-MM-DD
  const parts = birthdate.split('-');
  if (parts.length !== 3) {
    return "Unknown";
  }
  
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  
  if (isNaN(month) || isNaN(day) || month < 1 || month > 12 || day < 1 || day > 31) {
    return "Unknown";
  }

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

  return "Unknown";
}

export function getCompatibleSigns(sign: string): string[] {
  const compatibilityMap: Record<string, string[]> = {
    Aries: ["Leo", "Sagittarius", "Gemini", "Aquarius"],
    Taurus: ["Virgo", "Capricorn", "Cancer", "Pisces"],
    Gemini: ["Libra", "Aquarius", "Aries", "Leo"],
    Cancer: ["Scorpio", "Pisces", "Taurus", "Virgo"],
    Leo: ["Aries", "Sagittarius", "Gemini", "Libra"],
    Virgo: ["Taurus", "Capricorn", "Cancer", "Scorpio"],
    Libra: ["Gemini", "Aquarius", "Leo", "Sagittarius"],
    Scorpio: ["Cancer", "Pisces", "Virgo", "Capricorn"],
    Sagittarius: ["Aries", "Leo", "Libra", "Aquarius"],
    Capricorn: ["Taurus", "Virgo", "Scorpio", "Pisces"],
    Aquarius: ["Gemini", "Libra", "Aries", "Sagittarius"],
    Pisces: ["Cancer", "Scorpio", "Taurus", "Capricorn"],
  };

  return compatibilityMap[sign] || [];
}
