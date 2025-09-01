
type AvatarProps = {
  initial: string;
  color: string;
};

export const MemberAvatar = ({ initial, color }: AvatarProps) => {
  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
      <span className="text-white font-bold text-lg">{initial}</span>
    </div>
  );
};