import UserAvatar from '../UserAvatar';
import piscesGhostAvatar from '@assets/generated_images/Pisces_Ghost_mystical_avatar_64a67778.png';

export default function UserAvatarExample() {
  return (
    <div className="flex gap-8 items-center">
      <UserAvatar
        src={piscesGhostAvatar}
        name="Pisces Ghost"
        zodiacSign="Pisces"
        size="xl"
        verified={true}
      />
      <UserAvatar
        src={piscesGhostAvatar}
        name="John Doe"
        zodiacSign="Aries"
        size="lg"
      />
      <UserAvatar
        src={piscesGhostAvatar}
        name="Jane Smith"
        zodiacSign="Leo"
        size="md"
      />
    </div>
  );
}
