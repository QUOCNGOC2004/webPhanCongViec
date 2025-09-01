// Cập nhật lại component này để đa dụng hơn

type BadgeProps = {
  text: string;
  color?: string;
};

export const StatusBadge = ({ text, color = 'green' }: BadgeProps) => {
  const colorClasses: Record<string, string> = {
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
  };
  const applied = colorClasses[color] ?? colorClasses['green'];
  
  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full ${applied}`}>
      {text}
    </span>
  );
};