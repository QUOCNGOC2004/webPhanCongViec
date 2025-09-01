import { MemberAvatar } from "./MemberAvatar";

// Định nghĩa kiểu dữ liệu cho một thành viên
type Member = {
  name: string;
  email: string;
  avatarInitial: string;
  position: string;
  status: string; // Cho phép bất kỳ string
  groups: number;
  tasks: number;
  joinDate: string;
  avatarColor: string;
};

// Định nghĩa props cho component
type MembersTableProps = {
  members: Member[];
};

// Component StatusBadge để hiển thị trạng thái
const StatusBadge = ({ status }: { status: string }) => {
  const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";

  // Định nghĩa style cho các trạng thái chính
  const statusClasses: Record<string, string> = {
    "Hoạt động": "bg-green-100 text-green-800",
    "Tạm nghỉ": "bg-yellow-100 text-yellow-800",
  };

  // Nếu không khớp thì gán màu mặc định
  const appliedClass = statusClasses[status] ?? "bg-gray-100 text-gray-800";

  return <span className={`${baseClasses} ${appliedClass}`}>{status}</span>;
};

export const MembersTable = ({ members }: MembersTableProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-8">
      <div className="p-6">
        <h2 className="text-xl font-semibold">Danh sách thành viên</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "THÀNH VIÊN",
                "VỊ TRÍ",
                "TRẠNG THÁI",
                "NHÓM",
                "CÔNG VIỆC",
                "NGÀY THAM GIA",
                "THAO TÁC",
              ].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.map((member, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <MemberAvatar
                      initial={member.avatarInitial}
                      color={member.avatarColor}
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {member.name}
                      </div>
                      <div className="text-sm text-gray-500">{member.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {member.position}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={member.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {member.groups} nhóm
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {member.tasks} công việc
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {member.joinDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Xem chi tiết
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
