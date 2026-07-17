import { buildTasteProfile } from "../services/tasteProfile";
import type { TasteMemory } from "../types/tasteMemory";

type Props = {
  memories: TasteMemory[];
};

export default function TasteProfileCard({ memories }: Props) {
  const profile = buildTasteProfile(memories);

  return (
    <div className="taste-profile-card">
      <h2>🧠 Your Taste Profile</h2>

      <p>❤️ Loved: {profile.lovedCount} restaurants</p>

      <p>👎 Avoided: {profile.dislikedCount} restaurants</p>

      <p>
        🔥 Favorite Category: {profile.favoriteCategory || "Still learning"}
      </p>
    </div>
  );
}
