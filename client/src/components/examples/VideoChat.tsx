import VideoChat from '../VideoChat';
import piscesGhostAvatar from '@assets/generated_images/Pisces_Ghost_mystical_avatar_64a67778.png';
import goodDGirlAvatar from '@assets/generated_images/GoodDGirl_elegant_portrait_a7d4cbe0.png';

export default function VideoChatExample() {
  return (
    <div className="max-w-4xl">
      <VideoChat
        participant1Name="Pisces Ghost"
        participant2Name="GoodDGirl"
        participant1Avatar={piscesGhostAvatar}
        participant2Avatar={goodDGirlAvatar}
      />
    </div>
  );
}
