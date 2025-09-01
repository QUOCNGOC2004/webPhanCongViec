//Thẻ thống kê

import { Icon, IconName } from "./Icons";

type StatCardProps = {
  title: string;
  value: string;
  note: string;
  icon: IconName;
};

export const StatCard = ({ title, value, note, icon }: StatCardProps) => {
  return (
    <div className="bg-green-100 p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <span className="text-gray-500">{title}</span>
        <Icon name={icon} className="w-6 h-6 text-gray-400" />
      </div>
      <div>
        <p className="text-3xl font-bold mt-2">{value}</p>
        <p className="text-sm text-gray-400 mt-1">{note}</p>
      </div>
    </div>
  );
};