import UserProfile from '../UserProfile';
import piscesGhostAvatar from '@assets/generated_images/Pisces_Ghost_mystical_avatar_64a67778.png';

export default function UserProfileExample() {
  return (
    <div className="max-w-sm">
      <UserProfile
        name="Pisces Ghost"
        avatar={piscesGhostAvatar}
        zodiacSign="Pisces"
        bio="A mystical being navigating the cosmic realms of music and artistry."
        verified={true}
        compatible={true}
        onEdit={() => console.log('Edit profile')}
        onGenerateAvatar={() => console.log('Generate new avatar')}
      />
    </div>
  );
}
