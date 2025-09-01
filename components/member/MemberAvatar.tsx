
type AvatarProps = {
  initial: string;
  color: string;
  // optional size: 'small' | 'medium' | 'large' or any string for custom
  size?: 'small' | 'medium' | 'large' | string;
};

export const MemberAvatar = ({ initial, color, size = 'medium' }: AvatarProps) => {
  const sizeClasses: Record<string, string> = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-10 h-10 text-lg',
    large: 'w-14 h-14 text-2xl',
  };

  const appliedSize = sizeClasses[size] ?? 'w-10 h-10 text-lg';

  return (
    <div className={`rounded-full flex items-center justify-center ${appliedSize} ${color}`}>
      <span className="text-white font-bold">{initial}</span>
    </div>
  );
};